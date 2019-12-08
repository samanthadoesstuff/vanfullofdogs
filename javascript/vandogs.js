// for contact form

function logSubmit(event) {
    log.textContent = `Form Submitted! Thank you!`;
    event.preventDefault();
  }
  
  const form = document.getElementById('form');
  const log = document.getElementById('log');
  form.addEventListener('submit', logSubmit);
  