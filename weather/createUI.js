function addCityDataToUI() {
  let cityList = getCityListFromLocalStorage();

  cityList.forEach(function (city) {
    searchWeather(city);
  });
}

function addDetailsToUI(weatherObj) {
  let ul = document.getElementById("weatherCardList");

  weatherObj.weatherIcon = (weatherObj.weatherIcon>9?"":"0")+weatherObj.weatherIcon;

  let div = document.createElement("div");
  div.classList.add("weatherItem");
  div.innerHTML = `  <div class="flex">
        
  <p class="cityName">${weatherObj.cityName}</p><span class="countryId">${weatherObj.countryId}</span>
</div>
<div class="flex">
  <p class="temperature">${weatherObj.temperature}</p>
  <span class="unit">°C</span>
</div>
<img src="https://developer.accuweather.com/sites/default/files/${weatherObj.weatherIcon}-s.png" alt="weatherIcon">
<p class="weatherText">${weatherObj.weatherText}</p>`;
  ul.appendChild(div);
}
