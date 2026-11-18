// ELEMENTOS DA PÁGINA
const campoPesquisa = document.getElementById("pesquisa-shows");
const contadorShows = document.getElementById("contador-shows");
const albuns = Array.from(document.querySelectorAll(".album-show"));

// NORMALIZAR TEXTO
function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

// PESQUISAR SHOWS
function pesquisarShows() {

    const pesquisa = normalizarTexto(campoPesquisa.value.trim());

    let encontrados = 0;

    albuns.forEach(album => {

        const artista = album.querySelector(".cabecalho-album h2").textContent;

        if (normalizarTexto(artista).includes(pesquisa)) {

            album.style.display = "";

            encontrados++;

        } else {

            album.style.display = "none";

        }

    });

    contadorShows.textContent =
        `Exibindo ${encontrados} de ${albuns.length} shows`;
}

// EVENTO DE PESQUISA
campoPesquisa.addEventListener("input", pesquisarShows);

// INICIALIZAÇÃO
pesquisarShows();

// =========================
// LIGHTBOX
// =========================

const lightbox = document.getElementById("lightbox");
const imagemAmpliada = document.getElementById("imagem-ampliada");
const videoAmpliado = document.getElementById("video-ampliado");

const fecharLightbox = document.getElementById("fechar-lightbox");
const botaoAnterior = document.getElementById("midia-anterior");
const botaoProximo = document.getElementById("proxima-midia");
const botaoDownload = document.getElementById("baixar-midia");

let midiasAtuais = [];
let indiceAtual = 0;
let toqueInicialX = 0;
let toqueFinalX = 0;

// ABRIR LIGHTBOX
function abrirLightbox(album, indice) {

    midiasAtuais = Array.from(
        album.querySelectorAll(".item-midia")
    );

    indiceAtual = indice;

    lightbox.classList.add("ativo");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    mostrarMidia();
}

// MOSTRAR MÍDIA
function mostrarMidia() {

    const item = midiasAtuais[indiceAtual];

    const imagem = item.querySelector("img");
    const video = item.querySelector("video");

    // Esconder e limpar mídias anteriores
    imagemAmpliada.style.display = "none";
    videoAmpliado.style.display = "none";

    videoAmpliado.pause();
    videoAmpliado.removeAttribute("src");
    videoAmpliado.load();

    if (imagem) {

        imagemAmpliada.src = imagem.src;
        imagemAmpliada.alt = imagem.alt;
        imagemAmpliada.style.display = "block";

        botaoDownload.href = imagem.src;
        botaoDownload.download = imagem.src.split("/").pop();

    } else if (video) {

        videoAmpliado.src = video.src;
        videoAmpliado.style.display = "block";

        botaoDownload.href = video.src;
        botaoDownload.download = video.src.split("/").pop();

    }

    // Esconder setas quando houver apenas uma mídia
    const possuiNavegacao = midiasAtuais.length > 1;

    botaoAnterior.style.display = possuiNavegacao ? "block" : "none";
    botaoProximo.style.display = possuiNavegacao ? "block" : "none";
}

// FECHAR LIGHTBOX
function fecharVisualizacao() {

    lightbox.classList.remove("ativo");
    lightbox.setAttribute("aria-hidden", "true");

    videoAmpliado.pause();
    videoAmpliado.removeAttribute("src");
    videoAmpliado.load();

    document.body.style.overflow = "";

}

// NAVEGAR ENTRE MÍDIAS
function navegarMidia(direcao) {

    indiceAtual += direcao;

    if (indiceAtual < 0) {
        indiceAtual = midiasAtuais.length - 1;
    }

    if (indiceAtual >= midiasAtuais.length) {
        indiceAtual = 0;
    }

    mostrarMidia();

}

// IDENTIFICAR CLIQUES NAS GALERIAS
document.querySelectorAll(".album-show").forEach(album => {

    const itens = album.querySelectorAll(".item-midia");

    itens.forEach((item, indice) => {

        item.addEventListener("click", () => {
            abrirLightbox(album, indice);
        });

    });

});

// EVENTOS DOS BOTÕES
fecharLightbox.addEventListener("click", fecharVisualizacao);

botaoAnterior.addEventListener("click", () => {
    navegarMidia(-1);
});

botaoProximo.addEventListener("click", () => {
    navegarMidia(1);
});


// =========================
// NAVEGAÇÃO PELO TECLADO
// =========================

document.addEventListener("keydown", (evento) => {

    // Só funciona quando o lightbox está aberto
    if (!lightbox.classList.contains("ativo")) {
        return;
    }

    // Fechar com ESC
    if (evento.key === "Escape") {
        fecharVisualizacao();
    }

    // Mídia anterior
    if (evento.key === "ArrowLeft") {
        navegarMidia(-1);
    }

    // Próxima mídia
    if (evento.key === "ArrowRight") {
        navegarMidia(1);
    }

});

lightbox.addEventListener("click", (evento) => {

    if (evento.target === lightbox) {
        fecharVisualizacao();
    }

});


// =========================
// NAVEGAÇÃO POR GESTOS (SWIPE)
// =========================

const conteudoLightbox = document.querySelector(".conteudo-lightbox");

conteudoLightbox.addEventListener("touchstart", (evento) => {
    toqueInicialX = evento.changedTouches[0].screenX;
}, { passive: true });

conteudoLightbox.addEventListener("touchend", (evento) => {
    toqueFinalX = evento.changedTouches[0].screenX;

    const distancia = toqueFinalX - toqueInicialX;
    const limite = 50;

    if (Math.abs(distancia) < limite) {
        return;
    }

    if (distancia < 0) {
        // Arrastou para a esquerda: próxima mídia
        navegarMidia(1);
    } else {
        // Arrastou para a direita: mídia anterior
        navegarMidia(-1);
    }

}, { passive: true });


 // =========================
 // DOWNLOAD DAS MÍDIAS
 // =========================


