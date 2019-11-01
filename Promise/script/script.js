'use strict';

//http://screeneggs.com/wp-content/uploads/2019/03/ht1h18yqhom21.jpg

function loadImage(path){
    return new Promise(function(resolve, reject){
        let image = new Image();
        image.src = path;

        image.onload    = () => resolve(image);
        image.onerror   = () => reject(path);
    });
}



let arrOfImagePaths = [
    'http://memeshappen.com/media/created/2018/04/he-just-wanted-to-build-a-modern-JS-frontend.jpg',
    'https://img.devrant.com/devrant/rant/r_725928_8CwqC.jpg',
    'https://pics.me.me/javascript-is-like-the-weather-in-michigan-inbox-x-via-58180400.png',
    'https://miro.medium.com/max/500/1*9bDq6pyYoXa39QxldAkf-g.jpeg',
    'https://img.devrant.com/devrant/rant/r_1203005_fSLeV.jpg',
    'https://miro.medium.com/max/400/1*0V8IZH_wHIo7yZvVYm5fVQ.jpeg'
]

Promise.all(arrOfImagePaths.map(loadImage)).then(
    images => {
        for(let image of images){
            document.body.appendChild(image);
        }
    },
    error => console.log(error) 
)
