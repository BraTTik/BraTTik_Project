$('table').on('click', 'td', function() {
    let text = prompt('Введите имя или фамилию', $(this).text());
    if (text && text.trim() != '') {
        $(this).text(text);
    } else {
        $(this).text($(this).text());
    }
})