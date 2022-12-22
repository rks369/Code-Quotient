let newQuestionBtn = document.getElementById("newQuestion");
let searchBar = document.getElementById("searchBar");

let subjectInput = document.getElementById("Subject");
let questionInput = document.getElementById("Question");
let submitBtn = document.getElementById("submitButton");

let questionListUL = document.getElementById("questionList");

let questionForm = document.getElementById("questionForm");
let questionDetails = document.getElementById("questionDetails");

let questionTitle = document.getElementById("questionTitle");
let questionDesc = document.getElementById("questionDesc");

let userName = document.getElementById("userName");
let userResponse = document.getElementById("userResponse");

let submitResponseBtn = document.getElementById("submitResponseBtn");

let ResponseList = document.getElementById("ResponseList");

let currentQuestionIndex;

createQuestionList();

function createQuestionTile(questionObj) {
  let li = document.createElement("li");
  li.id = questionObj["id"];

  let subjectTag = document.createElement("h1");
  subjectTag.innerHTML = questionObj["subject"];

  let questionTag = document.createElement("h4");
  questionTag.innerHTML = questionObj["question"];

  let upVoteTag = document.createElement("span");
  upVoteTag.innerHTML = "thumb_up";
  upVoteTag.classList.add("material-symbols-outlined");
  upVoteTag.style["color"] = "green";

  upVoteTag.addEventListener("click", function () {
    let questionList = getQuestionListFromLocalStroage();
    let index = questionList.indexOf(questionObj);
    upVotesCount.innerHTML = ++questionList[index]["upVotes"];
    setQuestionListInLocalStorage(questionList);
  });

  let downVoteTag = document.createElement("span");
  downVoteTag.innerHTML = "thumb_down";
  downVoteTag.classList.add("material-symbols-outlined");
  downVoteTag.style["color"] = "red";

  downVoteTag.addEventListener("click", function () {
    let questionList = getQuestionListFromLocalStroage();
    let index = questionList.indexOf(questionObj);
    console.log(index);
    downVotesCount.innerHTML = ++questionList[index]["downVotes"];
    setQuestionListInLocalStorage(questionList);
  });

  let upVotesCount = document.createElement("span");
  upVotesCount.innerHTML = questionObj["upVotes"];

  let downVotesCount = document.createElement("span");
  downVotesCount.innerHTML = questionObj["downVotes"];

  li.appendChild(subjectTag);
  li.appendChild(questionTag);
  li.appendChild(upVoteTag);
  li.appendChild(upVotesCount);
  li.appendChild(downVoteTag);
  li.appendChild(downVotesCount);

  li.addEventListener("click", function (event) {
    showQuestionDetials(questionObj);
  });

  questionListUL.appendChild(li);
}

function createQuestionList() {
  getQuestionListFromLocalStroage().forEach(function (questionObj) {
    createQuestionTile(questionObj);
  });
}

function showQuestionDetials(questionObj) {
  console.log(questionObj);

  userName.value = "";
  userResponse.value = "";
  ResponseList.innerHTML = "";
  questionForm.style["display"] = "none";
  questionDetails.style["display"] = "block";

  questionTitle.innerHTML = questionObj["subject"];
  questionDesc.innerHTML = questionObj["question"];

  questionObj["response"].forEach(function (responseObj) {
    createResponseTile(responseObj);
  });
}
