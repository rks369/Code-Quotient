let items = document.getElementById("products");
let load_more = document.getElementById("load_more");

let pop_up = document.getElementById("popup");
let product_details = document.getElementById("product_details");
let close_popup = document.getElementById("close_popup");

let current_index = 5;

let no_more_product = false;

load_more.addEventListener("click", function () {
  window.location.href='./login';
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
      console.log(result);
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
        
             <a  class="button"  id=${result.id}>Add To Cart</a>
  
  `;
      product_details.append(img);
      product_details.append(div);

    });
}

close_popup.addEventListener("click", () => {
  pop_up.style.display = "none";
});
