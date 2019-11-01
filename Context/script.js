var elem = document.getElementById('test');

function func(name, surname){
    alert(`${this.value}, ${name} ${surname}!`);
}

func = func.bind(elem);

func('Дмитрий', 'Иванович');