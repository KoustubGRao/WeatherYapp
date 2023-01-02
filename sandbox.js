const API_KEY = '6ab7d31c7e5ed05122193f9e8702a394';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const LAT = 'lat=';
const LON = '&lon=';
const BASE_URL_2 = '&appid=';
let lat,lon;
let historyEl=document.getElementById('history');

let input =document.getElementById('input');
let temperature=document.getElementById('temperature');
let humidity=document.getElementById('humidity');
let precipitation=document.getElementById('precipitation');
let place=document.getElementById('location');
let bg=document.getElementById('background');
const userCardTemplate = document.querySelector("[data-user-template]");

const searchLat = document.querySelector("[data-search-lat]");
const searchLon = document.querySelector("[data-search-lon]");
const searchButton = document.querySelector("[data-search-button]");

const histContainer = document.querySelector("[data-container]");
const histCardTemplate = document.querySelector("[data-user-template-2]");

let history=[];


if(!JSON.parse(localStorage.getItem('history')))
{let history=JSON.parse(localStorage.getItem('history'));}

if(navigator.geolocation){
navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude.toFixed(2);
    lon = position.coords.longitude.toFixed(2);
    console.log(lat,lon);
    const API_URL = BASE_URL + LAT + lat + LON + lon + BASE_URL_2 + API_KEY + '&units=metric';
    fetch(API_URL,{method:'GET'})
    .then(function(response){return response.json()})
    .then(function(jsonData){
        //console.log(jsonData);
        localStorage.setItem('history',JSON.stringify(history));
        temperature.textContent='Temperature: '+jsonData.main.temp+'˚c';
        humidity.textContent='Humidity: '+jsonData.main.humidity+"%";
        precipitation.textContent=jsonData.weather[0].description.toUpperCase();
        place.textContent = 'Location: '+ jsonData.name;
        bg.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+jsonData.name+"')";  

        let x;
        x= JSON.stringify(new Date());
        history.push(
            {
                location:jsonData.name,
                description:jsonData.weather[0].description.toUpperCase(),
                temperature:jsonData.main.temp+'˚c',
                humidity:jsonData.main.humidity+"%",
                time: x
            });
        // console.log(history);
        localStorage.setItem('history',JSON.stringify(history));
        //record();
    });    
});
}
else{console.log("doesnt support geolocator")};

function myFunction(){
    lat= searchLat.value;
    lon= searchLon.value;
    if (lat==="" || lon===''){
        alert('Latitude or Longitude is missing like ur father!!!');
        return ;
    }
    const API_URL = BASE_URL + LAT + lat + LON + lon + BASE_URL_2 + API_KEY + '&units=metric';

    fetch(API_URL,{method:'GET'})
        .then(function(response){return response.json()})
        .then(function(jsonData){
            //console.log(jsonData);
            //console.log(new Date());
            let x;
            x= JSON.stringify(new Date())
            
// to save data in history as local-save in form of string
            history.push(
                {
                    location:jsonData.name,
                    description:jsonData.weather[0].description.toUpperCase(),
                    temperature:jsonData.main.temp+'˚c',
                    humidity:jsonData.main.humidity+"%",
                    time: x
                });
            console.log(history);
            localStorage.setItem('history',JSON.stringify(history));

            temperature.textContent='Temperature: '+jsonData.main.temp+' C';
            humidity.textContent='Humidity: '+jsonData.main.humidity+"%";
            precipitation.textContent=jsonData.weather[0].description.toUpperCase();
            place.textContent = 'Location: '+ jsonData.name;
            bg.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+jsonData.name+"')";  
            
        });
};

// function record(){
//     document.getElementById("historyPage").classList.toggle("d-none");
//     document.getElementById("background").classList.toggle("d-none");
//     let h=localStorage.getItem('history');
//     h=JSON.parse(h);
//     console.log(h);
//     h.forEach(element => {
//         var histCard = histCardTemplate.content.cloneNode(true);
//         console.log(histCard);
//         const temperature_h = histCard.querySelector("[data-temperature]");
//         const time_h = histCard.querySelector("[data-time]");
//         const humidity_h = histCard.querySelector("[data-humidity]");
//         const description_h = histCard.querySelector("[data-description]");
//         const location_h = histCard.querySelector("[data-location]");
//         temperature_h.textContent = 'Temperature: '+ element.temperature;
//         // console.log(element.time.split("T")[0]);
//         time_h.textContent = "Day, Date & Time: "+element.time.split("T")[0].slice(1,11)+" "+element.time.split("T")[1].split(".")[0]+ " GMT ";
//         humidity_h.textContent = 'Humidity: '+element.humidity;
//         description_h.textContent = element.description.toUpperCase();
//         location_h.textContent = 'Location: '+ element.location;
//         histContainer.append(histCard);
//     });
// }


document.getElementById("back").onclick= function(){
    document.getElementById("historyPage").classList.toggle("d-none");
    document.getElementById("background").classList.toggle("d-none");
    histContainer.textContent="";
}

document.getElementById("clear").onclick= function(){
    histContainer.innerHTML="";
    localStorage.removeItem('history');
    history=[];
    localStorage.setItem('history',JSON.stringify(history));
}



//Notes:
//for getting value when enter is pressed

// searchLat.addEventListener('keypress',(event)=>{
//     if(event.key === "Enter")
//     {
//         lat = event.target.value.toLowerCase();
//         console.log(lat);
//     }
// })
// searchLon.addEventListener('keypress',(event)=>{
//     if(event.key === "Enter")
//     {
//         lon = event.target.value.toLowerCase();
//         console.log(lon);
//     }
// })

//incomplete function to output history from local saved data 


// function display_history(data){
//     let location_p=document.createElement('p');
//     let description_p=document.createElement('p');
//     let temp_p=document.createElement('p');

    
//     location_p.textContent='Temperature: '+data.location+'˚c';
//     description_p.textContent=data.description;
//     temp_p.textContent=data.temperature;
//     let d=document.createElement('div');
//     d.appendChild(location_p);
//     d.appendChild(description_p);
//     d.appendChild(temp_p);
//     historyEl.appendChild(d);

// }
