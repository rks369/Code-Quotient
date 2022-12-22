let openExpenseForm = document.getElementById("openExpenseForm");

let addExpenseForm = document.getElementById("addExpenseForm");
let expenseTitle = document.getElementById("expenseTitle");
let expenseAmount = document.getElementById("expenseAmount");
let addExpensebtn = document.getElementById("addExpense");

setAllValuesInUI();

openExpenseForm.addEventListener("click", function (evnet) {
  addExpenseForm.style["display"] = "flex";
});

addExpensebtn.addEventListener("click", function (evnet) {
  addExpenseForm.style["display"] = "none";

  let title = expenseTitle.value;
  let amount = parseInt(expenseAmount.value) || 0;
  let type;

  if (title != "" && amount != 0) {
    if (amount > 0) {
      type = "credit";
      updateCreditAmount(amount);
    } else if (amount < 0) {
      amount = -1 * amount;
      type = "debit";
      updateDebitAmount(amount);
    }
    let expenseObj = {
      id: getExpenseCount(),
      title: title,
      amount: amount,
      type: type,
      time: Date.now(),
    };

    addExpense(expenseObj);
    setAllValuesInUI();
    expenseTitle.value = "";
    expenseAmount.value = 0;
  }
});
