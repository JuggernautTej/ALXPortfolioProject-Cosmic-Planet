document.addEventListener('DOMContentLoaded', function(){
    const allSearchBtns = document.querySelectorAll('.searchBtn');
    const forSearchBar = document.querySelector('.searchBar');
    const forSearchInput = document.getElementById('searchInput');
    const forSearchCloseBtn = document.getElementById('searchClose');

    for(var x = 0; x < allSearchBtns.length; x++) {
        allSearchBtns[x].addEventListener('click', function() {
           forSearchBar.style.visibility = 'visible'; 
           forSearchBar.classList.add('open');
           this.setAttribute('aria-expanded', 'true');
           forSearchInput.focus();
        });
    }
    forSearchCloseBtn.addEventListener('click', function() {
        forSearchBar.style.visibility = 'hidden'; 
        forSearchBar.classList.remove('open');
        this.setAttribute('aria-expanded', 'true');
    });

// Slideshow logic
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    for (let x = 0; x < slides.length; x++) {
        slides[x].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = 'block';

    setTimeout(showSlides, 5000);
}

if (slides.length > 0) {
    showSlides();
}
});


