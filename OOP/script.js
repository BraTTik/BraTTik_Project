class User{
    constructor(name, surname){
        this._name = name;
        this._surname = surname;
    }

    getName(){
        return this._name;
    }
    getSurname(){
        return this._surname;
    }
    getFullname(){
        return this._name + ' ' + this._surname;
    }
    setAge(age){
        if(this._checkAge(age)){
            this._age = age;
        }
    }
    getAge(){
        return this._age;
    }
    _checkAge(age){
        if(age > 0 && age < 100){
            return true;
        }else{
            return false;
        }
    }
}

let user = new User('Димка', 'Иваныч');

user.setAge(33);
alert(user.getAge());