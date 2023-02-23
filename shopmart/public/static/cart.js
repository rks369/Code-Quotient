function addToCart(pid) {
  console.log(pid);
}

function removeFromCart(pid) {
  let quantity = document.getElementById("q" + pid).innerHTML;
  fetch("/removeFromCart", {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ id: pid }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result["err"]) {
        alert("Something Went Wrong");
      } else {
        updateProductsQuantiy(pid, -1);
      }
    });
}

function addToCart(pid) {
  fetch("/addToCart", {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ id: pid }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result["err"]) {
        alert("Something Went Wrong");
      } else {
        updateProductsQuantiy(pid, 1);
      }
    });
}

function updateProductsQuantiy(pid, change) {
  let total_amount = document.getElementById("total_amount");
  let amountTag = document.getElementById("a" + pid);
  let quantityTag = document.getElementById("q" + pid);
  let price = parseInt(document.getElementById("p" + pid).innerHTML);
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
