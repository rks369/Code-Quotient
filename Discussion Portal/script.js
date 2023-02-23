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

let questionCount = 1;
let questionList = [];

let currentQuestionIndex;

createQuestionList();

function compare(a, b) {
  return b["upVotes"] - a["upVotes"];
}

function createQuestionList() {
  questionListUL.innerHTML = "";
  questionCount = localStorage.getItem("questionCount") || 1;

  let questionListJSON = localStorage.getItem("questions") || "[]";
  questionList = JSON.parse(questionListJSON);
  questionList.sort(compare);
  questionList.forEach(function (questionObj) {
    createQuestionTile(questionObj);
  });
}

newQuestionBtn.addEventListener("click", function (event) {
  questionForm.style["display"] = "block";
  questionDetails.style["display"] = "none";
});

searchBar.addEventListener("keyup", function () {
  searchQuestion(searchBar.value);
});

function searchQuestion(term) {
  questionListUL.innerHTML = "";

  let filterList = questionList.filter(function (questionObj) {
    if (
      questionObj["subject"].toLowerCase().indexOf(term) != -1 ||
      questionObj["question"].toLowerCase().indexOf(term) != -1
    )
      return true;
    else return false;
  });
  console.log(filterList);
  if (filterList.length != 0) {
    filterList.forEach(function (questionObj) {
      createQuestionTile(questionObj);
    });
  } else {
    questionListUL.innerHTML = `<h1 class="h2">No Match Found !</h1>`;
  }
}

submitBtn.addEventListener("click", function () {
  let subject = subjectInput.value;
  let question = questionInput.value;
  if (subject != "" && question != "") {
    let questionObj = {
      id: "question" + questionCount++,
      subject: subject,
      question: question,
      time:Date.now(),
      response: [],
      upVotes: 0,
      downVotes: 0,
    };

    createQuestionTile(questionObj);

    addToLocalStorgae(questionObj);
    subjectInput.value = "";
    questionInput.value = "";
  }
});

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

  upVoteTag.addEventListener("click", function (event) {
    event.stopPropagation();
    let index = questionList.indexOf(questionObj);
    upVotesCount.innerHTML = ++questionList[index]["upVotes"];
    localStorage.setItem("questions", JSON.stringify(questionList));
    createQuestionList();
  });

  let downVoteTag = document.createElement("span");
  downVoteTag.innerHTML = "thumb_down";
  downVoteTag.classList.add("material-symbols-outlined");
  downVoteTag.style["color"] = "red";

  downVoteTag.addEventListener("click", function (event) {
    event.stopPropagation();
    let index = questionList.indexOf(questionObj);
    downVotesCount.innerHTML = ++questionList[index]["downVotes"];
    localStorage.setItem("questions", JSON.stringify(questionList));
    createQuestionList();
  });

  let upVotesCount = document.createElement("span");
  upVotesCount.innerHTML = questionObj["upVotes"];

  let downVotesCount = document.createElement("span");
  downVotesCount.innerHTML = questionObj["downVotes"];

  let createTime = document.createElement("p");

  createTime.innerHTML= getTimeMsg(questionObj["time"]);

  setInterval(function (){
    createTime.innerHTML= getTimeMsg(questionObj["time"]);

  },1000);

  li.appendChild(subjectTag);
  li.appendChild(questionTag);
  li.appendChild(upVoteTag);
  li.appendChild(upVotesCount);
  li.appendChild(downVoteTag);
  li.appendChild(downVotesCount);
  li.appendChild(createTime);

  li.addEventListener("click", function (event) {
    showQuestionDetials(questionObj);
  });

  questionListUL.appendChild(li);
}

function addToLocalStorgae(questionObj) {
  localStorage.setItem("questionCount", questionCount);
  questionList.push(questionObj);
  localStorage.setItem("questions", JSON.stringify(questionList));
}

function showQuestionDetials(questionObj) {
  userName.value = "";
  userResponse.value = "";
  ResponseList.innerHTML = "";
  questionForm.style["display"] = "none";
  questionDetails.style["display"] = "block";

  questionTitle.innerHTML = questionObj["subject"];
  questionDesc.innerHTML = questionObj["question"];

  currentQuestionIndex = questionList.indexOf(questionObj);
  createRespomseList();
}
function createRespomseList()
{
  ResponseList.innerHTML="";

    let responses = questionList[currentQuestionIndex]["response"];
    responses.sort(compare);
    responses.forEach(function (responseObj,index) {
      createResponseTile(responseObj,index);
    });
}

function createResponseTile(responseObj,index) {
  let li = document.createElement("li");
  li.classList.add("bg-light");

  let userName = document.createElement("h1");
  userName.innerHTML = responseObj["name"];

  let userResponse = document.createElement("h4");
  userResponse.innerHTML =responseObj["response"];

  let upVoteTag = document.createElement("span");
  upVoteTag.innerHTML = "thumb_up";
  upVoteTag.classList.add("material-symbols-outlined");
  upVoteTag.style["color"] = "green";

  upVoteTag.addEventListener("click", function () {
    upVotesCount.innerHTML = ++questionList[currentQuestionIndex]['response'][index]["upVotes"];
    localStorage.setItem("questions", JSON.stringify(questionList));
    createRespomseList();
  });

  let downVoteTag = document.createElement("span");
  downVoteTag.innerHTML = "thumb_down";
  downVoteTag.classList.add("material-symbols-outlined");
  downVoteTag.style["color"] = "red";

  downVoteTag.addEventListener("click", function () {
    console.log(index);
    downVotesCount.innerHTML = ++questionList[currentQuestionIndex]['response'][index]["downVotes"];
    localStorage.setItem("questions", JSON.stringify(questionList));
    createRespomseList();
  });

  let upVotesCount = document.createElement("span");
  upVotesCount.innerHTML = responseObj["upVotes"];

  let downVotesCount = document.createElement("span");
  downVotesCount.innerHTML = responseObj["downVotes"];


  li.appendChild(userName);
  li.appendChild(userResponse);
  li.appendChild(upVoteTag);
  li.appendChild(upVotesCount);
  li.appendChild(downVoteTag);
  li.appendChild(downVotesCount);
  
  ResponseList.appendChild(li);
}
function submitResponse() {
  let name = userName.value;
  let response = userResponse.value;
  if (name != "" && response != "") {
    let responseObj = {
      name: name,
      response: response,
      upVotes:0,
      downVotes:0
    };
    createResponseTile(responseObj,questionList[currentQuestionIndex].response.length);
    questionList[currentQuestionIndex].response.push(responseObj);
    localStorage.setItem("questions", JSON.stringify(questionList));
  }
  userName.value = "";
  userResponse.value = "";
}

function questionResolve() {
  questionList.splice(currentQuestionIndex, 1);
  localStorage.setItem("questions", JSON.stringify(questionList));
  createQuestionList();
  questionForm.style["display"] = "block";
  questionDetails.style["display"] = "none";
}
