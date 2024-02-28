// Register form event listener
document.querySelector('.register-btn').addEventListener('click', (event) => {
    event.preventDefault();
    const usernameInput = document.querySelector('input[name= "username"]').value;
    const alertMessage = document.getElementById('alertMessage');
    const username = usernameInput.trim();
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

    const password = document.querySelector('input[name= "password"]').value;
    const user = { username, password };
    // Make a POST request and save it as a variable
    const postRequest = axios.post('/api/register', user);
    // Handle the promise returned by the POST request
    postRequest
      .then(function (response) {
        console.log('Response:', response.data);
        window.location.replace('/api/dashboard');
      })
      .catch(function (error) {
        console.error('Error:', error.message);
      });
  });