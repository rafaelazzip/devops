// Slideshow
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demodots");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-white";
}

// seleciono todos os links da pagina
const links = document.querySelectorAll('.w3-col a');
// adiciono o evento de click e a função smoothScroll no evento de click
links.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

// função de scroll suave
function smoothScroll(e) {
    // previnindo a ação padrão dos links
    e.preventDefault();
    // pegando a posição de cada div correspondente ao link
    const div = document.querySelector(e.target.getAttribute('href'));
    // adicionando animação ao scroll
    window.scroll({
        left: 0,
        top: div.offsetTop,
        behavior: 'smooth'
    });
}