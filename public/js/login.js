// Login button listener
const handleSubmit = (event) => {
  event.preventDefault();
  const username = document.querySelector('input[name= "username"]').value;
  const password = document.querySelector('input[name= "password"]').value;
  // Check email regex and display alert message
  const alertMessage = document.getElementById('alertMessage');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(username)) {
    alertMessage.classList.add('d-none'); // Hide the alert
  } else {
    alertMessage.classList.remove('d-none'); // Show the alert
    setTimeout(() => {
      alertMessage.classList.add('d-none');
    }, 5000);
    return;
  }
  // axios request
  const postRequest = axios.post('/api/login', { username, password });
  postRequest
    .then((response) => {
      console.log(response.data);
      window.location.replace('/api/dashboard');
    })
    .catch((error) => {
      // Handle error codes
      const alertMessage = document.getElementById('alertRegisterMessage');

      if (error.response) {
        // If incorrect username or password
        if (error.response.status === 401) {
          alertMessage.innerText = `Unauthorized: Incorrect username or password`;
          alertMessage.classList.remove('d-none'); // Show the alert
          setTimeout(() => {
            alertMessage.classList.add('d-none');
          }, 5000);
          console.error('Error:', error.message);
        } else {
          // Other errors
          alertMessage.innerHTML = `
              <p>${error.message}</p>`;
          alertMessage.classList.remove('d-none'); // Show the alert
          setTimeout(() => {
            alertMessage.classList.add('d-none');
          }, 5000);
          console.error('Error:', error.message);
        }
      }
    });
};
//  Click or Key Enter
document
  .querySelector('#loginBtn')
  .addEventListener('click', handleSubmit);  
document
  .querySelector('#loginBtn')
  .addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  });
