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
