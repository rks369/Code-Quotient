const cart_items = document.getElementById("cart_items");

getCartList();
function getCartList() {
  fetch("cartItems", { method: "GET" })
    .then((response) => response.json())
    .then((result) => {
      if (result["err"]) {
        cart_items.innerHTML = result["err"];
      } else {
        result["data"].forEach((cartItem) => {
          createCartItem(cartItem);
        });
      }
    });
}

function createCartItem(cartItem) {
  const cartItemBox = document.createElement("div");
  cartItemBox.classList.add("cart_product_card");
  cartItemBox.classList.add("box");

  const productsImg = document.createElement("img");
  productsImg.classList.add("item");
  productsImg.classList.add("cart_product_img");
  productsImg.src = cartItem.image;

  const div1 = document.createElement('div')
  div1.classList.add("item");

  const title = document.createElement('p');
  title.classList.add("cart_product_title");
  title.innerHTML=cartItem.title;
  div1.appendChild(title);

  const description = document.createElement('p');
  description.classList.add("product_desc");
  description.innerHTML=cartItem.description;
  div1.appendChild(description);


  const price = document.createElement('p');
  price.classList.add("product_price");
  price.innerHTML=`Rs. ${cartItem.price}/-`;
  div1.appendChild(price)

  const div2 = document.createElement('div')
  div2.classList.add("item");

  const grossPrice = document.createElement('p');
  grossPrice.classList.add("product_price");
  grossPrice.innerHTML = `Rs. ${cartItem.price * cartItem.quantity}/-`;
  div2.appendChild(grossPrice);

  div2.appendChild(document.createElement('br'));

  const increaseQuantity=document.createElement('a');
  increaseQuantity.classList.add('circularButton');
  increaseQuantity.innerHTML='<span class="material-symbols-outlined"> remove</span>'
  div2.appendChild(increaseQuantity)

  const quantity = document.createElement('span');
  quantity.classList.add('product_quantity');
  quantity.innerHTML = cartItem.quantity;
  div2.appendChild(quantity);

  const decreaseQuantity=document.createElement('a');
  decreaseQuantity.classList.add('circularButton');
  decreaseQuantity.innerHTML='<span class="material-symbols-outlined"> add</span>'
  div2.appendChild(decreaseQuantity);

  div2.appendChild(document.createElement('br'));
  div2.appendChild(document.createElement('br'));

  const removeItem=document.createElement('a');
  removeItem.classList.add('secondaryButton');
  removeItem.innerHTML='Remove';
  div2.appendChild(removeItem);

  const buyNow=document.createElement('a');
  buyNow.classList.add('primaryButton');
  buyNow.innerHTML='Buy Now';
  div2.appendChild(buyNow);

  buyNow.addEventListener('click',()=>{
    console.log(cartItem);
  })

  cartItemBox.appendChild(productsImg);
  cartItemBox.appendChild(div1);
  cartItemBox.appendChild(div2);
  cart_items.appendChild(cartItemBox);
}

function increaseQuantity(cart_id) {
  fetch("/increaseQuantity", {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ cart_id }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result["err"]) {
        alert("Something Went Wrong");
      } else {
        updateProductsQuantiy(cart_id, 1);
      }
    });
}

function decreaseQuantity(cart_id) {
  fetch("/decreaseQuantity", {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ cart_id }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result["err"]) {
        alert("Something Went Wrong");
      } else {
        updateProductsQuantiy(cart_id, -1);
      }
    });
}

function removeFromCart(pid) {
  let remove = document.getElementById("r" + pid);
  const cart_id = remove.parentNode.parentNode.id;
  console.log(cart_id);

  fetch("/removeFromCart", {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ pid }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result["err"]) {
        alert("Something Went Wrong");
      } else {
        let price = parseInt(document.getElementById("p" + cart_id).innerHTML);
        let total_amount = document.getElementById("total_amount");
        let quantity = parseInt(
          document.getElementById("q" + cart_id).innerHTML
        );
        total_amount.innerHTML =
          parseInt(total_amount.innerHTML) - quantity * price;

        remove.parentNode.parentNode.parentNode.removeChild(
          remove.parentNode.parentNode
        );
      }
    });
}

function updateProductsQuantiy(cart_id, change) {
  let total_amount = document.getElementById("total_amount");
  let amountTag = document.getElementById("a" + cart_id);
  let quantityTag = document.getElementById("q" + cart_id);
  let price = parseInt(document.getElementById("p" + cart_id).innerHTML);

  let quantity = parseInt(quantityTag.innerHTML) + change;
  if (quantity == 0) {
    quantityTag.parentNode.parentNode.parentNode.removeChild(
      quantityTag.parentNode.parentNode
    );
  }
  quantityTag.innerHTML = quantity;
  amountTag.innerHTML = `Rs. ${quantity * price} /-`;

  total_amount.innerHTML = parseInt(total_amount.innerHTML) + change * price;
}
