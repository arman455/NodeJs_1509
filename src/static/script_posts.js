const button = document.querySelector('.button');

button.addEventListener('click', () => {

    fetch('/post/create/', {

        method: 'POST',
        body: JSON.stringify({
            name: "zxczxczxc",
            author: "sema..",
            description: "Блюда нет вкусней борща старий бог...",
            time: "05.10.2024 20:56",
            userId: 1
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

});
