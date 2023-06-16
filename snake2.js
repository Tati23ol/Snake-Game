const tabuleiro = document.querySelector("#game-board");
let maiorValor = document.querySelector(".scoreAlto")
let valorAtual = document.querySelector(".scoreAtual")

let comidaY = 15, comidaX = 15;
let cabecaX = 5;
let cabecaY = 5;

let corpo = [];
let cont = 0;


function atualizarValores(){
    let maior = 0
    maior += cont
    valorAtual.innerHTML = maior

    if(maiorValor.innerHTML == 0){
    maiorValor.innerHTML = localStorage.getItem('pontos')
    } else if(maior > maiorValor.innerHTML){
        localStorage.setItem('pontos',JSON.parse(maior));  

    }
}
function attComida() {
    comidaX = Math.floor(Math.random() * 21) + 1; 
    comidaY = Math.floor(Math.random() * 21) + 1;
}

function iniciandoJogo() {
    let criandoDivs = `<div class="comida" style="grid-area: ${comidaY} / ${comidaX}"></div>`;
    criandoDivs += `<div class="cabeca" name="cabecao" style="grid-area: ${cabecaY} / ${cabecaX}"></div>`;

    for (let i = 0; i < corpo.length; i++) {
        const [x, y] = corpo[i];
        criandoDivs += `<div class="corpo" name="body" style="grid-area: ${x} / ${y}"></div>`;
    }

    tabuleiro.innerHTML = criandoDivs;

    if (cabecaX <= 0 || cabecaX > 21 || cabecaY <= 0 || cabecaY >= 22) {
        alert("Você perdeu1");
        location.reload();
    }


    const cabecaGridArea = `${cabecaY} / ${cabecaX}`;


    for (let i = 1; i < corpo.length; i++) {
        const [x, y] = corpo[i];
        const corpoGridArea = `${x} / ${y}`;
        if (cabecaGridArea === corpoGridArea) {
            alert("Você perdeu2");
            location.reload();
        }
    }
}


function mover() {
    const novaCabecaX = cabecaX + direcao.x;
    const novaCabecaY = cabecaY + direcao.y;

    if (novaCabecaX === comidaX && novaCabecaY === comidaY) {
        attComida();
        cont += 1;
    } else {
        corpo.pop();
    }

    cabecaX = novaCabecaX;
    cabecaY = novaCabecaY;

    corpo.unshift([novaCabecaY, novaCabecaX]);

    iniciandoJogo();
    atualizarValores()
    setTimeout(mover, 100);
}

const direcao = {
    x: 0,
    y: 0,
};

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direcao.x === 0 && direcao.y === 1) {
                break
            }
            direcao.x = 0;
            direcao.y = -1;
            break;
        case 'ArrowDown':
            if (direcao.x === 0 && direcao.y === -1) {
                break            }
            direcao.x = 0;
            direcao.y = 1;
            break;
        case 'ArrowLeft':
            if (direcao.x === 1 && direcao.y === 0) {
                break            }
            direcao.x = -1;
            direcao.y = 0;
            break;
        case 'ArrowRight':
            if (direcao.x === -1 && direcao.y === 0) {
                break            }
            direcao.x = 1;
            direcao.y = 0;
            break;
    }
});

mover();
