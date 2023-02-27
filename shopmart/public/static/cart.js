function addToCart(pid) {
  console.log(pid);
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
    body: JSON.stringify({cart_id }),
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

function removeFromCart(pid)
{  let remove = document.getElementById('r'+pid);
const cart_id = remove.parentNode.parentNode.id;
console.log(cart_id);;

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
        let quantity = parseInt(document.getElementById("q" + cart_id).innerHTML);
        total_amount.innerHTML = parseInt(total_amount.innerHTML) - quantity * price;
      
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
