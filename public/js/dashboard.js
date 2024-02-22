const showModal = document.querySelector('.showModal');
showModal.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('clicked');
  const modal = new bootstrap.Modal(document.getElementById('createPostModal'));
  modal.show();
});

const closeModal = document.querySelector('.btn-close');
closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('close clicked');
  // const modal = bootstrap.Modal.getInstance(document.getElementById('createPostModal'));
  // modal.hide();
  window.location.reload();
});

const createPost = document.querySelector('.create-post');
createPost.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('create clicked');
  const postPrompt = axios.post('/api/dashboard', {
    title: document.querySelector('#title').value,
    content: document.querySelector('#content').value,
  });
  postPrompt
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
});

const deletePost = document.querySelector('.delete-btn');
if (deletePost !== null) {
  deletePost.addEventListener('click', () => {
    console.log('delete clicked');
    const deletePrompt = axios.delete(
      '/api/dashboard/' + deletePost.dataset.id
    );
    console.log(deletePost.dataset.id);
    deletePrompt
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

const logout = document.querySelector('.logout-btn');
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
