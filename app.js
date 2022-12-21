const table = document.querySelector('table');
const table1 = document.querySelector('.table');
const form = document.querySelector('.searchForm');
const temp = document.querySelector('#temp');
const loca = document.querySelector('#location');
const condi = document.querySelector('#condition');
const windSpeed = document.querySelector('#windSpeed');
const rain = document.querySelector('#rain');
const weatherLogo = document.createElement('img');

table1.style.visibility = "hidden";

form.addEventListener('submit', async function (event) {
  event.preventDefault();

try {

  //Epmty table content
  if(table.tBodies[0].rows[0].innerText != ''){
    table.tBodies[0].rows[0].innerHTML = '<th scope="row" class="gray">temp(°C)</th>';
  }
  if(table.tBodies[0].rows[1].innerText != ''){
    table.tBodies[0].rows[1].innerHTML = '<th scope="row" class="black">Rainfall(mm)</th>';
  }
  if(table.tBodies[0].rows[2].innerText != ''){
    table.tBodies[0].rows[2].innerHTML = '<th scope="row" class="gray">Windspeed(mph)</th>';
  }

  //fetching the data from api the returning it
  //current conditions
  const searchTerm = form.elements.location.value;
  const res = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=4e25b3235d1a4abf805223621221912&q=${searchTerm}&days=7&aqi=no&alerts=no`);


  loca.innerText = `Weather in ${res.data.location.name} (${res.data.location.localtime})`
  temp.innerText = `${res.data.current.temp_c}°C`;
  condi.innerText = res.data.current.condition.text;
  weatherLogo.src = res.data.current.condition.icon;
  weatherLogo.className = '.conditions';
  document.querySelector('#imgContainer').append(weatherLogo)

  windSpeed.innerText = `Wind Speed: ${res.data.current.wind_mph}mph`

  rain.innerText = `Rain: ${res.data.current.precip_mm}mm`

  //filling the forcast table content
  for(let i = 0; i < 23;i = i + 1) {
    const tdtemp = document.createElement('td');
    tdtemp.innerText = `${res.data.forecast.forecastday[0].hour[i].temp_c}°C`;
    document.querySelector('#tempf').append(tdtemp)

    const tdrain = document.createElement('td');
    tdrain.innerText =  `${res.data.forecast.forecastday[0].hour[i].precip_mm}mm`;
    document.querySelector('#rainf').append(tdrain)

    const tdwind = document.createElement('td');
    tdwind.innerText =  `${res.data.forecast.forecastday[0].hour[i].wind_mph}mph`;
    document.querySelector('#windf').append(tdwind)
  }

  console.log(res)
  table1.style.visibility = "visible";
  form.elements.location.value = '';
} catch (e) {
  console.log(e)
  table1.style.visibility = "hidden";
  window.alert("Pick a valid location");
}

});
