import 'normalize.css';
import './styles.css';
import '@fontsource/merriweather-sans';

// Global variables
const apiKey = 'ce485220cb32487a935103659230512'; // Free API key

const card = document.querySelector('.card');
const btn = document.querySelector('button');
const input = document.querySelector('input');
const inputError = document.querySelector('.inputerror');
const city = document.querySelector('#city-name');
const img = document.querySelector('img');
const temp = document.querySelector('#temp');
const forecast = document.querySelector('#forecast');
const feelsLike = document.querySelector('#feels-like');

// On first time starting page, have the card empty
card.style.display = 'none';

// Event listener for button
btn.addEventListener('click', (e) => {
	e.preventDefault();

	// Verify input
	if (!input.validity.valid) {
		inputError.textContent = 'Please enter a city.';
		inputError.classList.add('active');
		return;
	} else {
		inputError.textContent = '';
		inputError.classList.remove('active');
	}

	// Fetch weather data
	getWeather()
		.then((data) => {
			return data.json();
		})
		.then((data) => {
			// show weather data on card
			card.style.display = 'block';
			city.textContent = `${data.location.name}, ${data.location.region}`;
			img.src = data.current.condition.icon;
			temp.textContent = `${data.current.temp_f}°F`;
			forecast.textContent = data.current.condition.text;
			feelsLike.textContent = `Feels like ${data.current.feelslike_f}°F`;
			// Show background color depending on forecast
			// switch (data.current.condition.text) {
			// 	case 'Sunny':
			// 		card.style.background = '#224de6';
			// 		break;
			// 	case 'Partly cloudy':
			// 		card.style.background = '#224de6';
			// 		break;
			// 	case 'Cloudy':
			// 		card.style.background = '#758feb';
			// 		break;
			// 	case 'Overcast':
			// 		card.style.background = '#758feb';
			// 		break;
			// 	case 'Mist':
			// 		card.style.background = '#a7adc4';
			// 		break;
			// 	case 'Patchy rain possible':
			// 		card.style.background = '#093f91';
			// 		break;
			// 	case 'Patchy snow possible':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Patchy sleet possible':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Patchy freezing drizzle possible':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Thundery outbreaks possible':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Blowing snow':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Blizzard':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Fog':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Freezing fog':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Patchy light drizzle':
			// 		card.style.background = '#093f91';
			// 		break;
			// 	case 'Light drizzle':
			// 		card.style.background = '#093f91';
			// 		break;
			// 	case 'Freezing drizzle':
			// 		card.style.background = '#093f91';
			// 		break;
			// 	case 'Heavy freezing drizzle':
			// 		card.style.background = '#052a61';
			// 		break;
			// 	case 'Patchy light rain':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Light rain':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Moderate rain at times':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Moderate rain':
			// 		card.style.background = '#052a61';
			// 		break;
			// 	case 'Heavy rain at times':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Heavy rain':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Light freezing rain':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Moderate or heavy freezing rain':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Light sleet':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Moderate or heavy sleet':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Patchy light snow':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Light snow':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Patchy moderate snow':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Moderate snow':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Patchy heavy snow':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Heavy snow':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Ice pellets':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Light rain shower':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Moderate or heavy rain shower':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Torrential rain shower':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Light sleet showers':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Moderate or heavy sleet showers':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Light snow showers':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Moderate or heavy snow showers':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Light showers of ice pellets':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Moderate or heavy showers of ice pellets':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Patchy light rain with thunder':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Moderate or heavy rain with thunder':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Patchy light snow with thunder':
			// 		card.style.background = '';
			// 		break;
			// 	case 'Moderate or heavy snow with thunder':
			// 		card.style.background = '';
			// 		break;
			// 	default:
			// 		break;
			// }
		})
		.catch((err) => {
			// Show error on card and hide previous data
			card.style.display = 'block';
			city.textContent = 'Location not found';
			img.src = '';
			temp.textContent = '';
			forecast.textContent = '';
			feelsLike.textContent = '';
			card.style.background = '';
		});
});

/**
 * Gets weather information about location
 * @returns Promise
 */
function getWeather() {
	// Convert input where the api understands it
	const fixedInput = input.value.replace(' ', '-');

	return new Promise((resolve, reject) => {
		fetch(
			`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${fixedInput}`
		)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
}
