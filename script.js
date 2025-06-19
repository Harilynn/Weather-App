const url =
	'https://api.openweathermap.org/data/2.5/weather';
const apiKey =
	'f4c80a25d7378077dbcc56ad375e239f';

// $(document).ready(function () {
// 	weatherFn('Pune');
// });

async function weatherFn(cName) {
	const temp =
		`${url}?q=${cName}&appid=${apiKey}&units=metric`;
	try {
		const res = await fetch(temp);
		const data = await res.json();
		if (res.ok) {
			weatherShowFn(data);
		} else {
			alert('City not found. Please try again.');
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

function weatherShowFn(data) {
    // Set weather text values
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);

    //  Set weather icon dynamically using OpenWeather
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    $('#weather-icon').attr('src', iconUrl);

    //  Add fun tip based on weather
    const weatherDesc = data.weather[0].main.toLowerCase();
    const temp = data.main.temp;
    let tips = [];

if (temp < 10) {
    tips.push("🧣 It's cold outside! Time to bundle up.");
}
if (temp > 30) {
    tips.push("🥵 It's really hot! Stay hydrated.");
}
if (data.wind.speed > 8) {
    tips.push("💨 It's windy — hold onto your hat!");
}
if (weatherDesc.includes("rain")) {
    tips.push("🌧️ Don't forget your umbrella.");
}
if (weatherDesc.includes("clear")) {
    tips.push("☀️ Wear your shades and enjoy the sun!");
}
if (weatherDesc.includes("cloud")) {
    tips.push("⛅ A bit cloudy — good time for a walk.");
}
if (weatherDesc.includes("snow")) {
    tips.push("❄️ Bundle up, it's snowing!");
}
if (weatherDesc.includes("thunder")) {
    tips.push("⛈️ Thunderstorm alert! Stay indoors.");
}

if (tips.length === 0) {
    tips.push("🌤️ Weather looks good today!");
}

// Join all tips with spaces or line breaks
const tipMessage = tips.join("\n");

$('#weather-tip')
    .text(tipMessage)
    .removeClass() // clear old animations
    .addClass('animate__animated animate__bounceIn'); // add fade animation
}


