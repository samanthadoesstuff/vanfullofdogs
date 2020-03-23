// for contact form

// function logSubmit(event) {
//     log.textContent = `Form Submitted! Thank you!`;
//     event.preventDefault();
//   }
  
//   const form = document.getElementById('form');
//   const log = document.getElementById('log');
//   form.addEventListener('submit', logSubmit);
  
const submitBtn = document.getElementById("btn");
const submitMessage = document.getElementById("submitText");

function submit() {
  submitMessage.textContent = "Thanks! We'll get back to you as soon as we can.";
};

submitBtn.addEventListener("click", function(event){
  event.preventDefault();
  submit();
});