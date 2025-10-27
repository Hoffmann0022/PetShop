
// animação do header

let header = document.querySelector('.header');
let posicionCurrent = window.scrollY;

window.addEventListener('scroll', () => {

    if (window.scrollY > posicionCurrent) {

        header.style.top = '-100px';
        let newposicionCurrent = window.scrollY;
        posicionCurrent = newposicionCurrent

    } else if (window.scrollY < posicionCurrent) {

        header.style.top = '10px';
        let newposicionCurrent = window.scrollY;
        posicionCurrent = newposicionCurrent

    }
})


// animação side-bar

let sideBar = document.querySelector('.sideMenu');
let btn_menu = document.querySelector('.bi-list');
let btn_closeMenu = document.querySelector('.btn_closeMenu');
let overlayMenu = document.querySelector('.overlay');

// abrir menu
btn_menu.addEventListener('click', () => {
    sideBar.style.width = '40vw';
    overlayMenu.style.display = 'block';
})

//fechar menu

btn_closeMenu.addEventListener('click', () => {
    sideBar.style.width = '0vw';
    overlayMenu.style.display = 'none';
})

overlayMenu.addEventListener('click', () => {
    sideBar.style.width = '0vw';
    overlayMenu.style.display = 'none';
})

// pop-up de agendamento

let conteiner = document.querySelector('.conteiner');
let tutor = document.querySelector('.tutor');
let animal = document.querySelector('.animal');
let btn_agendarAgr = document.querySelectorAll('.CTA_button');
let btn_agendar = document.querySelector('.agendar_button');
let overlay = document.querySelector('.overlay');
let btn_closeAgendamento = document.querySelector('.btn_closeAgendamento');
let tutorTitle = document.getElementById('tutor');
let animalTitle = document.getElementById('animal');
let line = document.getElementById('line_agenda');
let img_animal = document.querySelector('.img_animal');
let input_img = document.getElementById('imagem');


// abrir pop-up
btn_agendarAgr.forEach((btn) => {
    btn.addEventListener('click', () => {
        conteiner.style.display = 'flex';
        overlay.style.display = 'block';
        tutorTitle.classList.add('activate');
    });
})

// mudar para formulario do animal

animalTitle.addEventListener('click', () => {
    tutor.style.display = 'none';
    animal.style.display = 'block';
    tutorTitle.classList.remove('activate');
    animalTitle.classList.add('activate');
    line.style.left = '152px';
})


// mudar para formulario do tutor

tutorTitle.addEventListener('click', () => {
    tutor.style.display = 'block';
    animal.style.display = 'none';
    tutorTitle.classList.add('activate');
    animalTitle.classList.remove('activate');
    line.style.left = '143px';
})

// fechar pop-up

btn_closeAgendamento.addEventListener('click', () => {
    conteiner.style.display = 'none';
    overlay.style.display = 'none';
});

// carregar imagem do animal

input_img.addEventListener('change', () => {
    const arquivo = input_img.files[0];
    if (arquivo) {
        const url = URL.createObjectURL(arquivo);
        img_animal.style.backgroundImage = `url(${url})`;
        img_animal.style.backgroundSize = 'cover';
        img_animal.style.backgroundPosition = 'center';
    }
});

// salvar as informações no localstorage







