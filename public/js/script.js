console.log('hello');

const getPosts = () =>
  axios.get('/api/posts');

const savePost = (post) =>
  axios.post('/api/posts', post);

const updatePost = (id, post) =>
  axios.put(`/api/posts/${id}`, post);

const deletePost = (id) =>
  axios.delete(`/api/posts/${id}`);

const login = (user) =>
  axios.post('/api/login', user);

document.querySelector('.login-btn').addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.querySelector('input[name= "username"]').value;
    const password = document.querySelector('input[name= "password"]').value;
    const user = { username, password };
    console.log(user);
    // login(user);
});

document.querySelector('.register-btn').addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.querySelector('input[name= "username"]').value;
    const password = document.querySelector('input[name= "password"]').value;
    const user = { username, password };
    console.log(user);
});

document.querySelector('.create-post').addEventListener('click', async () => {
    const title = document.querySelector('input[name= "title"]').value;
    const content = document.querySelector('input[name= "content"]').value;
    const post = { title, content };
    console.log(post);
    // const res = await savePost(post);
    // console.log(res);
    // window.location.href = '/dashboard';
});