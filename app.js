// variables
let weather_btn = document.querySelector('#get-weather');
let input_city = document.querySelector('.city')
let country = document.querySelector('.c-city');

let temDegree = document.querySelector('.degree');
let des = document.querySelector('.degree-desc p')
let weatherIcon = document.querySelector('.icon-1');
let feels = document.querySelector('.feals span')
let $humidity = document.querySelector('.humadity span')


// functions
function autoWeather() {
    let baladweyn = 'Beledweyne'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${baladweyn}&units=metric&appid=ab4bd78aae339b38403bfeeeda79b510`)
        .then(resp => resp.json())
        .then(data => {
            const descr = data['weather'][0]['description']
            const capital = data['name'];
            const temp = data['main']['temp'];
            let icon_api = data['weather'][0]['id']
            const feesl_like = data['main']['feels_like'];
            let humadity_api = data['main']['humidity'];
            feels.innerHTML = Math.floor(feesl_like)
            country.innerHTML = capital;
            $humidity.innerHTML = Math.floor(humadity_api) + '%'
            country.innerHTML = capital;


            temDegree.innerHTML = Math.floor(temp) + '°C'
            des.innerHTML = descr;


            if (icon_api == 800) {
                weatherIcon.src = `clear.png`
            } else if (icon_api >= 200 && icon_api <= 232) {
                weatherIcon.src = `thunder.png`
            } else if (icon_api >= 500 && icon_api <= 531) {
                weatherIcon.src = `rain.png`
            } else if (icon_api >= 600 && icon_api <= 622) {
                weatherIcon.src = `snow.png`
            } else if (icon_api >= 701 && icon_api <= 781) {
                weatherIcon.src = `Atmosphere.png`
            } else if (icon_api >= 801 && icon_api <= 804) {
                weatherIcon.src = `cloud.png`
            }

        })

}


// events
weather_btn.addEventListener('click', getWeather)

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input_city.value}&units=metric&appid=ab4bd78aae339b38403bfeeeda79b510`)
        .then(response => response.json())
        .then(data => {
            // data
            let { feels_like, humidity, temp } = data['main'];
            let cityName = data['name'];
            let { description, id } = data['weather'][0]

            //appends
            temDegree.innerHTML = Math.floor(temp) + '°C';
            des.innerHTML = description;
            country.innerHTML = cityName;

            feels.innerHTML = Math.floor(feels_like);
            $humidity.innerHTML = humidity + "%";

            weatherCondition(id, weatherIcon)

        }).catch(err => alert('Invalid CityName Plz Check\nYour Spelling And Try Again!'))
}

function weatherCondition(iconID, icon) {
    if (iconID == 800) {
        icon.src = 'clear.png'
    } else if (iconID >= 200 && iconID <= 232) {
        icon.src = 'thunder.png'
    } else if (iconID >= 500 && iconID <= 531) {
        icon.src = 'rain.png'
    } else if (iconID >= 600 && iconID <= 622) {
        icon.src = 'snow.png'
    } else if (iconID >= 701 && iconID <= 781) {
        icon.src = 'atmosphere.png'
    } else if (iconID >= 801 && iconID <= 804) {
        icon.src = 'cloud.png'
    }
}

autoWeather()
