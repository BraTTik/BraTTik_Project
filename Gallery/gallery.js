'use strict';

const bump = [
    {
        title: 'Илон Маск',
        image: './images/elon_mask.jpg'
    },
    {
        title: 'Полёт на Марс',
        image: './images/fly_to_mars.jpg'
    },
    {
        title: 'Жизнь на Энцеладе',
        image: './images/life_at_encalade.jpg'
    },
    {
        title: 'Инженеры НАСА',
        image: './images/nasa_engeneers.jpg'
    },
    {
        title: 'Космическая красота',
        image: './images/space_beauty.png'
    },
]

class Gallery{
    constructor(querySelector){
        this._root = document.querySelector(querySelector);

        this._preview = null;
        this._previews = [];
        this._previewButtonLeft;
        this._previewButtonRight;
        this._previewWindow;
        this._previewList;
        
        this._slider = null;
        this._previousArrow = null;
        this._nextArrow = null;
        this._slides = [];
        this._activeSlide;
        this._nextSlide;
        this._previousSlide;
        this._active = 0;
        this._next;
        this._previous;

        this._isSliding = false;
        this._touchMove = [];
    }
    
    get root(){
        return this._root;
    }

    get slides(){
        return this._slides;
    }
    update = () => {
        this.setActiveSlide();
        this.setActivePreview();
        this.setNextSlide();
        this.setPreviousSlide();
        this._isSliding = false;
    }
    setActiveSlide = () => {
        this._activeSlide&&this._hideSlide(this._activeSlide);
        const activeSlide = this._makeSlide(this.slides[this._active]);
        activeSlide.classList.add('active_slide');
        activeSlide.style.left = 0;
        //this._slideFormat(this._activeSlide);
        this._activeSlide = this._showSlide(activeSlide);
        return activeSlide;
    }
    setNextSlide = () => {
        this._nextSlide&&this._hideSlide(this._nextSlide);
        this._next = (this._active + 1 > this.slides.length - 1) ? 
                                        0 : this._active + 1;
        const nextSlide = this._makeSlide(this.slides[this._next]);
        nextSlide.classList.add('next_slide');
        nextSlide.style.left = '101%';
        this._nextSlide = this._showSlide(nextSlide);

        return nextSlide;
    }
    setPreviousSlide = () => {
        this._previousSlide&&this._hideSlide(this._previousSlide);
        this._previous = this._active - 1 < 0 ? 
                this.slides.length - 1 : this._active - 1;
        const previousSlide = this._makeSlide(this.slides[this._previous]);
        previousSlide.classList.add('previous_slide');
        previousSlide.style.left = '-101%';
        this._previousSlide = this._showSlide(previousSlide);

        return previousSlide;
    }
    setActivePreview = () => {
        let self = this;
        let active = this._previews.find( elem => {
            return elem.dataset.slideId == self._active;
        });
        this._previews.forEach( elem => {
            elem.parentNode.classList.remove('active_preview');
        });
        this._setPreviewInCenter(active);
        active.parentNode.classList.add('active_preview');
    }

