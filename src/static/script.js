const buttonDel = document.querySelector('.buttonDel');
const id = document.querySelector('#id');

buttonDel.addEventListener('click', () => {
    let postId = buttonDel.getAttribute('data-post-id')

    fetch(`/post/delete/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/post/all';
        }}) 

});