function isEmpty(obj){
    let keys;
    for(let key in obj){
        if(key){
        return false;
        }
    }
    return true;
}
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

function sumSalaries(salaries){
    let sum = 0;
    if(isEmpty(salaries)){
        return sum;
    }
    for(let key in salaries){
        sum += salaries[key];
    }
    return sum;
}
console.log(sumSalaries(salaries));