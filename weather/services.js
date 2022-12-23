function getCityListFromLocalStorage() {
  return JSON.parse(localStorage.getItem("cityList") || "[]");
}

function addToLocalStorage(city) {
  let cityList = getCityListFromLocalStorage();

  cityList.push(city);
  localStorage.setItem("cityList", JSON.stringify(cityList));
}
