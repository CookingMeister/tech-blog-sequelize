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
  console.log('clicked');
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
  postPrompt.then(function (response) {
    window.location.reload();
  }).catch(function (error) {
    console.log(error);
  });
});

const updatePost = document.querySelector('.update-btn');
if (updatePost !== null) {
  updatePost.addEventListener('click', () => {
    console.log('update clicked');
  //   const updatePrompt = axios.put('/api/dashboard/' + updatePost.dataset.id, {
  //     title: document.querySelector('#title').value,
  //     content: document.querySelector('#content').value,
  //   });
  //   updatePrompt.then(function (response) {
  //     window.location.reload();
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  });
}

const deletePost = document.querySelector('.delete-btn');
if (deletePost !== null) {
deletePost.addEventListener('click', () => {
  console.log('delete clicked');
  const deletePrompt = axios.delete('/api/dashboard/' + deletePost.dataset.id)
  console.log(deletePost.dataset.id);
  deletePrompt.then(function (response) {
    window.location.reload();
  }).catch(function (error) {
    console.log(error);
  });
 
});
};