    init = () => {
        this._makeStructure();
        this._calculateSliderWrapperHeight(this._slider);
        this._isMobile();
        window.addEventListener('resize', () => { 
            this._isMobile();
            this._calculateSliderWrapperHeight(this._slider);
            this._fixImgSize(this._activeSlide);
        });
        this._previousArrow.addEventListener('click', this.previous);
        this._nextArrow.addEventListener('click', this.next);
        this._slider.addEventListener('touchmove', (e) => { this._swipeHandler(e, this._swipe.bind(this)) });
        this._slider.addEventListener('touchend', () => { this._touchMove = []})

        this._previewWindow.appendChild(this._makePreviewList(this.slides));
        this._previewButtonLeft.addEventListener('click', () => { this._movePreviewLeft() });
        this._previewButtonRight.addEventListener('click', () => {  this._movePreviewRight() });
        this._previewWindow.addEventListener('touchmove', (e) => {this._swipeHandler(e, this._swipePreview.bind(this))});
        this._previewWindow.addEventListener('touchend', () => { this._touchMove = []});
        this.update();
        
        return this
    }
    _swipeHandler = (e, callback) => {
        this._touchMove = [...this._touchMove, e.touches[0].clientX];
        const moveDetect = this._touchMove[0] - this._touchMove[this._touchMove.length - 1];
         if(Math.abs(moveDetect) > 30){
             this._touchMove = [];
             callback(moveDetect);
         }
    }
    _swipe(move){
        move > 0 ? this.next() : this.previous();
    }
    _swipePreview(move){
        console.log(move);
        let dist = Math.abs(move);
        move > 0 ? this._movePreviewLeft(dist) : this._movePreviewRight(dist);
    }
    _movePreviewLeft = (dist) => {
        let distance = -dist || -(this._previews[0].offsetWidth + 25);
        let maxLeft = Number(this._previewList.offsetWidth) - Number(this._previewWindow.offsetWidth);
        let left = parseInt(this._previewList.style.left);

        if(Math.abs(left + distance) > maxLeft - 20){
            left = -maxLeft - 20;
        }else{
            left = left + distance;
        }
        this._previewList.style.left = left + 'px';
    }
    _movePreviewRight = (dist) => {
        let distance = dist || this._previews[0].offsetWidth + 25;
        let left = parseInt(this._previewList.style.left);

        if(left + distance > 20){
            left = 20;
        }else{
            left = left + distance;
        }
        this._previewList.style.left = left + 'px';

    }
    _setPreviewInCenter = (preview) => {
        let windowCenter = this._previewWindow.offsetWidth/2;
        const center = windowCenter - preview.offsetWidth/2;
        let previewLeft = preview.offsetLeft - center;
        this._previewList.style.left = -previewLeft + 'px';
    }
    _clickPreviewHandler = (e) =>{
        const preview = e.target;
        const slideId = preview.dataset.slideId;
        if(slideId === this.active){
            return
        }else{
            this._active = +slideId;
            this.update();
        }
    }
    loadImages = (array) => {
        /*
            Принимает массив объектов 
            {
                title: 'name.jpg',
                image: 'path'
            }
        */
        this._slides = array.map( ({title, image}, index) => {
            return {title, image, slideId: index};
        });

        return this;
    }

    addSlide = ({image, title, slideId}) =>{
        this._slides = [...this._slides, {title, image, slideId}]
    }

    next = () => {
        if(!this._isSliding){
            this._isSliding = true;
            this.slideLeft();
            if(this._active + 1 > this.slides.length - 1){
                this._active = 0; 
            }else{
                this._active++;
            }
        }
        return this._active;
    }

    previous = () => {
        if(!this._isSliding){
            this._isSliding = true;
            this.slideRight();
            if(this._active - 1 < 0){
                this._active = this._slides.length - 1; 
            }else{
                this._active--;
            }
        }
        return this._active;
    }

    slideLeft = (callback) => {
        this._activeSlide.style.left = '-101%';
        this._nextSlide.style.left = 0;
        setTimeout(()=>{
            this.update();
            callback&&callback();
        }, 350)
    }

    slideRight = (callback) => {
        this._activeSlide.style.left = '101%';
        this._previousSlide.style.left = 0;
        setTimeout(()=>{
            this.update();
            callback&&callback();
        }, 350);
    }

    _showSlide = (slide) =>{
        this._slider.appendChild(slide);
        this._slideFormat(slide);
        return slide;
    }
    _hideSlide = (slide) => {
        this._slider.removeChild(slide);
        return true;
    }

    _makeSlide = ({image, title, slideId}) =>{
        let img = document.createElement('img');
        let slide = this._getDiv('gallery_slide');
        let titleElem = this._getDiv('slide_title');
        let h3Elem = this._getElement('h3');

        img.src = image;
        slide.dataset.slideId = slideId;
        h3Elem.innerHTML = title;
        
        titleElem.appendChild(h3Elem);
        slide.appendChild(img);
        slide.appendChild(titleElem);

        return slide;
    }

    _slideFormat = (slide) => {
        const img = slide.children[0];
        const imageSrc = img.src;
        const image = new Image();
        image.src = imageSrc;
        const width = image.width;
        const height = image.height;
        
        width <= height ? this._setPortrait(img) : this._setLandscape(img);
        this._fixImgSize(slide);
    }

    _fixImgSize = (slide) => {
        const img = slide.children[0];
        if(img.offsetHeight > slide.offsetHeight){
            img.style.height = 100 + '%';
            img.style.width = 'auto';
        }
    }

    _setLandscape(img){
        img.classList.add('landscape');
        console.log('Landscape')
    }
    _setPortrait(img){
        img.classList.add('portrait');
        console.log('Portrait')
    }

