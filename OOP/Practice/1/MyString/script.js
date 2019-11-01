class MyString{
    reverse(str){
        return str.split('').reverse().join('');
    }

    ucFirst(str){
        return str[0].toUpperCase() + str.substr(1);
    }

    ucWords(str){
        return str.split(' ').map(word => this.ucFirst(word)).join(' ');
    }
}

let string = new MyString();

console.log(string.reverse('abced'));
console.log(string.ucFirst('abced'));
console.log(string.ucWords('abced abced abced'));
