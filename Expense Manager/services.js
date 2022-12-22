function getExpenseCount() {
  return parseInt(localStorage.getItem("expenseCount") || 0);
}

function increaseExpenseCount() {
  localStorage.setItem("expenseCount", 1 + getExpenseCount());
}

function getCreditAmount() {
  return parseFloat(localStorage.getItem("creditAmount") || 0);
}

function updateCreditAmount(amount) {
  localStorage.setItem("creditAmount", getCreditAmount() + amount);
}

function getDebitAmount() {
  return parseFloat(localStorage.getItem("debitCount") || 0);
}
function updateDebitAmount(amount) {
  localStorage.setItem("debitCount", getDebitAmount() + amount);
}

function getExpenseList() {
  return JSON.parse(localStorage.getItem("expenseList") || "[]");
}

function addExpense(expenseObj) {
  increaseExpenseCount();
  let list = getExpenseList();
  list.push(expenseObj);
  localStorage.setItem("expenseList", JSON.stringify(list));
}

function removeExpense(expenseObj) {
  let list = getExpenseList();
  let index = findIndex(list, expenseObj);

  let amount = -1 * expenseObj["amount"];

  expenseObj["type"] == "credit"
    ? updateCreditAmount(amount)
    : updateDebitAmount(amount);
  console.log(index);
  list.splice(index, 1);
  localStorage.setItem("expenseList", JSON.stringify(list));
}

function findIndex(list, item) {
  for (let i = 0; i < list.length; i++) {
    if (list[i]["id"] == item["id"]) return i;
  }
  return -1;
}
