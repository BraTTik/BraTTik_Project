class Worker{
    constructor(name, surname, days, rate){
        this._name = name;
        this._surname = surname;
        this._days = days;
        this._rate = rate;
    }
    getName(){
        return this._name;
    }
    getSurname(){
        return this._surname;
    }
    getDays(){
        return this._days;
    }
    setDays(days){
        this._days = days;
    }
    getRate(){
        return this._rate;
    }
    setRate(rate){
        this._rate = rate;
    }
    getSalary(){
        return this._days*this._rate;
    }
}

let worker1 = new Worker('Пётр', 'Дауги', 20, 15);
let worker2 = new Worker('Димка', 'Иваныч', 15, 25);

console.log(worker1.getName());
console.log(worker1.getSurname());

worker1.setDays(21);
worker1.setRate(17);
console.log(worker1.getSalary());
