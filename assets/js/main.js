/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// adds all the images from the img folder.
document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.getElementById('allArtworks');
    const imageFolder = 'assets/artworks/';

    fetch(imageFolder) // Fetch the folder
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const html = parser.parseFromString(text, 'text/html');
            const links = html.querySelectorAll('a[href]:not([href$=".html"])'); // Get all image links

            links.forEach(link => {
                const imagePath = link.href;
                const imageExtension = imagePath.split('.').pop().toLowerCase();
                const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif']; // Add more image extensions if needed

                if (allowedExtensions.includes(imageExtension)) {
                    const imageLink = document.createElement('a');
                    imageLink.href = imagePath;
                    imageLink.classList.add('work__img');

                    const imageElement = document.createElement('img');
                    imageElement.src = imagePath;
                    imageElement.alt = link.textContent.trim(); // Set alt attribute using the file name

                    imageLink.appendChild(imageElement);
                    imageContainer.appendChild(imageLink);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
});


/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
