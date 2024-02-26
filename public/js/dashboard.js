// Show modal on click
const showModal = document.querySelector('.showModal');
showModal.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('clicked');
  const modal = new bootstrap.Modal(document.getElementById('createPostModal'));
  modal.show();
});

// Reload on close modal
const closeModal = document.querySelector('.btn-close');
closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('close clicked');
  window.location.reload();
});

// Create a new post
const createPost = document.querySelector('.create-post');
createPost.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('create clicked');
  const title = document.querySelector('input[id="create-title"]').value;
  const content = document.querySelector('textarea[id="create-content"]').value;
  console.log(title, content);
  if (!title || !content) {
    console.log('Title and content cannot be empty');
    return;
  }
  const userId = document.querySelector('#userId').value;
  const postPrompt = axios.post('/api/dashboard', {
    title,
    content,
    userId,
  });
  postPrompt
    .then(function (response) {
      return window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
});
// Update user post by id
const updatePost = document.querySelector('.background-dash');
updatePost.addEventListener('click', (event) => {
  if (event.target.classList.contains('update-btn')) {
    event.preventDefault();
    console.log('update clicked');
    const modal = event.target.closest('.edit-modal');
    const title = modal.querySelector('#update-title').value;
    const content = modal.querySelector('#update-content').value;
    console.log(title, content);

    if (!title || !content) {
      console.log('Title and content cannot be empty');
      return;
    }
    let postId = modal.querySelector('.post-id').value;
    console.log(postId);
    console.log('update clicked on post:', postId);
    const updatePrompt = axios.put('/api/dashboard/', { id: postId, title, content, });
    updatePrompt
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

// Delete post by id
const deletePost = document.querySelector('.modal');
deletePost.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const postId = event.target.getAttribute('data-id');
    console.log('delete clicked on post:', postId);
    const deletePrompt = axios.delete('/api/dashboard/' + postId);
    deletePrompt
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

// Logout user
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
