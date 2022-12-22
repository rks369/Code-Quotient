let languageId = document.getElementById("language");

let code = document.getElementById("code");

let compile = document.getElementById("compile");

let output = document.getElementById("output");

compile.addEventListener("click", function () {

  
  console.log(languageId.value, code.value);

  if (code.value != "") {
    let request = new XMLHttpRequest();
    request.open("POST", "https://codequotient.com/api/executeCode");
    request.send(
      JSON.stringify({ code: code.value, langId: languageId.value })

    );

    request.addEventListener('load',function(){
        console.log(JSON.parse(request.response));
    })
  }
});
