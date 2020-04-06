// for contact form ===============================================================

// to display ty greeting after clicking submit button

const submitBtn = document.getElementById("btn");
const submitMessage = document.getElementById("submitText");

function submit() {
  submitMessage.textContent = "Thanks! We'll get back to you soon.";
};

submitBtn.addEventListener("click", function(event){
  event.preventDefault();
  submit();
});

// |--------------------------- form validation ---------------------------------|

// adds nonvalidate attribute upon loading

const forms = document.querySelectorAll(".validate");

for (i = 0; i < forms.length; i++) {
  forms[i].setAttribute('novalidate', true);
}


// validate the field

const hasError = function (field) {
  // don't validate submits, buttons, file and reset inputs, and disabled fields
  if(field.disabled || field.type === "file" || field.type === "reset" || field.type === "submit" || field.type === "button") return

  // get validity 
  const  validity = field.validity;

  // if valid, return null
  if(validity.valid) return;

  // if field is required and empty
  if(validity.valueMissing) return 'Please fill out this field.';

  // if not the right type
  if(validity.typeMismatch) {
    // email
    if(field.type === 'email') return 'Please enter an email address.';

    // URL
    if(field.type === 'url') return 'Please enter a URL.';
  };

  // if too short
  if (validity.tooShort) return 'Please lengthen this text to ' + field.getAttribute('minLength') + ' characters or more. You are currently using ' + field.value.length + ' characters.';

  // if too long
  if (validity.tooLong) return 'Please short this text to no more than ' + field.getAttribute('maxLength') + ' characters. You are currently using ' + field.value.length + ' characters.';

  // If number input isn't a number
  if (validity.badInput) return 'Please enter a number.';

  // If a number value doesn't match the step interval
  if (validity.stepMismatch) return 'Please select a valid value.';

  // If a number field is over the max
  if (validity.rangeOverflow) return 'Please select a value that is no more than ' + field.getAttribute('max') + '.';

  // If a number field is below the min
  if (validity.rangeUnderflow) return 'Please select a value that is no less than ' + field.getAttribute('min') + '.';

  // If pattern doesn't match
  if (validity.patternMismatch) {

    // if pattern info is included, return custom error
    if (field.hasAttribute('title')) return field.getAttribute('title');

    // otherwise generic error
    return 'Please match the requested format.';
  };

  // If all else fails, return a generic catchall error
  return 'The value you entered for this field is invalid.';
};


// listen to all blur events

document.addEventListener(blur, function (event) {
  // only run if the field is in a form to be validated
  if(!event.target.form.classList.contains("validate")) return;

  // validate the field
  const error = event.target.validity;
  console.log(error);
}, true);


// shows error message

const showError = function (field, error) {
      // Add error class to field
    field.classList.add('error');

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;

    // Check if error message field already exists
    // If not, create one
    var message = field.form.querySelector('.error-message#error-for-' + id );
    if (!message) {
        message = document.createElement('div');
        message.className = 'error-message';
        message.id = 'error-for-' + id;
        field.parentNode.insertBefore( message, field.nextSibling );
    }

    // Add ARIA role to the field
    field.setAttribute('aria-describedby', 'error-for-' + id);

    // Update error message
    message.innerHTML = error;

    // Show error message
    message.style.display = 'block';
    message.style.visibility = 'visible';

};

// listen to all blur events

document.addEventListener('blur', function (event){

  // only run if the field is in a form to be validated
  if (!event.target.form.classList.contains('validate')) return;

  // validate the field
  const error2 = hasError(event.target);

  // if there's an error, show it
  if(error2) {}
    showError(event.target, error2); 
}, true);


// Remove the error message
  var removeError = function (field) {
    // Remove error class to field
    field.classList.remove('error');

    // Remove ARIA role from the field
    field.removeAttribute('aria-describedby');

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;

    // Check if an error message is in the DOM
    var message = field.form.querySelector('.error-message#error-for-' + id + '');
    if (!message) return;

    // If so, hide it
    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';

};

// Listen to all blur events
  document.addEventListener('blur', function (event) {

      // Only run if the field is in a form to be validated
      if (!event.target.form.classList.contains('validate')) return;

      // Validate the field
      var error = event.target.validity;

      // If there's an error, show it
      if (error) {
          showError(event.target, error);
          return;
      }

      // Otherwise, remove any existing error message
      removeError(event.target);

}, true);


// Check all fields on submit
document.addEventListener('submit', function (event) {

    // Only run on forms flagged for validation
    if (!event.target.classList.contains('validate')) return;

    // Get all of the form elements
    var fields = event.target.elements;

    // Validate each field
    // Store the first field with an error to a variable so we can bring it into focus later
    var error, hasErrors;
    for (var i = 0; i < fields.length; i++) {
        error = hasError(fields[i]);
        if (error) {
            showError(fields[i], error);
            if (!hasErrors) {
                hasErrors = fields[i];
            }
        }
    }

    // If there are errrors, don't submit form and focus on first element with error
    if (hasErrors) {
        event.preventDefault();
        hasErrors.focus();
    }

    // Otherwise, let the form submit normally
    // You could also bolt in an Ajax form submit process here

}, false);
