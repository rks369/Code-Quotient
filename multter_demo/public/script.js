const fileSelect = document.getElementById("select_file");
const uploadBtn = document.getElementById("uploadbtn");
const select_multi_file = document.getElementById("select_multi_file");

uploadBtn.addEventListener("click", () => {
  let file = fileSelect.files[0];
  console.log(file);
  const fd = new FormData();
  fd.append("image", file);
  fd.append("msg", "ejfherif");

  fetch("/upload", {
    method: "POST",

    body: fd,
  })
    .then((response) => response.json())
    .then((success) => console.log(success));

  // let files = select_multi_file.files;
  // let fds = new FormData();

  // console.log(files.length);

  // for (let i = 0; i < files.length; i++) {
  //   fds.append("images", files[i]);
  // }
  // fetch("/uploads", {
  //   method: "POST",
  //   body: fds,
  // })
  //   .then((response) => response.json())
  //   .then((success) => console.log(success));
});
