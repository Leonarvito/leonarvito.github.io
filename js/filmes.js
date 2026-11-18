// ELEMENTOS DA PÁGINA

const listaFilmes = document.querySelector(".lista-filmes");

const itensFilmes = Array.from(
    listaFilmes.querySelectorAll(".item-filme")
);

const cartoes = itensFilmes.map(item =>
    item.querySelector(".cartao-filme")
);

const campoPesquisa = document.getElementById("pesquisa-filmes");
const seletorOrdenacao = document.getElementById("ordenar-filmes");
const contadorFilmes = document.getElementById("contador-filmes");


// CALCULAR AS MÉDIAS

function calcularMedias() {

    cartoes.forEach(cartao => {

        const minhaNota = Number(
            cartao.querySelector(".minha-nota").textContent.replace(",", ".")
        );

        const notaDela = Number(
            cartao.querySelector(".nota-dela").textContent.replace(",", ".")
        );

        const media = (minhaNota + notaDela) / 2;

        cartao.querySelector(".media-casal").textContent =
            media.toFixed(2).replace(".", ",") + " / 10";

    });

}


// PESQUISA DE FILMES

function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function pesquisarFilmes() {

    const pesquisa = normalizarTexto(campoPesquisa.value.trim());

    let encontrados = 0;

    itensFilmes.forEach(item => {

        const cartao = item.querySelector(".cartao-filme");

        const nome = cartao.querySelector(".cabecalho-cartao h2").textContent;

        const nomeNormalizado = normalizarTexto(nome);

        if (nomeNormalizado.includes(pesquisa)) {

            item.style.display = "";
            encontrados++;

        } else {

            item.style.display = "none";

        }

    });

    contadorFilmes.textContent =
        `Exibindo ${encontrados} de ${itensFilmes.length} filmes`;

}


// ORGANIZAR OS FILMES

function organizarFilmes() {

    const ordem = seletorOrdenacao.value;

    const filmesOrdenados = [...itensFilmes];

    filmesOrdenados.sort((itemA, itemB) => {

        const a = itemA.querySelector(".cartao-filme");
        const b = itemB.querySelector(".cartao-filme");

        const nomeA = a.querySelector(".cabecalho-cartao h2").textContent.trim();
        const nomeB = b.querySelector(".cabecalho-cartao h2").textContent.trim();

        const notaA = parseFloat(
            a.querySelector(".media-casal").textContent.replace(",", ".")
        );

        const notaB = parseFloat(
            b.querySelector(".media-casal").textContent.replace(",", ".")
        );

        const anoA = Number(
            a.querySelector(".cabecalho-cartao p").textContent.match(/\b(19|20)\d{2}\b/)?.[0] || 0
        );

        const anoB = Number(
            b.querySelector(".cabecalho-cartao p").textContent.match(/\b(19|20)\d{2}\b/)?.[0] || 0
        );

        switch (ordem) {

            case "nome-az":
                return nomeA.localeCompare(nomeB, "pt-BR");

            case "nome-za":
                return nomeB.localeCompare(nomeA, "pt-BR");

            case "nota-maior":
                return notaB - notaA;

            case "nota-menor":
                return notaA - notaB;

            case "ano-recente":
                return anoB - anoA;

            case "ano-antigo":
                return anoA - anoB;

            default:
                return 0;

        }

    });

    filmesOrdenados.forEach(item => {
        listaFilmes.appendChild(item);
    });

}


// EVENTOS

campoPesquisa.addEventListener("input", pesquisarFilmes);

seletorOrdenacao.addEventListener("change", organizarFilmes);


// INICIALIZAÇÃO

calcularMedias();
organizarFilmes();
pesquisarFilmes();