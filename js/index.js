
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

if (animalTitle) {
  animalTitle.addEventListener('click', () => {
    tutor.style.display = 'none';
    animal.style.display = 'block';
    tutorTitle.classList.remove('activate');
    animalTitle.classList.add('activate');
    line.style.left = '152px';
  });
}

// mudar para formulario do tutor

if (tutorTitle) {
  tutorTitle.addEventListener('click', () => {
    tutor.style.display = 'block';
    animal.style.display = 'none';
    tutorTitle.classList.add('activate');
    animalTitle.classList.remove('activate');
    line.style.left = '143px';
  })
}

// fechar pop-up
if (btn_closeAgendamento) {
  btn_closeAgendamento.addEventListener('click', () => {
    conteiner.style.display = 'none';
    overlay.style.display = 'none';
  });
}

// carregar imagem do animal

if (input_img) {
  input_img.addEventListener('change', () => {
    const arquivo = input_img.files[0];
    if (arquivo) {
      const url = URL.createObjectURL(arquivo);
      img_animal.style.backgroundImage = `url(${url})`;
      img_animal.style.backgroundSize = 'cover';
      img_animal.style.backgroundPosition = 'center';
    }
  });
}


// salvar as informações no localstorage

let grid = document.querySelector('.grid');
let card = document.querySelectorAll('.card');

const nomeTutor = document.getElementById("name_tutor");
const telefoneTutor = document.getElementById("telefone");
const ruaTutor = document.getElementById("rua");
const numeroTutor = document.getElementById("numero");
const cidadeTutor = document.getElementById("cidade");
const complementoTutor = document.getElementById("complemento");
const dataAtendimento = document.getElementById("data");

const nomeAnimal = document.getElementById("name_animal");
const idadeAnimal = document.getElementById("idade");
const imagemAnimal = document.getElementById("imagem");
const porteAnimal = document.getElementById("porte");
const botaoAgendar = document.querySelector(".agendar_button");


// Função: converter imagem para Base64

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}


// Adicionar cliente 

const adicionaCliente = async () => {
  let imgBase64 = "";
  const imgFile = imagemAnimal.files[0];
  if (imgFile) {
    imgBase64 = await toBase64(imgFile); // Converte em Base64
  }

  const novoCliente = {
    img: imgBase64,
    animal: nomeAnimal.value.trim(),
    tutor: nomeTutor.value.trim(),
    data: dataAtendimento.value,
    telefone: telefoneTutor.value.trim(),
    rua: ruaTutor.value.trim(),
    numero: numeroTutor.value.trim(),
    cidade: cidadeTutor.value.trim(),
    complemento: complementoTutor.value.trim(),
    idade: idadeAnimal.value.trim(),
    porte: porteAnimal.value.trim()
  };

  const gridSalvo = JSON.parse(localStorage.getItem("grid")) || [];
  gridSalvo.push(novoCliente);

  try {
    localStorage.setItem("grid", JSON.stringify(gridSalvo));
  } catch (e) {
    alert("Limite de armazenamento atingido. Remova alguns cadastros antigos.");
    console.error(e);
  }
};


// Carregar grid com cards

const carregarGrid = () => {
  const grid = document.querySelector(".grid");

  const gridSalvo = JSON.parse(localStorage.getItem("grid")) || [];
  grid.innerHTML = "";

  gridSalvo.forEach((g, index) => {
    grid.innerHTML += `
      <div class="card" data-index="${index}">
        <div class="img" style="background-image: url('${g.img}')"></div>
        <div class="info">
          <div class="names">
            <h3>${g.animal}</h3>
            <p class="tutor">${g.tutor}</p>
          </div>
          <div class="data">
            <span>Data do atendimento</span>
            <p class="data_aten">${g.data}</p>
          </div>
        </div>
      </div>
    `;
  });

  // Adiciona evento de clique para abrir pop-up com os dados
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const index = card.dataset.index;
      const cliente = gridSalvo[index];
      abrirPopupCliente(cliente);
    });
  });
};


// Exibir pop-up com os dados do cliente

function abrirPopupCliente(cliente) {
  conteiner.style.display = "flex";
  overlay.style.display = "block";

  tutor.style.display = "block";
  animal.style.display = "none";
  tutorTitle.classList.add("activate");
  animalTitle.classList.remove("activate");
  line.style.left = "143px";

  // Tutor
  nomeTutor.placeholder = cliente.tutor || "";
  telefoneTutor.placeholder = cliente.telefone || "";
  ruaTutor.placeholder = cliente.rua || "";
  numeroTutor.placeholder = cliente.numero || "";
  cidadeTutor.placeholder = cliente.cidade || "";
  complementoTutor.placeholder = cliente.complemento || "";
  dataAtendimento.value = cliente.data || "";

  // Animal
  nomeAnimal.placeholder = cliente.animal || "";
  idadeAnimal.placeholder = cliente.idade || "";
  porteAnimal.placeholder = cliente.porte || "";

  // Imagem (Base64)
  if (cliente.img) {
    img_animal.style.backgroundImage = `url(${cliente.img})`;
    img_animal.style.backgroundSize = "cover";
    img_animal.style.backgroundPosition = "center";
  }
}

// Inicialização

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".grid")) {
    carregarGrid();
  }

  if (botaoAgendar) {
    botaoAgendar.addEventListener("click", async () => {
      await adicionaCliente();
      window.location.href = "./html/clientes.html";
    });
  }
});

// add produto no carrinho

let produto = document.querySelectorAll('.card_ecommerce');

produto.forEach((p) => {
  const btn_carrinho = p.querySelector('.bi-cart-plus');

  if (btn_carrinho) {
    btn_carrinho.addEventListener('click', (e) => {

      e.stopPropagation();

      const nome = p.querySelector('h3').textContent;
      const preco = p.querySelector('.preco p').textContent;
      const imgSrc = p.querySelector('img').src;

      // Recupera carrinho do storage ou cria vazio
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

      // Adiciona o produto
      carrinho.push({ nome, preco, imgSrc });

      // Salva novamente
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      // Exibe mensagem
      window.alert(`${nome} adicionado ao carrinho!`)

    });
  }

})
