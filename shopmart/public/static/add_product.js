
const product_name = document.getElementById("name");
const product_description = document.getElementById("description");
const product_price = document.getElementById("price");
const product_stock = document.getElementById("stock");
const product_image = document.getElementById("image");

let productsList = document.getElementById("productsList");

const err_msg = document.getElementById("error_msg");

let addProductBtn = document.getElementById("addProductBtn");

let current_index = 0;
const count = 8;
let no_more_product = false;

getProductList();

load_more.addEventListener("click", () => {
  if (!no_more_product) {
    getProductList();
  }
});
addProductBtn.addEventListener("click", () => {
  err_msg.innerHTML = "";

  const title = product_name.value.trim();
  const description = product_description.value.trim();
  const price = product_price.value.trim();
  const stock = product_stock.value.trim();
  const image = product_image.files[0];

  if (title.length < 3) {
    err_msg.innerHTML = "Please Enter A Valid Name";
  } else if (description < 5) {
    err_msg.innerHTML = "Please Enter A Valid Deescription";
  } else if (price.length < 1) {
    err_msg.innerHTML = "Please Enter A Valid Price";
  } else if (stock.length < 1) {
    err_msg.innerHTML = "Please Enter A Valid Stock";
  } else if (product_image.files[0] == null) {
    err_msg.innerHTML = "Please Select A File";
  } else {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);
    fetch("/seller/addProduct", { method: "POST", body: formData })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result["data"] == "done") {
          product_name.value = "";
          product_description.value = "";
          product_price.value = "";
          product_stock.value = "";
          product_image.value = "";
        } else {
          err_msg.innerHTML = result["err"];
        }
      });
  }
});

function getProductList() {
  let div = document.createElement("div");

  div.innerHTML = "";
  fetch("/seller/getProductList", {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ current_index ,count}),
  })
    .then((response) => response.json())
    .then((msg) => {
      if(msg['err'])
      {
        productsList.classList.add('error_span');
        productsList.innerHTML='Something Went Wrong !!!'
      }else
      {
        current_index += count;
        result = msg['data'];
        if (result.length == 0) {
          load_more.innerHTML = "No More Products";
          load_more.classList.remove("primaryButton");
          load_more.classList.add("secondaryButton");
          no_more_product = true;
        } else {
          result.forEach((product) => {
            let productUI = document.createElement("div");
            productUI.classList.add("product_card");
  
            productUI.innerHTML = `
            <img src=../../${product.image} class="product_img" alt="...">
            <div>
            <h5 class="product_title">${product.title}</h5>
            <span class="product_price">Rs.${product.price}/-</span>
            </div>
            <h6 class='product_desc'>${product.description}</h6>
            <div>
              <button class="secondaryButton"  onclick=""  id=${product.pid}>Edit</button>
              <button class="primaryButton"  onclick=""  id=${product.pid}>Disable</button>
            </div>
            <br>`;
            productsList.appendChild(productUI);
          });
        }
      }
    });
}
