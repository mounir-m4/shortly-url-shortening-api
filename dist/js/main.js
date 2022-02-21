// hanmburger menu logic
const menu = document.querySelector('.hamburger');
const btn = document.querySelector('.hamburger-btn');
// menu list
const list = document.querySelector('.nav-links');
let menuOpen = false;
menu.addEventListener('click', () => {
	if (!menuOpen) {
		btn.classList.add('open');
		list.classList.remove('nav-links');
		list.classList.add('menu-mobile');
		menuOpen = true;
	} else {
		btn.classList.remove('open');
		list.classList.add('nav-links');
		list.classList.remove('menu-mobile');
		menuOpen = false;
	}
});

//shorten logic
const shorteningIt = () => {
	//regex to validate instered link
	const linkRegex =
		/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
	// get the link input
	const intputvalue = document.querySelector('.shorten-input');
	//validating it through regular expression
	if (linkRegex.test(intputvalue.value) === false || intputvalue.value === '') {
		// add border error and display error message
		intputvalue.parentElement.classList.add('error');
	} else {
		// get the correct input value
		const link = intputvalue.value;
		// fetch API
		const urlAPI = `https://api.shrtco.de/v2/shorten?url=${link}`;
		fetch(urlAPI)
			.then((res) => res.json())
			.then((data) => {
				// remove error classes
				intputvalue.parentElement.classList.remove('error');
				// create a new div
				const shortenBox = document.createElement('div');
				// store classes needed in array
				const shortenClasses = [
					'shortlink-box',
					'd-flex',
					'align-center',
					'container',
					'p-1',
					'mb-1',
				];
				const copyLinkClasses = ['btn-primary', 'copy-link'];
				//add them using rest operator
				// https://www.programiz.com/javascript/spread-operator
				shortenBox.classList.add(...shortenClasses);
				//create element to output unshorted link
				const oldLink = document.createElement('p');
				// add class (for style)
				oldLink.classList.add('old-link');
				// grap the value from the input
				oldLink.innerText = intputvalue.value;
				// create element to ouptut the shorted link
				const newLink = document.createElement('p');
				// add class (for style)
				newLink.classList.add('new-link');
				newLink.innerText = data.result.full_short_link;
				// create button element
				const copyLink = document.createElement('button');
				// add text node to it
				copyLink.innerText = 'copy';
				// add classes (for style)
				copyLink.classList.add(...copyLinkClasses);
				//append elements to shorten box
				shortenBox.append(oldLink, newLink, copyLink);
				// get the output container
				let outputContainer = document.querySelector('.output-container');
				// output the created element to DOM
				outputContainer.append(shortenBox);
				// clear th output
				intputvalue.value = '';
				const copyBtn = document.querySelectorAll('.copy-link');
				//listen to copy click event
				copyBtn.forEach((btn) => {
					btn.addEventListener('click', () => {
						//copy to clipboard
						navigator.clipboard.writeText(newLink);
						//test the copied output
						//alert('Copied the text: ' + newLink.innerText);
						btn.innerText = 'copied !';
						btn.style.background = '#3b3054';
					});
				});
			})
			.catch((err) => console.log(err));
	}
};

const shortenBtn = document.querySelector('#shorten-btn');
shortenBtn.addEventListener('click', shorteningIt);

// https://regexr.com/39nr7
// https://htmlcolors.com/hsl-to-hex
// https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
