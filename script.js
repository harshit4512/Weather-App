document.addEventListener('DOMContentLoaded',()=>{
    const cityinput = document.getElementById("city-input");
    const getweatherbtn = document.getElementById("get-weather-btn");
    const weatherinfo = document.getElementById("weather-info");
    const citynamedisplay =document.getElementById("city-name");
    const temperaturedisplay =document.getElementById("temperature");
    const descriptiondisplay =document.getElementById("description");
    const errormessage = document.getElementById("error-message");
    const date= document.getElementById('datenow')
    const api_key ="802d5f701303516798c59a238399b901"; // environment variables

    getweatherbtn.addEventListener('click',async () =>{
        const city = cityinput.value.trim();
        if(!city) {
            return;  
        } 
        
        // it may throw an error
        // server/database is always in another continent

        try {
          const weatherdata = await fetchweatherdata(city)
          cityinput.value="";
          displayweatherdata(weatherdata)
        } catch (error) {
            cityinput.value="";
            showerror()
        }


    })

    async function fetchweatherdata(city){
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

        const response = await fetch(url);
        // const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=wrongcity&appid=INVALID_KEY");
        console.log(response.status);
        console.log(response.ok);
        
        
        console.log(typeof response);
        console.log("RESPONSE",response);
        
        if(!response.ok){
            throw new Error('city not found');
        }

        const data = await response.json()
        return data;
    }

    function displayweatherdata(weatherdata){
        // display
        console.log(weatherdata);
        const {name,main,weather,dt,timezone} =weatherdata;
        const localedate = new Date()

        citynamedisplay.textContent = name
        temperaturedisplay.textContent = `Temperature: ${main.temp}`
        descriptiondisplay.textContent = `Weather:${weather[0].description}`
        date.textContent = `Date:${localedate.toLocaleDateString()} , Time:${localedate.toLocaleTimeString()}`
        //unlock the display
         
         weatherinfo.classList.remove('hidden')
         errormessage.classList.add('hidden')
    }

    function showerror(){
       weatherinfo.classList.add('hidden')
       errormessage.classList.remove('hidden')
    }

})