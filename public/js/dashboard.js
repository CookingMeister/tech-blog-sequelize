document.addEventListener('DOMContentLoaded', () => {
  // Show modal on click
  const showModal = document.querySelector('.showModal');
  showModal.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = new bootstrap.Modal(
      document.getElementById('createPostModal')
    );
    modal.show();
  });

  // Reload on close modal
  const closeModal = document.querySelectorAll('.btn-close');
  closeModal.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.reload();
    });
  });

  // Create a new post
  const createPost = document.querySelector('.create-post');
  createPost.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('input[id="create-title"]').value;
    const content = document.querySelector(
      'textarea[id="create-content"]'
    ).value;
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
      const updatePrompt = axios.put('/api/dashboard/', {
        id: postId,
        title,
        content,
      });
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
  const deletePostBtns = document.querySelectorAll('.delete-btn');

  deletePostBtns.forEach(function (btn) {
    btn.addEventListener('click', (event) => {
      const postId = event.target.getAttribute('data-id');
      alert('Are you sure you want to delete this post?');
      console.log('delete clicked on post:', postId);
      const deletePrompt = axios.delete('/api/dashboard/' + postId);
      deletePrompt
        .then(function (response) {
          window.location.reload();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  });





  // Logout user
  const logout = document.querySelector('.logout-btn');
  logout.addEventListener('click', () => {
    const logoutPrompt = axios.get('/api/logout');
    logoutPrompt
      .then(function (response) {
        window.location.replace('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});

  // Toggle Post Content
function togglePostContent(li) {
  const content = li.querySelector('.post-content');
  const button = li.querySelector('.edit-btn');
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
  button.style.display = button.style.display === 'none' ? 'block' : 'none';
}