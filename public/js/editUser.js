let id;

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

document.querySelector('.editDetails').addEventListener('click', () => {
  document.querySelector('.update-user-btn').addEventListener('click', () => {
    const username = document.querySelector(
      '.form-control'
    ).value;
    
    axios
      .post('/api/user/' + id, { username } )
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

  document.querySelector('.delete-btn').addEventListener('click', () => {
  document.querySelector('#modalContent').value = id;
  axios
    .delete('/api/user/' + id)
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
   };
