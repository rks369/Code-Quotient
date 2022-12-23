let searchCity = document.getElementById("searchCity");

let Submit = document.getElementById("Submit");

const baseApiURL = "http://dataservice.accuweather.com";
const apiKey = "DzJslNpEvpWE9Ajkrne3L1TOL5QyYhvO";

addCityDataToUI();

Submit.addEventListener("click", function () {
  if (searchCity.value != "") {
    getCountryKey(searchCity.value);
  }
});

function getCountryKey(city) {
  fetch(`${baseApiURL}/locations/v1/cities/search?apikey=${apiKey}&q=${city}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (list) {
      if (list.length == 0) {
        alert("Please Seach A Valid City");
      } else {
        let city = {
          name: list[0].LocalizedName,
          key: list[0].Key,
          countryId: list[0].Country.ID,
        };
        searchWeather(city);
        addToLocalStorage(city);
      }
    });
}

function searchWeather(city) {
  fetch(`${baseApiURL}/currentconditions/v1/${city.key}?apikey=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      if (res.length == 0) {
        alert("Something Went Wrong");
      } else {
        let weatherObj = {
          cityName: city.name,
          countryId: city.countryId,
          temperature: res[0].Temperature.Metric.Value,
          weatherIcon: res[0].WeatherIcon,
          weatherText: res[0].WeatherText,
        };
        addDetailsToUI(weatherObj);
      }
    });
}


