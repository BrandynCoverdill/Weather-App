import 'normalize.css';
import './styles.css';
import '@fontsource/merriweather-sans';
import Colors from './/colors';

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
const loader = document.querySelector('.loader');
const colors = Colors;

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

	// Start loader animation
	loader.classList.add('display');
	// Fetch weather data
	getWeather()
		.then((data) => {
			return data.json();
		})
		.then((data) => {
			// Remove loader animation
			loader.classList.remove('display');

			// show weather data on card
			card.style.display = 'block';
			city.textContent = `${data.location.name}, ${data.location.region}`;
			img.src = data.current.condition.icon;
			temp.textContent = `${data.current.temp_f}°F`;
			forecast.textContent = data.current.condition.text;
			feelsLike.textContent = `Feels like ${data.current.feelslike_f}°F`;
			// Clear input
			input.value = '';
			// Show background color depending on forecast
			switch (data.current.condition.text) {
				case 'Sunny':
					card.style.cssText = `
						background: radial-gradient(ellipse at top right, ${
							colors.find((x) => x.name === 'sun').color
						},${colors.find((x) => x.name === 'sky-light').color} 15%, ${
						colors.find((x) => x.name === 'sky').color
					} 70%);
					`;
					break;
				case 'Partly cloudy':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'clouds').color
						}, ${colors.find((x) => x.name === 'sky-light').color} 30%, ${
						colors.find((x) => x.name === 'sky').color
					} 80%);
					`;
					break;
				case 'Cloudy':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 60%, ${colors.find((x) => x.name === 'clouds').color});
					`;
					break;
				case 'Overcast':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'clouds').color});
					`;
					break;
				case 'Mist':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						}, ${colors.find((x) => x.name === 'mist').color} 40%);
					`;
					break;
				case 'Patchy rain possible':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'rain').color});
					`;
					break;
				case 'Patchy snow possible':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'snow').color});
					`;
					break;
				case 'Patchy sleet possible':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'snow').color});
					`;
					break;
				case 'Patchy freezing drizzle possible':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 30%, ${colors.find((x) => x.name === 'rain-cold').color});
					`;
					break;
				case 'Thundery outbreaks possible':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 20%, ${colors.find((x) => x.name === 'rain').color});
					`;
					break;
				case 'Blowing snow':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'clouds').color});
					`;
					break;
				case 'Blizzard':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'blizzard').color
						} 20%, ${colors.find((x) => x.name === 'snow').color});
					`;
					break;
				case 'Fog':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 60%, ${colors.find((x) => x.name === 'clouds').color});
					`;
					break;
				case 'Freezing fog':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 60%, ${colors.find((x) => x.name === 'clouds').color});
					`;
					break;
				case 'Patchy light drizzle':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'rain-cold').color});
					`;
					break;
				case 'Light drizzle':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'rain').color});
					`;
					break;
				case 'Freezing drizzle':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'rain-cold').color});
					`;
					break;
				case 'Heavy freezing drizzle':
					card.style.cssText = `
						background: linear-gradient(
							to bottom,
							${colors.find((x) => x.name === 'cloudy').color} 20%,
							${colors.find((x) => x.name === 'rain-cold').color} 50%,
							${colors.find((x) => x.name === 'blizzard').color}
						);
					`;
					break;
				case 'Patchy light rain':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'rain').color});
					`;
					break;
				case 'Light rain':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 30%, ${colors.find((x) => x.name === 'rain').color});
					`;
					break;
				case 'Moderate rain at times':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 30%, ${colors.find((x) => x.name === 'rain').color});
					`;
					break;
				case 'Moderate rain':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 30%, ${colors.find((x) => x.name === 'rain').color});
					`;
					break;
				case 'Heavy rain at times':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 30%, ${colors.find((x) => x.name === 'rain').color});
					`;
					break;
				case 'Heavy rain':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 30%, ${colors.find((x) => x.name === 'rain').color});
					`;
					break;
				case 'Light freezing rain':
					card.style.cssText = `
						background: linear-gradient(
							to bottom,
							${colors.find((x) => x.name === 'cloudy').color} 30%,
							${colors.find((x) => x.name === 'rain-cold').color} 60%,
							${colors.find((x) => x.name === 'blizzard').color}
						);
					`;
					break;
				case 'Moderate or heavy freezing rain':
					card.style.cssText = `
						background: linear-gradient(
							to bottom,
							${colors.find((x) => x.name === 'cloudy').color} 10%,
							${colors.find((x) => x.name === 'rain-cold').color} 30%,
							${colors.find((x) => x.name === 'blizzard').color}
						);
					`;
					break;
				case 'Light sleet':
					card.style.cssText = `
						background: linear-gradient(
								to bottom,
								${colors.find((x) => x.name === 'cloudy').color} 30%,
								${colors.find((x) => x.name === 'rain-cold').color} 60%,
								${colors.find((x) => x.name === 'blizzard').color}
							);
					`;
					break;
				case 'Moderate or heavy sleet':
					card.style.cssText = `
						background: linear-gradient(
							to bottom,
							${colors.find((x) => x.name === 'cloudy').color} 10%,
							${colors.find((x) => x.name === 'rain-cold').color} 30%,
							${colors.find((x) => x.name === 'blizzard').color}
						);
					`;
					break;
				case 'Patchy light snow':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 30%, ${colors.find((x) => x.name === 'snow').color} 80%);
					`;
					break;
				case 'Light snow':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 30%, ${colors.find((x) => x.name === 'snow').color} 80%);
					`;
					break;
				case 'Patchy moderate snow':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'snow').color} 80%);
					`;
					break;
				case 'Moderate snow':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'snow').color} 80%);
					`;
					break;
				case 'Patchy heavy snow':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'snow').color} 80%);
					`;
					break;
				case 'Heavy snow':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'snow').color} 80%);
					`;
					break;
				case 'Ice pellets':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'rain-cold').color} 80%);
					`;
					break;
				case 'Light rain shower':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 30%, ${colors.find((x) => x.name === 'rain').color} 80%);
					`;
					break;
				case 'Moderate or heavy rain shower':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'rain').color});
					`;
					break;
				case 'Torrential rain shower':
					card.style.cssText = `
						background: linear-gradient(
							to bottom,
							${colors.find((x) => x.name === 'cloudy').color} 10%,
							${colors.find((x) => x.name === 'hazard-light').color} 80%,
							${colors.find((x) => x.name === 'hazard').color}
						);
					`;
					break;
				case 'Light sleet showers':
					card.style.cssText = `
						background: linear-gradient(
							to bottom,
							${colors.find((x) => x.name === 'cloudy').color} 30%,
							${colors.find((x) => x.name === 'rain-cold').color} 60%,
							${colors.find((x) => x.name === 'blizzard').color}
						);
					`;
					break;
				case 'Moderate or heavy sleet showers':
					card.style.cssText = `
						background: linear-gradient(
							to bottom,
							${colors.find((x) => x.name === 'cloudy').color} 10%,
							${colors.find((x) => x.name === 'rain-cold').color} 60%,
							${colors.find((x) => x.name === 'blizzard').color}
						);
					`;
					break;
				case 'Light snow showers':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 30%, ${colors.find((x) => x.name === 'snow').color} 80%);
					`;
					break;
				case 'Moderate or heavy snow showers':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'snow').color} 80%);
					`;
					break;
				case 'Light showers of ice pellets':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 30%, ${colors.find((x) => x.name === 'snow').color} 80%);
					`;
					break;
				case 'Moderate or heavy showers of ice pellets':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'cloudy').color
						} 10%, ${colors.find((x) => x.name === 'rain-cold').color} 80%);
					`;
					break;
				case 'Patchy light rain with thunder':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'clouds-thunder').color
						} 30%, ${colors.find((x) => x.name === 'rain').color} 80%);
					`;
					break;
				case 'Moderate or heavy rain with thunder':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'clouds-thunder').color
						} 20%, ${colors.find((x) => x.name === 'rain').color} 90%);
					`;
					break;
				case 'Patchy light snow with thunder':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'clouds-thunder').color
						} 30%, ${colors.find((x) => x.name === 'snow').color} 80%);
					`;
					break;
				case 'Moderate or heavy snow with thunder':
					card.style.cssText = `
						background: linear-gradient(to bottom, ${
							colors.find((x) => x.name === 'clouds-thunder').color
						} 30%, ${colors.find((x) => x.name === 'snow').color} 90%);
					`;
					break;
				default:
					card.style.cssText = `
						background: radial-gradient(ellipse at top right, #ffd500,#5b7ef0 15%, #2555f5 70%);
					`;
					break;
			}
		})
		.catch((err) => {
			// Remove loader animation
			loader.classList.remove('display');

			// Show error on card and hide previous data
			card.style.display = 'block';
			city.textContent = 'Location not found';
			img.src = '';
			temp.textContent = '';
			forecast.textContent = '';
			feelsLike.textContent = '';
			card.style.cssText = `

					`;
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
