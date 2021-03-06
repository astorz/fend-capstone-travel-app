/* Global Variables */
// GeonamesAPI:
const baseUrlGeonames = 'http://api.geonames.org/search?';
const userGeonames = 'astorz';

// WeatherbitAPI:
const baseUrlCurrentWeather = 'https://api.weatherbit.io/v2.0/current';
const baseUrlForecastWeather = 'https://api.weatherbit.io/v2.0/forecast/daily';
const keyWeatherbitAPI = 'ff24eb599ebd41c89b656162cc9b3334';

// PixabayAPI:
const baseUrlPixabayAPI = 'https://pixabay.com/api/?';
const keyPixabayAPI = '21879054-7849db0979c379d492c58f526';


// Callback function to be executed on click
export const mainFunction = () => {
    cleanElem('#results-table-body');
    cleanElem('#current-description');

    // Country input validation
    const countryList = document.getElementById('countries');
    const countriesCheck = [];
    const countryListChildren = countryList.children;
    for (const country of countryListChildren) {
        countriesCheck.push(country.value);
    }
    let country = document.getElementById('country').value;
    if(!countriesCheck.includes(country)){
        alert("Not a valid country");
        return;
    }
    const country_code = document.getElementById(`${country}_option`).getAttribute('data-country-code');
    let cityName = document.getElementById('city').value;
    
    // City input validation
    if(cityName == "") {
        alert('"City" cannot be empty');
        return;
    }

    // Cleaning city name for input to APIs
    let city = cityName.trim();
    city = city.toLowerCase();
    city = city.replace(" ","-");
    // Cleaning country name for input to PixabayAPI
    let countryClean = country.trim();
    countryClean = countryClean.toLowerCase();
    countryClean = countryClean.replace(" ","-");
    let pixabaySearchTerm = `${city}+${countryClean}`;
    let travelDate = document.getElementById('travel-date').value;

    geonamesAPI(baseUrlGeonames, city, country_code, userGeonames)
    .then(function(data){
        // Validation: Length of Geonames return object must be greater than 0
        if(data.totalResultsCount == 0) {
            alert('"City" not recognized. Please check your entry or try a different city nearby');
            return;
        }
        // Using first entry for city, getting latitude and longitude details
        const lat = data["geonames"][0]["lat"];
        const lng = data["geonames"][0]["lng"];
        const geoData = {"lat": lat, "lng": lng};
        return geoData;
    })

    .then(function(data){
        if(daysToTrip(travelDate, new Date()) <= 7) {
            weatherbitApi(baseUrlCurrentWeather, data["lat"], data["lng"], keyWeatherbitAPI)
            .then(function(data){
                const weather = data;
                const temp = document.querySelector('#current-temp');
                temp.innerHTML = `${weather["data"][0]["temp"]}??F`;
                const description = document.querySelector('#current-description');
                const icon_img = document.createElement('img');
                icon_img.src = `https://www.weatherbit.io/static/img/icons/${weather["data"][0]["weather"]["icon"]}.png`;
                icon_img.setAttribute('style', 'height: 60px;');
                description.appendChild(icon_img);
                const sunrise = document.querySelector('#current-sunrise');
                const sunrise_utc = new Date(`${weather["data"][0]["datetime"].split(':')[0]} ${weather["data"][0]["sunrise"]} UTC`);
                sunrise.innerHTML = `Sunrise: ${toLocal(sunrise_utc, weather["data"][0]["timezone"])}`;
                const sunset = document.querySelector('#current-sunset');
                const sunset_utc = new Date(`${weather["data"][0]["datetime"].split(':')[0]} ${weather["data"][0]["sunset"]} UTC`);
                sunset.innerHTML = `Sunset: ${toLocal(sunset_utc, weather["data"][0]["timezone"])}`;
                const humidity = document.querySelector('#current-humidity');
                humidity.innerHTML = `Humidity: ${Math.round(weather["data"][0]["rh"])}%`;
                const clouds = document.querySelector('#current-clouds');
                clouds.innerHTML = `Clouds: ${weather["data"][0]["clouds"]}%`;
                const wind = document.querySelector('#current-wind');
                wind.innerHTML = `Wind: ${weather["data"][0]["wind_cdir"]} ${Math.round(weather["data"][0]["wind_spd"] * 2.236936)} mph`;
                
                document.querySelector('#results-cover').style.display = 'none';
                document.querySelector('.forecast-table').style.display = 'none';
                document.querySelector('#current-weather').style.display = 'block';
            })
            // Check later: do i need line below (i.e. return data)?
            // return data;
        } else {
            weatherbitApi(baseUrlForecastWeather, data["lat"], data["lng"], keyWeatherbitAPI)
            .then(function(data){
                const weather = data["data"].slice(8 + (daysToTrip(travelDate, data["data"][0]["datetime"]) - 8));
                // change above later to pick up to 8 forecast days
                weather.forEach(data => {
                    const tableRow = document.createElement('tr');
                    // Inserting date
                    const date = document.createElement('td');
                    // See: https://stackoverflow.com/questions/5619202/converting-a-string-to-a-date-in-javascript
                    const date_parts = data["valid_date"].split('-');
                    const datetime_str = new Date(date_parts[0], date_parts[1] - 1, date_parts[2]).toDateString(); 
                    const date_str = datetime_str.slice(0, datetime_str.length - 5);
                    date.innerHTML = date_str;
                    tableRow.appendChild(date);
                    // Inserting weather conditions
                    const conditions = document.createElement('td');
                    conditions.setAttribute('style', 'text-align: center;');
                    // conditions.innerHTML = data["weather"]["description"];
                    const icon_img = document.createElement('img');
                    icon_img.src = `https://www.weatherbit.io/static/img/icons/${data["weather"]["icon"]}.png`;
                    icon_img.setAttribute('style', 'height: 35px; margin-top: -10px; margin-bottom: -12.5px;');
                    conditions.appendChild(icon_img);
                    tableRow.appendChild(conditions);
                    // Inserting max temp
                    const max_temp = document.createElement('td');
                    max_temp.innerHTML = `${Math.round(data["max_temp"])}??`;
                    tableRow.appendChild(max_temp);
                    // Inserting min temp
                    const min_temp = document.createElement('td');
                    min_temp.innerHTML = `${Math.round(data["min_temp"])}??`;
                    tableRow.appendChild(min_temp);
                    // Inserting chance of precipitation
                    const precip = document.createElement('td');
                    precip.innerHTML = `${data["pop"]}%`;
                    tableRow.appendChild(precip);

                    document.querySelector('#results-table-body').appendChild(tableRow);
                    document.querySelector('#results-cover').style.display = 'none';
                    document.querySelector('#current-weather').style.display = 'none';
                    document.querySelector('.forecast-table').style.display = 'table';
                });
            })
        };
    })

    .then(function(data){
        // Changing heading dynamically based on location entry
        document.getElementsByTagName('h2')[0].innerHTML = `Weather conditions for your upcoming trip to ${cityName.trim()}, ${country.trim()}`;
        // Calling Pixabay API to retrieve image url
        pixabayAPI(baseUrlPixabayAPI, keyPixabayAPI, pixabaySearchTerm)
        .then(function(data){
            // Testing if Pixabay found at least 1 image result
            // If not, will use random result only for Country (in else clause)
            if(data.totalHits > 0) {
                // Selecting random number from returned array
                // Code example from: https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
                const random = Math.floor(Math.random() * data["hits"].length);
                document.querySelector("#image").setAttribute('src', data["hits"][random]["webformatURL"]);
            } else {
                pixabayAPI(baseUrlPixabayAPI, keyPixabayAPI, countryClean)
                .then(function(data){
                    const random = Math.floor(Math.random() * data["hits"].length);
                    document.querySelector("#image").setAttribute('src', data["hits"][random]["webformatURL"]);
                })
            }
        })
    })
};


