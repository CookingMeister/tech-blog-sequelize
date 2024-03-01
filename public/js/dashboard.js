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
    const title = document.querySelector('input[id="create-title"]').value.trim();
    const content = document.querySelector(
      'textarea[id="create-content"]'
    ).value.trim();
    const alertMessage = document.getElementById('alertMessage');
    
    if (!title || !content) {
      alertMessage.classList.remove('d-none'); // Show the alert
        setTimeout(() => {
        alertMessage.classList.add('d-none');
      }, 5000);
      return;
    } else {
      alertMessage.classList.add('d-none'); // Hide the alert
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
  updatePost.addEventListener('click', (e) => {
    if (e.target.classList.contains('update-btn')) {
      e.preventDefault();
      const modal = e.target.closest('.edit-modal');
      const title = modal.querySelector('#update-title').value.trim();
      const content = modal.querySelector('#update-content').value.trim();
      const alertMessage = document.getElementById('alertMessage');

      if (!title || !content) {
        alertMessage.classList.remove('d-none'); // Show the alert
          setTimeout(() => {
          alertMessage.classList.add('d-none');
        }, 5000);
        return;
      } else {
        alertMessage.classList.add('d-none'); // Hide the alert
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
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  // Delete post by id
  const deletePostBtns = document.querySelectorAll('.delete-btn');
  deletePostBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const postId = e.target.getAttribute('data-id');
      const alertMessage = document.getElementById('alertDeleteMessage');
      alertMessage.classList.remove('d-none'); // Show the alert
      // Yes prompt to Delete
      document.querySelector('.yesClicked').addEventListener('click', () => {
        console.log('yes clicked');
        alertMessage.classList.add('d-none'); // Hide the alert
        const deletePrompt = axios.delete('/api/dashboard/' + postId);
          deletePrompt
            .then((response) => {
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
      });
      // No prompt to not Delete
      document.querySelector('.closeDelete').addEventListener('click', () => {
        console.log('no clicked');
        alertMessage.classList.add('d-none'); // Hide the alert
        window.location.reload();
      });     
    });
  });

  // Logout user
  const logout = document.querySelector('.logout-btn');
  logout.addEventListener('click', () => {
    const logoutPrompt = axios.get('/api/logout');
    logoutPrompt
      .then((response) => {
        window.location.replace('/');
      })
      .catch((error) => {
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