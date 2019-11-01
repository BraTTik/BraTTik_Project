let btn = document.getElementById('ajaxBtn');
let resultElem = document.getElementById('result');


btn.addEventListener('click', function(){
    fetch(`pages/time.html`)
    .then(
        response => {return response.text()},
        error => console.log(error)
    )
    .then(
        text => {
            console.log(text)
            resultElem.innerHTML = text;
        },
        error => console.log(error)
    )
})
