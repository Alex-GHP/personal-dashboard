const weatherContainer = document.getElementById("weather")

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTc5MDc1OTN8&ixlib=rb-4.0.3)`
    })

fetch("https://api.coingecko.com/api/v3/coins/ethereum")
    .then(res => {
        if (!res.ok)
            throw Error("Not available at this time. We're sorry!")
        return res.json()
    })
    .then(data => {
        console.log(data)
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small}>
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
            <p>🎯: €${data.market_data.current_price.usd}</p>
            <p>👆: €${data.market_data.high_24h.usd}</p>
            <p>👇: €${data.market_data.low_24h.usd}</p> 
        `
    })
    .catch(err => {
        console.error(err)
    })

const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
      
    // Convert hours to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      
    // Add leading zeros to minutes if they are less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

const updateCurrentTime = () => {
    const timeElement = document.getElementById("time")
    timeElement.textContent = getCurrentTime()
} 

setInterval(updateCurrentTime, 1000)
updateCurrentTime()

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok)
                throw Error("Weather data not available")
            return res.json()
        })  
        .then(data => {
            console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            weatherContainer.innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => {
            console.error(err)
        })
});
