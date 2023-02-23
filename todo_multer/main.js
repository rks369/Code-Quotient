const express = require("express");
const fs = require("fs");
const multer = require("multer");
const app = express();
const port = 3000;

const upload = multer({ dest: "./public/images" });
app.use(express.static("./public"));
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/getTaskList", function (req, res) {
  fs.readFile(__dirname + "/tasks.json", "utf-8", function (err, data) {
    let taskList;
    if (data.length == 0) {
      taskList = [];
    } else {
      taskList = JSON.parse(data);
    }

    res.json(taskList);
  });
});

app.post("/addTask", upload.single("image"), function (req, res) {
  fs.readFile(__dirname + "/tasks.json", "utf-8", function (err, data) {
    let taskList;
    if (data.length == 0) {
      taskList = [];
    } else {
      taskList = JSON.parse(data);
    }
    let taskObj = {
        id: req.body.id,
        task: req.body.task,
        isDone: false,
        image: req.file.filename,
      }
    taskList.push(taskObj);

    fs.writeFile(
      "./tasks.json",
      JSON.stringify(taskList),
      function (err, data) {
        res.json(taskObj);
      }
    );
  });
});

app.post("/updateTask", function (req, res) {
  const taskId = req.body["id"];
  fs.readFile("./tasks.json", "utf-8", function (err, data) {
    let taskList;

    if (data.length == 0) {
      taskList = [];
    } else {
      taskList = JSON.parse(data);
    }

    let index;

    for (var i = 0; i < taskList.length; i++) {
      if (taskList[i]["id"] == taskId) {
        index = i;
        break;
      }
    }

    taskList[index]["task"] = req.body["task"];
    fs.writeFile(
      "./tasks.json",
      JSON.stringify(taskList),
      function (err, data) {
        res.end(data);
      }
    );
  });
});

app.post("/updateStatus", function (req, res) {
  const taskId = req.body["id"];
  fs.readFile("./tasks.json", "utf-8", function (err, data) {
    let taskList;

    if (data.length == 0) {
      taskList = [];
    } else {
      taskList = JSON.parse(data);
    }

    let index;

    for (var i = 0; i < taskList.length; i++) {
      if (taskList[i]["id"] == taskId) {
        index = i;
        break;
      }
    }

    taskList[index]["isDone"] = !taskList[index]["isDone"];
    fs.writeFile(
      "./tasks.json",
      JSON.stringify(taskList),
      function (err, data) {
        res.end(data);
      }
    );
  });
});

app.delete("/deleteTask", function (req, res) {
  const taskId = req.body["id"];
  fs.readFile("./tasks.json", "utf-8", function (err, data) {
    let taskList;

    if (data.length == 0) {
      taskList = [];
    } else {
      taskList = JSON.parse(data);
    }

    taskList = taskList.filter(function (taskObj) {
      if (taskObj["id"] == taskId) return false;
      else return true;
    });
    fs.writeFile(
      "./tasks.json",
      JSON.stringify(taskList),
      function (err, data) {
        res.end(data);
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