// Function to call Geonames API
const geonamesAPI = async(base, city, country_code, key) => {
    // Example query format
    // http://api.geonames.org/search?name_equals=rottweil&country=de&username=astorz&type=json
    const searchString = `${base}name_equals=${city}&country=${country_code}&username=${key}&type=json`;
    const res = await fetch(searchString);
    try {
        const geoData = await res.json();
        return geoData;
      } catch(error){
        console.log('error', error);
      }
}

// Function to call Weatherbit API
const weatherbitApi = async(base, lat, lng, key) => {
    // Example query format:
    // https://api.weatherbit.io/v2.0/forecast/daily&lat=38.123&lon=-78.543&key=API_KEY
    const searchString = `${base}?lat=${lat}&lon=${lng}&key=${key}&units=I`;
    const res = await fetch(searchString);
    try {
        const weatherData = await res.json();
        return weatherData;
    } catch(error){
        console.log('error', error);
    }
}

// Function to call Pixabay API
const pixabayAPI = async(base, key, searchTerm) => {
    // Example query format:
    // https://pixabay.com/api/?key=21879054-7849db0979c379d492c58f526&q=yellow+flowers&image_type=photo
    const searchString = `${base}key=${key}&q=${searchTerm}&image_type=photo&per_page=100`;
    const res = await fetch(searchString);
    try {
        const photoData = await res.json();
        return photoData;
    } catch(error){
        console.log('error', error);
    }
}

// Helper function to calculate time until start date of trip
const daysToTrip = (start, now) => {
    // Solution adapted from here: https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
    const parts = start.split('-');
    const startDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const today = Date.parse(now);
    const diffTime = Math.abs(startDate - today);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}


// Helper function to display in local time
const toLocal = (time, tz) => {
    // Solution from here: https://stackoverflow.com/questions/8207655/get-time-of-specific-timezone
    let options = {
        timeZone: tz,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        },
        formatter = new Intl.DateTimeFormat([], options);
    
    return formatter.format(time).split(',')[1].trim();
}

// Helper function to clean table (removes rows) on 'submit'
const cleanElem = (id) => {
    const elem = document.querySelector(id);
    elem.innerHTML = '';
}

export const reload = () => {
    reload = location.reload();
}

export const buildForm = async () => {
    const req = await fetch('https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json');
    try {
        const data = await req.json()
        .then(data => {
            const dropdown = document.querySelector('#countries');
            data.forEach(entry => {
                const newOption = document.createElement('option');
                newOption.setAttribute('value', entry["Name"]);
                newOption.setAttribute('data-country-code', entry["Code"]);
                newOption.setAttribute('id', `${entry["Name"]}_option`);
                dropdown.appendChild(newOption);
            });
        });
    let today = new Date();
    let date_max_forecast = new Date();
    date_max_forecast.setDate(today.getDate() + 15);
    date_max_forecast = date_max_forecast.toISOString().substr(0, 10);
    today = today.toISOString().substr(0, 10);
    document.querySelector("#travel-date").value = today;
    document.querySelector("#travel-date").min = today;
    document.querySelector("#travel-date").max = date_max_forecast;
    } catch(error) {
        console.log("error", error);
    }
}