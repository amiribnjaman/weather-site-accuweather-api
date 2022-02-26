//  API's functionalities
const key = '5ZuMwByk1yKDipuUOHWyHmGfWKULPjtW';

// Get city
const getCity = async (city) => {
    const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const res = await fetch(baseUrl + query);
    const data = await res.json();
    return data[0];

}
// Get weather 
const getWeather = async (cityId) => {
    const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityId}?apikey=${key}`;

    const res = await fetch(baseUrl + query);
    const data = await res.json();
    return data[0]
}


// Event handler
document.getElementById('search-btn').addEventListener('click', () => {
    const cityInput = document.getElementById('city-name');
    const city = cityInput.value;
    updateCity(city);
    cityInput.value = '';
});

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    updateUi({cityDetails, weather})
}

