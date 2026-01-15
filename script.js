const weather=document.querySelector('.weather');
const cityInput=document.querySelector('.city');
const resultCard=document.querySelector('.result');
const apiKey="bd528985d1b2b0c3c745dfea4c630a5d";

weather.addEventListener('submit', async e=>{
    e.preventDefault();
    const city=cityInput.value.trim();  
    if(city){
        try{
            const weatherData= await getData(city);
            displayinfo(weatherData);
        }
        catch(error){
            showError("City not found !!! ");
        }
    }
    else{
        showError("Please enter a city name !!! ");
    }
})

async function getData(city){
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response=await fetch(apiURL);
    if(!response.ok){
        showError('Network response was not ok');
    }
    const data=await response.json();
    return data;
}

function displayinfo(data){
    const {name:city,main:{temp,humidity},weather:[{description,icon}],wind:{speed}}=data;
    const tempC=(temp-273.15).toFixed(2);
    resultCard.style.display='flex';
    resultCard.innerHTML=`
        <h2 class="city-name">${city}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
        <p class="temperature">${tempC}°C</p>
        <p class="humidity">Humidity: ${humidity}%</p>
        <p class="description">Description: ${description}</p>
        <p class="wind-speed">Wind Speed: ${speed} m/s</p>
    `;      
}

function showError(message){
    const err_display=document.createElement('p');
    err_display.className='error';
    err_display.textContent=message;
    resultCard.textContent='';
    resultCard.style.display='block';   
    resultCard.appendChild(err_display);
}