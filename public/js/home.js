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

// Toggle Post Content
function togglePostContent(li) {
  const content = li.querySelector('.post-content');
  const button = li.querySelector('.comment-btn');
  const comments = li.querySelectorAll('.comment-div p');
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
  button.style.display = button.style.display === 'none' ? 'block' : 'none';
  comments.forEach((c)=>{
    c.style.display = c.style.display === 'block' ? 'none' : 'block';
  })
}

// Comment button listener
const commentBtns = document.querySelectorAll('.comment-btn');
commentBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    const userId = btn.getAttribute('data-user-id');
    if (!userId) {
      // User is not logged in, redirect to login page
      return window.location.replace('/api/login');
    }
  });
});

// Comment Modal listener
const modalBtns = document.querySelectorAll('.comment-modal-btn');
modalBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    const postId = btn.getAttribute('data-id');
    const userId = btn.getAttribute('data-user-id');
    const modal = btn.closest('.modal');
    const comment = modal.querySelector('.comment-input').value.trim();
    const commentPrompt = axios.post('/api/comment', {
      userId: userId,
      postId: postId,
      comment: comment
    });
    commentPrompt
      .then(function (response) {
        console.log(response);
        window.location.replace('/');
      })
      .catch(function (error) {
        console.log(error);
      })
  });
});