const product_name = document.getElementById("name");
const product_description = document.getElementById("description");
const product_price = document.getElementById("price");
const product_stock = document.getElementById("stock");
const product_image = document.getElementById("image");

let addProductBtn = document.getElementById("addProductBtn");

addProductBtn.addEventListener("click", () => {
  let formData = new FormData();
  formData.append("name", product_name.value);
  formData.append("description", product_description.value);
  formData.append("price", product_price.value);
  formData.append("stock", product_stock.value);
  formData.append("image", product_image.files[0]);
  fetch("/addProduct",{method:'POST',body : formData}).then((response)=> response.json()).then((result)=>{
    console.log('done',result);
  });
});
