let items = document.getElementById("products");
let load_more = document.getElementById("load_more");

let pop_up = document.getElementById("popup");
let product_details = document.getElementById("product_details");
let close_popup = document.getElementById("close_popup");

let current_index = 5;

let no_more_product = false;

load_more.addEventListener("click", function () {
  if (!no_more_product) {
    fetch("/getMoreProducts", {
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
                       <div>
               
                           <h5 class="product_title">
                              ${product.name}
                           </h5>
                        
               
                           <a class="button"  onclick="viewMore(${product.id})"  id=${product.id}>View Details</a>
               
                       </div>     `;
            items.appendChild(productUI);
          });
        }
      });
  }
});

function viewMore(id) {
  pop_up.style.display = "block";

  product_details.innerHTML = "";

  fetch("/productDetails", {
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
             ${result.name}
             </h5>
            <p class="product_desc">
              ${result.description}
            <p>
            <p class="product_price">
           Rs. ${result.price} /-
          <p>
        
             <a  class="button"  id=${result.id}>Add To Cart</a>
  
  `;
      product_details.append(img);
      product_details.append(div);

    });
}

close_popup.addEventListener("click", () => {
  pop_up.style.display = "none";
});
