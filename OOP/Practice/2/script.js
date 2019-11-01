'use strict';

class DOM{
    constructor(selector){
        this.elem = document.querySelectorAll(selector);
    }

    html(text){
        this.each(function(elem){
            elem.innerHTML = text;
        })
        return this;
    }

    append(text){
        this.each(elem => elem.innerHTML += text)
        return this;

    }

    prepend(text){
        this.each(elem => elem.innerHTML = text + elem.innerHTML);
        return this;

    }

    attr(name, value){
        this.each(elem => elem.setAttribute(name, value));
        return this;

    }

    each(callee){
        [...this.elem].forEach((elem, index, array) => {
            callee(elem, index, array);
        });
        return this;
    }
}


class Rectangle{
    constructor(width, height){
        this.elem = document.createElement('div');
        this.elem.style.border = '1px solid black';
        this.setWidth(width);
        this.setHeight(height);
        document.body.appendChild(this.elem);
    }

    setWidth(width){
        this.elem.style.width = width + 'px';
    }

    setHeight(height){
        this.elem.style.height = height + 'px';
    }
    getWidth(){
        return parseInt(this.elem.style.width);
    }
    getHeight(){
        return parseInt(this.elem.style.height);
    }
}