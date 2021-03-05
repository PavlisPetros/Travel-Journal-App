// Global Variables

const inputZipCode = document.querySelector('.input');
const btn = document.querySelector('.btn');
const descriptionTextarea = document.querySelector('.textarea');
const temperature = document.getElementById('temp');
const cityzip = document.getElementById('content');
const date = document.getElementById('date');
const ShowResult = document.getElementById('ShowFeelings');
const warningError = document.querySelector('.warning')


let d = new Date();
let newDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

// API openWeather

const apiUrl = 'api.openweathermap.org/data/2.5/weather?q=greece';
const apiKey = 'b0e6c62c57a8935bc5950c68fe8c5c39';
const units = '&units=metric';




// Get info function + error logs
const getinfo = () => {
    const zipCode = inputZipCode.value;
    const describeFeelings = descriptionTextarea.value;
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=${apiKey}${units}`;

    fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res && !res.main) {
                return;
            }
            const temp = res.main.temp;
            const cityName = res.name;
            const statusWeather = Object.assign({}, ...res.weather);
            const weatherDes = statusWeather.main;
            console.log(temp, cityName, weatherDes)
            const tempFloor = Math.floor(temp)
            cityzip.textContent = cityName;
            weather.textContent = weatherDes;
            postData('/add', {
                temperature: tempFloor,
                date: newDate,
                ShowResult: describeFeelings,
            }).then((res) => {
                const responeJson = res.json();
                return responeJson
            }).then((json) => {
                console.log(json)
                updateUserInfo();
            })

            inputZipCode.value = '';

        })
        .catch(() => {
            if (zipCode === '') {
                warningError.textContent = 'Please enter a valid zip code'
                return console.log('there is no zip code')
            }
        })

    warningError.textContent = '';
}
// Function date  with boilerplate

function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data) // strinfigify convert object into a string 
    });
};

//  Function updateUserInfo

const updateUserInfo = () => {
    fetch('/all')
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            date.innerHTML = 'ToDay is ' + json.date;
            temperature.innerHTML = 'The Temperature is ' + json.temperature + ' °C';
            ShowResult.innerHTML = 'I am Feeling: ' + json.ShowResult;
        })
}

btn.addEventListener('click', getinfo)
