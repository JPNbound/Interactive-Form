//Create a variable to reference the “Name” element
const nameElement = document.getElementById('name');

//Use the variable and the .focus() method to add the focus state to the element.
nameElement.focus();
console.log(nameElement);

/* Create variables to reference the "Job Role" <select> element and the "Other job role" <input type="text"> element.
 Log the variables out to the console to ensure the correct elements are being referenced. */

const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById("other-job-role");
//Use the "Other job role" variable to hide this element by default.
otherJobRole.style.display = 'none';

console.log(jobRole);
console.log(otherJobRole);

//Use the variable for the "Job Role" menu to listen for the change event on this element. 
jobRole.addEventListener('change', (e) => {
  if(jobRole.value === "other"){
    otherJobRole.style.display='';
  } else {
    otherJobRole.style.display = 'none';
  }
});

// Create variables to reference the "design", "color", and color "option" elements
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const colorOptions = colorSelect.children;

// Log the variables to check
console.log(designSelect);   
console.log(colorSelect);    
console.log(colorOptions);    

// Use the color variable and dot notation to set the disabled property of the element to true.
colorSelect.disabled = true;

// Use the variable for the "Design" or "Theme" menu to listen for the change event on this element.
designSelect.addEventListener('change', (event) => {
  colorSelect.disabled = false;
  for (let option of color.children) {
    const selectedDesign = event.target.value;
    const optionTheme = option.getAttribute('data-theme');
    console.log('Selected Design:', selectedDesign);
    console.log('Option Theme:', optionTheme);

    if (selectedDesign === optionTheme) {
      option.hidden = false;
      option.selected = true;
    } else {
      option.hidden = true;
      option.selected = false;
    }
  }
});

// Create variables to reference the "Register for Activities" <fieldset> element and the "Total: $" <p> element. 
const registerForActivities = document.getElementById('activities');
const activityCost = document.getElementById('activities-cost');

// Create another variable to store the total cost of the activities and give it an initial value of 0.
let totalCost = 0;
registerForActivities.addEventListener('change', (event) => {
  if (event.target.type === 'checkbox') {
    const dataCost = event.target.getAttribute('data-cost');
    const cost = +dataCost;

    console.log(cost);
    console.log(typeof cost);

    if (event.target.checked) {
      totalCost += cost;
    } else {
      totalCost -= cost;
    }
    activityCost.innerHTML = `Total: $${totalCost}`;
  }
});

// Handle focus and blur events for activity checkboxes
const activityCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]');
activityCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('focus', (event) => {
    event.target.parentElement.classList.add('focused');
    console.log('Focused on:', event.target.name);
  });

  checkbox.addEventListener('blur', (event) => {
    event.target.parentElement.classList.remove('focused');
    console.log('Blurred from:', event.target.name);
  });
});

// Create variables to reference the payment option elements.
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
 
// Hide Paypal and Bitcoin initially
paypal.style.display = 'none';
bitcoin.style.display = 'none';

// Set default payment method to 'credit card'
const secondChild = payment.children[1];
secondChild.setAttribute('selected', 'true');

// Show the correct payment div based on selection
payment.addEventListener('change', (event) => {
  const selectedPayment = event.target.value;

  if (selectedPayment === 'paypal') {
    paypal.style.display = 'block';
    bitcoin.style.display = 'none';
  } else if (selectedPayment === 'bitcoin') {
    bitcoin.style.display = 'block';
    paypal.style.display = 'none';
  } else {
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
  }
});

// Create variables for the 'email', 'card #', zipcode, cvv, and form elements
const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipcode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');

// Helper function to validate fields
function validateField(fieldElement, validationTest) {
  const fieldParent = fieldElement.parentElement;
  const errorMessage = fieldParent.lastElementChild; // The last child is assumed to be the error message.

  if (!validationTest(fieldElement.value)) {
    // If the field is invalid
    fieldParent.classList.add('not-valid');
    fieldParent.classList.remove('valid');
    errorMessage.style.display = 'block'; // Show the error message
  } else {
    // If the field is valid
    fieldParent.classList.add('valid');
    fieldParent.classList.remove('not-valid');
    errorMessage.style.display = 'none'; // Hide the error message
  }
}

// Form submission event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validate Name
  validateField(nameElement, (value) => /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(value));

  // Validate Email
  validateField(email, (value) => /^[^@]+@[^@.]+\.[a-z]+$/i.test(value));

  // Validate Zipcode
  validateField(zipcode, (value) => /^\d{5}$/.test(value));

  // Validate CVV
  validateField(cvv, (value) => /^\d{3}$/.test(value));

  // Ensure at least one activity is selected
  const activityIsChosen = totalCost >= 100;
  if (!activityIsChosen) {
    alert("You must choose at least 1 activity");
  } else {
    console.log('You have met minimum activity requirements');
  }

  // Credit Card specific validation
  if (payment.value === 'credit-card') {
    // Validate card number
    validateField(cardNumber, (value) => /^\d{13,16}$/.test(value));

    // Validate CVV
    validateField(cvv, (value) => /^\d{3}$/.test(value));

    // Validate Zipcode
    validateField(zipcode, (value) => /^\d{5}$/.test(value));
  }
});
