// Data em que nos conhecemos
const dataInicio = new Date(2026, 4, 23, 15, 30, 0);

function atualizarContador() {

    const agora = new Date();

    // Calcula os meses completos
    let meses = 0;
    let referencia = new Date(dataInicio);

    while (true) {

        const proximoMes = new Date(
            dataInicio.getFullYear(),
            dataInicio.getMonth() + meses + 1,
            dataInicio.getDate(),
            dataInicio.getHours(),
            dataInicio.getMinutes(),
            dataInicio.getSeconds()
        );

        if (proximoMes <= agora) {
            meses++;
            referencia = proximoMes;
        } else {
            break;
        }
    }

    // Calcula o tempo restante após os meses completos
    let diferenca = agora - referencia;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    diferenca %= 1000 * 60 * 60 * 24;

    const horas = Math.floor(diferenca / (1000 * 60 * 60));
    diferenca %= 1000 * 60 * 60;

    const minutos = Math.floor(diferenca / (1000 * 60));
    diferenca %= 1000 * 60;

    const segundos = Math.floor(diferenca / 1000);

// Atualiza os números com animação
function atualizarNumero(id, valor) {

    const elemento = document.getElementById(id);
    const novoValor = valor.toString();

    if (elemento.textContent === novoValor) return;

    const antigo = document.createElement("span");
    const novo = document.createElement("span");

    antigo.textContent = elemento.textContent;
    novo.textContent = novoValor;

    antigo.classList.add("numero-antigo");
    novo.classList.add("numero-novo");

    elemento.textContent = "";
    elemento.classList.add("numero-transicao");

    elemento.appendChild(antigo);
    elemento.appendChild(novo);

    setTimeout(() => {
        elemento.textContent = novoValor;
        elemento.classList.remove("numero-transicao");
    }, 300);
}

atualizarNumero("meses", meses);
atualizarNumero("dias", dias);
atualizarNumero("horas", horas);
atualizarNumero("minutos", minutos);
atualizarNumero("segundos", segundos);
}

// Atualiza imediatamente e depois a cada segundo
atualizarContador();
setInterval(atualizarContador, 1000);