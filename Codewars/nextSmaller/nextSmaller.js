function nextSmaller(n) {
    for(let i = n-1, j= 0; i >= 0; i--, j++){
        if(j > 100000){
            break;
        }
        if(isNumbersEquals(n, i) && checkStartsZero(n, i)){
            return i;
        }
    }
    return -1;
}

function checkStartsZero(n1, n2){
    let num1 = n1.toString();
    let num2 = n2.toString();

    num1 = num1.split('');
    num2 = num2.split('');

    return num1.length === num2.length;
}

function isNumbersEquals(n1, n2){
    let num1 = n1.toString();
    let num2 = n2.toString();

    num1 = num1.split('');
    num2 = num2.split('');
    let result = true;

    num1.forEach( num => {
        let index;
        let founded = num2.find( (val, i) => {
            if(num === val){
                index = i;
                return val;
            }
        })
        if(founded){
            num2.splice(index, 1);
        }else{
            result = false;
            return
        }
    })

    return result
}

console.log(nextSmaller(123456789))