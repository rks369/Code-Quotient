
function getQuestionListFromLocalStroage() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}

function setQuestionListInLocalStorage(questionList) {
  localStorage.setItem("questions", JSON.stringify(questionList));
}

function getQuestionCountFromLocalStorage() {
  return localStorage.getItem("questionCount") || 1;
}

function setQuestionCountInLocalStorage(questionCount) {
  localStorage.setItem("questionCount", questionCount);
}
