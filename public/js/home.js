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
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
  button.style.display = button.style.display === 'none' ? 'block' : 'none'; 
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