    _makePreviewList(slides){
        let list = this._getElement('ul');
        list.classList.add('preview_list');
        list.style.left = 0;
        slides.forEach( (slide) => {
            const li = this._makePreview(slide);
            let side = 70;
            li.style.width = side + 'px';
            li.style.height = side + 'px';
            list.appendChild(li);
        })
        this._previewList = list;
        return list;
    }

    _makePreview({image, slideId}){
        let liWrap = this._getElement('li');
        liWrap.classList.add('preview_element');

        let previewDiv = this._getDiv('preview_image');
        previewDiv.style.backgroundImage = `url(${image})`;
        previewDiv.dataset.slideId = slideId;
        previewDiv.addEventListener('click', this._clickPreviewHandler)
        this._previews = [...this._previews, previewDiv];

        liWrap.appendChild(previewDiv);

        return liWrap;
    }

    // Служебные функции для построения структуры галереи
    _makeStructure = () => {
        let gallery_wrapper = this._getDiv('gallery_wrapper');
        
        let slider_wrapper = this._makeSliderSection();
        let preview_wrapper = this._makePreviewSection();

        gallery_wrapper.appendChild(slider_wrapper);
        gallery_wrapper.appendChild(preview_wrapper);
        this._galleryWrapper = gallery_wrapper;
        this.root.appendChild(gallery_wrapper);
    }

    _makePreviewSection = () => {
        let preview_wrapper = this._getDiv('preview_wrapper');
        let buttonLeft = this._getDiv('preview_button', 'preview_button__left');
        let buttonRight = this._getDiv('preview_button', 'preview_button__right');
        let previewWindow = this._getDiv('preview_window');

        preview_wrapper.appendChild(buttonLeft);
        preview_wrapper.appendChild(previewWindow);
        preview_wrapper.appendChild(buttonRight);
        preview_wrapper.style.height = 100 + 'px';
        this._previewButtonLeft = buttonLeft;
        this._previewButtonRight = buttonRight;
        this._previewWindow = previewWindow;
        this._preview = preview_wrapper;

        return preview_wrapper;
    }

    _makeSliderSection = () => {
        let slider_wrapper = this._getDiv('slider_wrapper');
        let image_wrapper = this._getDiv('image_wrapper');
        let image_title = this._getDiv('image_title');
        let previousArrow = this._getDiv('arrow', 'previousArrow');
        let nextArrow = this._getDiv('arrow', 'nextArrow');

        this._slider = slider_wrapper;
        this._previousArrow = previousArrow;
        this._nextArrow = nextArrow;
        
        slider_wrapper.appendChild(image_wrapper);
        slider_wrapper.appendChild(image_title);
        slider_wrapper.appendChild(previousArrow);
        slider_wrapper.appendChild(nextArrow);

        return slider_wrapper;
    }

    _calculateSliderWrapperHeight = (wrapper) =>{
        const width = wrapper.offsetWidth;
        const height = width;
        wrapper.style.height = height + 'px';
    }

    _appendElement(parent, child){
        parent.appendChild(child);
    }
    _getDiv(classNames){
        let div = this._getElement('div');
        for(let i = 0; i < arguments.length; i++){
            div.classList.add(arguments[i]);
        }
        return div;
    }
    _getElement(element){
        let elem = document.createElement(element);
        return elem;
    }

    loadImagesFromHTML(){
        const slides =[...this._root.querySelectorAll('.gallery_slide')];
        this._root.innerHTML = '';
        const mapped = slides.map(slide => {
            const result = this._getSlidesElementsFromHTML(slide);
            return result;
        })
        this.loadImages(mapped);
        return this
    }

    _getSlidesElementsFromHTML(slide){
        const [titleText, imgSrc] = slide.children;
        const title = titleText.innerHTML;
        const image = imgSrc.src;
        return { title, image };
    }

    _isMobile = () =>{
        if(document.body.offsetWidth < 550 ){
           this._hidePreview();
        }else{
            this._showPreview();
        }
    }

    _hidePreview = () => {
        this._preview.style.display = 'none';
    }

    _showPreview = () => {
        this._preview.style.display = 'flex';
    }

    _fullScreenOn = () => {
        this._hidePreview();
    }

    _fullScreenOff = () => {

    }

    static getRef(){
        return this;
    }
}

window.addEventListener('load', () => {
    const gallery = new Gallery('#gallery_root');
    gallery.loadImagesFromHTML().init();
});