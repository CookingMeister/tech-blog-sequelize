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
  const modal = bootstrap.Modal.getInstance(document.getElementById('createPostModal'));
  modal.hide();
  window.location.reload();
});
