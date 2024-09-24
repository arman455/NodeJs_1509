window.addEventListener('beforeunload', function (event) {

    const confirmationMessage = 'Вы уверены, что хотите покинуть страницу?';

    event.returnValue = confirmationMessage;
    return confirmationMessage;
});