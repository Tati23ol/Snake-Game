const tabuleiro = document.querySelector("#game-board");



let comidaY = 15, comidaX = 15;
let cabecaX = 5
let cabecaY = 5
let corpo = []


function attComida(){ 
    comidaX = Math.floor(Math.random() * 21) + 1; 
    comidaY = Math.floor(Math.random() * 21) + 1;
}

function iniciandoJogo(){
    let criandoDivs = `<div class="comida" style="grid-area: ${comidaY} / ${comidaX}"></div>;` // criando as divs iniciais
    criandoDivs += `<div class="cabeca" style="grid-area: ${cabecaY} / ${cabecaX}"></div>;`

    tabuleiro.innerHTML = criandoDivs
}


function criandoResto(){
    if(comidaX === cabecaX && comidaY === cabecaY){ // Muda a comidinha de lugar quando a cobra come
        attComida()
        
    }

    if(cabecaX <= 0 || cabecaX > 21 || cabecaY <= 0 || cabecaY >= 22){ // Função responsavel pra ver se saiu do quadrado ou não
        alert("Você perdeu")
        location.reload();
    }



}


function andar(){
    corpo += direcao.x + cabecaX
    corpo += direcao.y + cabecaY
    // cabecaX += direcao.x
    // cabecaY += direcao.y
}

const direcao = { // precisamos definir duas variaveis para ler no swich
    x: 0,
    y: 0,
}


window.addEventListener('keydown', e => { //função para definir de acordo com as teclas pra onde somar ou diminuir pixeis
    switch (e.key) {
        
        case 'ArrowUp':
            direcao.x = 0;
            direcao.y = -1;
            
            break;
        case 'ArrowDown':

            direcao.x = 0;
            direcao.y = 1;
            break;
        case 'ArrowLeft':
            direcao.x = -1;
            direcao.y = 0;
            break;
        case 'ArrowRight':
            direcao.x = 1;
            direcao.y = 0;
            break;
    }
});


function loop(){ // função de loop para que fique em loop e de sentido de movimento a cobra
    iniciandoJogo()
    criandoResto()
    setTimeout(loop, 100)
    andar()
}
loop()


