  
//   const inputElement = document.getElementById('create-title');
//   inputElement.addEventListener('input', (event) => {
//     const newValue = event.target.value;
//     console.log(`Input value changed: ${newValue}`);
// });  
  
  const showModal = document.querySelector('.showModal');
  showModal.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked');
    const modal = new bootstrap.Modal(
      document.getElementById('createPostModal')
    );
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
    const title = document.querySelector('input[id="create-title"]').value;
    const content = document.querySelector('textarea[id="create-content"]').value;
    console.log(title, content);
    if (!title || !content) {
      console.log('Title and content cannot be empty');
      return
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

  const deletePost = document.querySelector('.container');
  deletePost.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const postId = event.target.getAttribute('data-id');
      console.log('delete clicked on post:', postId);
      const deletePrompt = axios.delete(
        '/api/dashboard/' + postId,
      );
      deletePrompt
        .then(function (response) {
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });


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
