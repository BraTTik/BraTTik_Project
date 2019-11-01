const menuItemsArr = [{
        title: 'About',
        link: 'https://www.larkdeangalley.com/about-page20847472'
    },
    {
        title: 'Podcast',
        link: 'https://larkdeangalley.blogspot.com/p/podcast.html'
    },
    {
        title: 'Courses',
        link: '',
        sub: 'subMenu'
    },
    {
        title: 'Blog',
        link: ' https://larkdeangalley.blogspot.com/ '
    },
    {
        title: 'Contact',
        link: 'https://www.larkdeangalley.com/contact-page20847469'
    }
]

const subMenuArr = [{
        title: 'Free Module of Emotional Self-Reliance Course',
        link: 'https://www.larkdeangalley.com/emotional-self-reliance'
    },
    {
        title: 'BS to Success',
        link: 'https://www.larkdeangalley.com/sales-page30553900'
    },
    {
        title: 'Control Your Bookends',
        link: 'https://www.larkdeangalley.com/sales-page17446689'
    },
    {
        title: 'Your Relationship with Money',
        link: 'https://yourrelationshipwithmoney.com/course'
    },
    {
        title: 'Sales Success System',
        link: 'https://www.larkdeangalley.com/sales-success-system'
    }
]

window.onload = function() {
    let startHereButton = document.querySelector('#startHere h2');
    let dropdownMenuElem = document.querySelector('#dropdownMenu');

    makeMenu(dropdownMenuElem, menuItemsArr);

    let subMenuElem = document.querySelector('#dropdownMenu .subMenu');
    makeSubMenu(subMenuElem, subMenuArr);

    let menuHeight = getComputedStyle(dropdownMenuElem).height;
    dropdownMenuElem.style.height = 0;

    startHereButton.addEventListener('click', function(event) {
        menuOpenerHandler(dropdownMenuElem, menuHeight);
    });

    let subMenu = document.querySelector('#dropdownMenu .subMenu ul');
    let subMenuHeight = getComputedStyle(subMenu).height;
    subMenu.style.height = 0;

    subMenuElem.addEventListener('click', function(event) {
        if (event.target.closest('li').className == 'subMenu') {
            event.preventDefault();
            menuOpenerHandler(subMenu, subMenuHeight);
        }
    });
}

function menuOpenerHandler(menu, height) {
    if (!parseInt(menu.style.height)) {
        menu.style.height = height;
    } else {
        menu.style.height = 0;
    }
}

function makeMenu(parent, list) {
    list.forEach(element => {
        let aElem = document.createElement('a');
        let liElem = document.createElement('li');
        aElem.innerText = element.title
        if (element.sub) {
            liElem.classList.add('subMenu');
        }
        aElem.href = element.link;
        aElem.target = '_blank';
        liElem.append(aElem);

        parent.append(liElem);
    })
}

function makeSubMenu(parent, list) {
    let ulElem = document.createElement('ul');
    makeMenu(ulElem, list);
    parent.append(ulElem);
}