const product_name = document.getElementById("name");
const product_description = document.getElementById("description");
const product_price = document.getElementById("price");
const product_stock = document.getElementById("stock");
const product_image = document.getElementById("image");

const err_msg = document.getElementById("error_msg");

let addProductBtn = document.getElementById("addProductBtn");

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
