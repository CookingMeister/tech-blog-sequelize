let id;

//  Populate Modal on click
document.querySelectorAll('.editDetails').forEach((item) => {
  item.addEventListener('click', (event) => {
    id = event.target.getAttribute('data-id');
    let username = event.target.getAttribute('data-username');
    let editModal = new bootstrap.Modal(document.getElementById('editModal'));
    // Set the modal's content to the user's ID and name
    document.querySelector('#modalContent').innerHTML = `<form>
      <p class="user-id">ID: ${id} </p>
      <label class="form-label">Username:</label>
      <input class="form-control pl-2" value="${username}">
      </form>`;
    editModal.show(); // Show the Bootstrap modal
  });
});

//  Update username
document.querySelector('.editDetails').addEventListener('click', () => {
  document.querySelector('.update-user-btn').addEventListener('click', () => {
    const username = document.querySelector('.form-control').value;

    axios
      .post('/api/user/' + id, { username })
      .then((response) => {
        // Close the modal
        let editModal = bootstrap.Modal.getInstance(
          document.getElementById('editModal')
        );
        editModal.hide();
        window.location.reload();
      })
      .catch((error) => {
        // Error handling
        console.log(error);
      });
  });
});

//  Delete user profile
document.querySelector('.delete-btn').addEventListener('click', () => {
  document.querySelector('#modalContent').value = id;

  const alertMessage = document.getElementById('alertMessage');
  alertMessage.classList.remove('d-none'); // Show the alert
  // Yes prompt to Delete
  document.querySelector('.yesClicked').addEventListener('click', () => {
    console.log('yes clicked');
    alertMessage.classList.add('d-none'); // Hide the alert
    const deletePrompt = axios.delete('/api/user/' + id);
    deletePrompt
      .then((response) => {
        // Close the modal
        let editModal = bootstrap.Modal.getInstance(
          document.getElementById('editModal')
        );
        editModal.hide();
        window.location.replace('/');
      })
      .catch((error) => {
        // Error handling
        console.log(error.response);
      });
  });
  // No prompt to not Delete
  document.querySelector('.closeDelete').addEventListener('click', () => {
    console.log('no clicked');
    alertMessage.classList.add('d-none'); // Hide the alert
    let editModal = bootstrap.Modal.getInstance(
      document.getElementById('editModal')
    );
    editModal.hide();
  });
});

// Logout button listener
const logout = document.querySelector('.logout-btn');
if (logout) {
  logout.addEventListener('click', () => {
    console.log('logout clicked');
    const logoutPrompt = axios.get('/api/logout');
    logoutPrompt
      .then(function (response) {
        window.location.replace('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
