let creditAmountText = document.getElementById("creditAmount");
let debitAmountText = document.getElementById("debitAmount");

let progressBar = document.getElementById("progressBar");
let myExpenses = document.getElementById("myExpenses");

let historyUL = document.getElementById("history");

function setAllValuesInUI() {
  setCreditAmountInUI();
  setDebitAmountInUI();
  setProgrerssBarInUI();
  setMyExpensesInUI();
  createHistoryList();
}

function setCreditAmountInUI() {
  creditAmountText.innerHTML = "$" + getCreditAmount().toFixed(2);
}

function setDebitAmountInUI() {
  debitAmountText.innerHTML = "$" + getDebitAmount().toFixed(2);
}

function setProgrerssBarInUI() {
  progressBar.value = getDebitAmount();
  progressBar.max = getCreditAmount();
}

function setMyExpensesInUI() {
  myExpenses.innerHTML =
    "$" + (getCreditAmount() - getDebitAmount()).toFixed(2);
}

function createHistoryList() {
  historyUL.innerHTML = "";

  let expenseList = getExpenseList();

  if (expenseList) {
    expenseList.forEach(function (expenseObj) {
      createExpenseTile(expenseObj);
    });
  } else {
    console.log(2);
  }
}

function createExpenseTile(expenseObj) {
  let li = document.createElement("li");
  li.classList.add("row");
  li.style["backgroundColor"] =
    expenseObj["type"] == "credit" ? "green" : "red";

  let div = document.createElement("div");
  div.classList.add("col-10");

  let title = document.createElement("p");
  title.classList.add("h5");

  title.innerHTML = expenseObj["title"];

  let amount = document.createElement("p");
  amount.style["color"] = expenseObj["type"] == "credit" ? "green" : "red";

  amount.innerHTML = `${expenseObj["type"] == "credit" ? "+$" : "-$"}${
    expenseObj["amount"]
  }`;

  let time = document.createElement("i");

  time.innerHTML = new Date(expenseObj["time"]).toLocaleString("en-US");
  div.appendChild(title);
  div.appendChild(amount);
  div.appendChild(time);

  let span = document.createElement("span");
  span.classList.add("col-1");
  span.classList.add("material-symbols-outlined");
  span.style["font-size"] = "32px";
  span.innerHTML = "delete";

  span.addEventListener("click", function () {
    removeExpense(expenseObj);
    setAllValuesInUI();
  });

  li.appendChild(div);
  li.appendChild(span);

  historyUL.appendChild(li);
}
