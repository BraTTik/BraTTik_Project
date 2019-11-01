
(function(){
    let timeElem = document.getElementById('time');
    
    let date = new Date();
    
    timeElem.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

})();