//  API's functionalities
const key = 'VWCDNycO3tmjaAXRUU0zOJHPgqtPRbTJ';

// Get city
const getCity = async (city) => {
    const baseUrl = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const res = await fetch(baseUrl + query)
    const data = await res.json();
    return data[0];

}
// Get weather 
const getWeather = async (cityId) => {
    const baseUrl = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityId}?apikey=${key}`;

    console.log( baseUrl+query)
    const res = await fetch(baseUrl + query)
    const data = await res.json();
    return data[0]
}


// Event handler
document.getElementById('search-btn').addEventListener('click', () => {
    const output = document.getElementById('weather-output');

    const cityInput = document.getElementById('city-name');
    const city = cityInput.value;
    updateCity(city);
    cityInput.value = '';
    output.innerHTML = '';
});


// Update city
const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    console.log(cityDetails.Key)
    const weather = await getWeather(cityDetails.Key);

    updateUi({cityDetails, weather})
}

// Update UI
const updateUi = (data) => {
    const inputSection = document.getElementById('input-sec');
    const output = document.getElementById('weather-output');
    const city = data.cityDetails;
    const weather = data.weather;

    console.log(city)
    console.log(weather)


    inputSection.classList.add('output-effect');
    
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card p-3" style="">
            <div class="row">
                <div class="col-md-6">
                    <h5 class="fw-light ms-1">Current Weather</h5>
                    <h6 class="my-2 ms-1">${city.EnglishName}, ${city.Country.EnglishName}.</h6>
                    <div class="d-flex justify-content-between">
                        <img src="./assets/icons/${weather.WeatherIcon}.svg" style="width: 125px;" />
                        <div class="me-3 pt-4 pt-md-0">
                            <h1 class="display-1 text-end fw-bold temp mt-1">${weather.Temperature.Metric.Value}<sup>&deg;</sup> <sub>c</sub></h1>

                        </div>
                    </div>
                </div>
                <div class="col-md-6 mt-5">
                    <ul class="mt-2 ps-0">
                        <li class="d-flex justify-content-between">
                            <h6 class="fw-normal">Day/Night:<h6>
                            <h6 class="fw-normal">${ weather.IsDayTime ? 'Day' : 'Night'}</h6>
                        </li>
                        <hr class="my-2"/>
                        <li class="d-flex justify-content-between">
                            <h6 class="fw-normal">Weather Condition:<h6>
                            <h6 class="fw-normal">${weather.WeatherText}</h6>
                        </li>
                        <hr class="my-2"/>
                        <li class="d-flex justify-content-between">
                            <h6 class="fw-normal">Precipitate?<h6>
                            <h6 class="fw-normal">${weather.HasPrecipitation ? "Yes, It's a Rainy Day" : "No, It's a sunny day"}</h6>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `

    output.appendChild(div);
    
}