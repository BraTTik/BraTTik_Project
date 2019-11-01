class Validator{
    isEmail(str){
        if(str.indexOf('@') > 0 
            && (str.slice(str.lastIndexOf('.')).length > 2)
            && (str.slice(str.indexOf('@')+1, str.lastIndexOf('.')).length > 0)
        ){
            return true;
        }else{
            return false;
        }
    }
    isPhone(str){
        // +7 (915) 034-81-82
    }
}