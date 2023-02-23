let items = document.getElementById("products");
let load_more = document.getElementById("load_more");

let pop_up = document.getElementById("popup");
let product_details = document.getElementById("product_details");
let close_popup = document.getElementById("close_popup");

let current_index = 0;

let no_more_product = false;
getProducts();

load_more.addEventListener("click", function () {
  getProducts();
});

function getProducts() {
  if (!no_more_product) {
    fetch("/product/getMoreProducts", {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ index: current_index }),
    })
      .then((response) => response.json())
      .then((result) => {
        current_index += 5;
        if (result.length == 0) {
          load_more.innerHTML = "No More Products";
          no_more_product = true;
        } else {
          result.forEach((product) => {
            let productUI = document.createElement("div");
            productUI.classList.add("product_card");

            productUI.innerHTML = `
                       <img src=${product.image} class="product_img" alt="...">
                       
               
                           <h5 class="product_title">
                              ${product.title}
                           </h5>
                        
                        <div>
                                          <a class="button"  onclick="addToCart(${product.pid})"  id=${product.pid}>Add To Cart</a>

                           <a class="button"  onclick="viewMore(${product.pid})"  id=${product.pid}>View More</a>
                </div>
                         `;
            items.appendChild(productUI);
          });
        }
      });
  }
}

function addToCart(id) {
  let p = document.getElementById(id);

  if (p.innerHTML == "Add To Cart") {
    fetch("/addToCart", {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["err"]) {
          alert("Something Went Wrong");
        } else {
          p.innerHTML = "Remove From Cart";
        }
        console.log(result);
      });
  } else if (p.innerHTML == "Remove From Cart") {
    fetch("/removeFromCart", {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["err"]) {
          alert("Something Went Wrong");
        } else {
          p.innerHTML = "Add To Cart";
        }
        console.log(result);
      });
  }
}

function viewMore(id) {
  pop_up.style.display = "block";

  product_details.innerHTML = "";

  fetch("/product/productDetails", {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((response) => response.json())
    .then((result) => {
      let img = document.createElement("img");
      img.src = result.image;
      img.classList.add("product_img");

      let div = document.createElement("div");
      div.innerHTML = ` 
         
  
             <h5 class="product_title">
             ${result.title}
             </h5>
            <p class="product_desc">
              ${result.description}
            <p>
            <p class="product_price">
           Rs. ${result.price} /-
          <p>
           <a class="button"  onclick="addToCart(${result.pid})"  id=${result.pid}>Add To Cart</a>
<a class="button"  onclick=""  id=${result.pid}>Buy Now</a>
          
  `;
      product_details.append(img);
      product_details.append(div);
    });
}

close_popup.addEventListener("click", () => {
  pop_up.style.display = "none";
});
