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
    const postId = btn.getAttribute('data-id');
    console.log('comment clicked on post:', postId);

  });
});

// Comment Modal listener
const modalBtns = document.querySelectorAll('.comment-modal-btn');
modalBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    const postId = btn.getAttribute('data-id');
    const userId = btn.getAttribute('data-user-id');
    console.log('comment clicked on post:', postId, "from user:", userId);
    const modal = btn.closest('.modal');
    const comment = modal.querySelector('.comment-input').value;
    console.log(comment);
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
