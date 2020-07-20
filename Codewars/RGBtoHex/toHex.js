function rgb(r, g, b){
    const rgb = [r, g, b];
    let result = [];
    for(let i = 0; i < 3; i++){
        const number = rgb[i];
        const normalized = normalize(number);
        result[i] = toHex(normalized);
    }
    return result.join('');
}
  
  function toHex(number){
    const literals = {
      10: 'A',
      11: 'B',
      12: 'C',
      13: 'D',
      14: 'E',
      15: 'F'
    }

    let result = Math.floor(number/16);
    let second = number%16;
    
    if(result >= 16){
        result = toHex(result);
    }

    if(result >= 10 && result <= 15){
        result = literals[result];
    }
    if(second >= 10 && second <= 15){
        second = literals[second]
    }

    return result + '' + second;
  }
  
  function normalize(number){
    number = Math.round(number);
    if(number > 255){
      return 255;
    }
    if(number < 0){
      return 0;
    }
    
    return number;
  }
  
