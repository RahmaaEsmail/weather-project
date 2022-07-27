var currentDay=document.getElementById('currentDay');
var currentDate=document.getElementById('currentDate');
var country=document.getElementById('country');
var tempToday=document.getElementById('temp-today');
var todayCaption=document.getElementById('todayCaption');
var todayImg=document.getElementById('todayImg');
var wind=document.getElementById('wind');
var direction=document.getElementById('direction');
var humidity=document.getElementById('humidity');

var nextDay=document.getElementsByClassName('nextDay');
var nextDate=document.getElementsByClassName('nextDate');
var nextImg=document.getElementsByClassName('nextImg')
var nextTempMax=document.getElementsByClassName('nextTempMax');
var nextTempMin=document.getElementsByClassName('nextTempMin');
var nextCaption=document.getElementsByClassName('nextCaption');

var searchInput=document.getElementById('searchInput');
let currentCity='Cairo';

let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let Months=['January','February','March','April','May','June','July','August','September','October','November','December'];


var date=new Date();
var weatherApi=[];


async function getWeatherData()
{
 let response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=5f9267e4dbd64761ac261218220506&q=${currentCity}&days=3&aqi=no&alerts=no`);
 weatherApi = await response.json();
   console.log(weatherApi);
  getTodayWeather();
  getNextWeather();
}
getWeatherData();


function getTodayWeather()
{
  let date=new Date();
  var temp=weatherApi.current.temp_c;
  currentDay.innerHTML=days[date.getDay()];
  currentDate.innerHTML=`${date.getDate()} ${Months[date.getMonth()]}`
  country.innerHTML=weatherApi.location.name;
  tempToday.innerHTML=`${temp} <sup>o</sup>C`;
  todayImg.setAttribute('src',`https:${weatherApi.current.condition.icon}`);
  todayCaption.innerHTML=weatherApi.current.condition.text;
  humidity.innerHTML=weatherApi.current.humidity;
  wind.innerHTML=weatherApi.current.wind_kph;
  direction.innerHTML=weatherApi.current.wind_dir;
}




function getNextWeather()
{
  for(var i=0;i<nextDay.length;i++)
  {
    nextDay[i].innerHTML=days[new Date(weatherApi.forecast.forecastday[i+1].date).getDay()];
  }

  for(var i=0;i<nextDate.length;i++)
  {
    nextDate[i].innerHTML=`${new Date(weatherApi.forecast.forecastday[i+1].date).getDate()} ${Months[new Date(weatherApi.forecast.forecastday[i+1].date).getMonth()]}`;
  }

  for(var i=0;i<nextImg.length;i++)
  {
    nextImg[i].setAttribute('src',`https:${weatherApi.forecast.forecastday[i+1].day.condition.icon}`)
  }

  for(var i=0;i<nextTempMax.length;i++)
  {
    nextTempMax[i].innerHTML=`${weatherApi.forecast.forecastday[i+1].day.maxtemp_c} <sup>o</sup>C`;
  }

  for(var i=0;i<nextTempMin.length;i++)
  {
    nextTempMin[i].innerHTML=`${weatherApi.forecast.forecastday[i+1].day.mintemp_c} <sup>o</sup>C`;
  }

  for(var i=0;i<nextCaption.length;i++)
  {
    nextCaption[i].innerHTML=weatherApi.forecast.forecastday[i+1].day.condition.text
  }
}


searchInput.addEventListener('keyup',function()
{
  currentCity=searchInput.value;
  getWeatherData()
})
