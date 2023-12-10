// Global variables
const body = document.querySelector('body');
const form = document.querySelector('form');
const input = document.querySelector('input');
const btn = document.querySelector('form button');

/**
 * On first time of being on this app, load dialog that explains how to use this app.
 */
export default function showDialog() {
	// Freeze form before closing the dialog
	form.style.userSelect = 'none';
	input.setAttribute('disabled', 'true');
	btn.setAttribute('disabled', 'true');
	btn.style.cursor = 'inherit';

	// Create elements
	const container = document.createElement('div');
	const title = document.createElement('h2');
	const desc = document.createElement('p');
	const credits = document.createElement('div');
	const credit = document.createElement('p');
	const creditLink = document.createElement('a');
	const hideDialogBtn = document.createElement('button');

	// Add text to elements
	title.textContent = 'Welcome to my weather app!';
	desc.textContent = `To get started, enter a city or zipcode in the input on the top of the page,
     and then select the "Get forecast" button to display the weather for that area.`;
	credit.textContent = 'Created by ';
	creditLink.textContent = 'Brandyn Coverdill';
	hideDialogBtn.textContent = 'Close window';

	// Add attributes to the elements
	creditLink.setAttribute('href', 'https://github.com/BrandynCoverdill');
	creditLink.setAttribute('target', '_blank');

	// Style the elements
	container.style.cssText = `
        display: flex;
        flex-direction: column;
        max-width: 600px;
        margin: 1em auto;
        border: 10px double #26a104;
        padding: 1em;
        border-radius: 10px;
    `;

	title.style.cssText = `
        margin: 0 auto;
    `;

	desc.style.cssText = `
        margin: 0.5em auto;
        text-align: center;
    `;

	credits.style.cssText = `
        margin-block-start: 1em;
        text-align: center;
        margin-block-end: 0.5em;
    `;

	credit.style.cssText = `
        width: fit-content;
        display: inline;
    `;

	creditLink.style.cssText = `
        color: #48b3fa;
    `;

	hideDialogBtn.style.cssText = `
        width: fit-content;
        align-self: end;
        cursor: pointer;
    `;

	// Event listener to hide modal
	hideDialogBtn.addEventListener('click', (e) => {
		e.preventDefault();
		body.removeChild(container);
		// Unfreeze form
		form.style.userSelect = 'none';
		input.removeAttribute('disabled');
		btn.removeAttribute('disabled');
		btn.style.cursor = 'pointer';
	});

	// Append elements
	container.appendChild(title);
	container.appendChild(desc);
	container.appendChild(credits);
	credits.appendChild(credit);
	credits.appendChild(creditLink);
	container.appendChild(hideDialogBtn);
	body.appendChild(container);
}
