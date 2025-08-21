// Constantes
const NOME_CACO = 'Caco';
const SALDO_INICIAL_CACO = 500;
const VALOR_FICHA = 0.02;

// Função principal para renderizar a interface
function renderizarPagina() {
    const cardsContainer = document.getElementById('cardsGateiros');
    const inputArea = document.getElementById('gateiros-input-area');
    const botoesAcao = document.getElementById('botoes-acao');
    cardsContainer.innerHTML = '';

    const gateiros = JSON.parse(localStorage.getItem('gateiros'));
    const cacoSaldo = parseFloat(localStorage.getItem(NOME_CACO));
    
    // Mostra a área de input se não houver gateiros salvos
    if (!gateiros || gateiros.length === 0) {
        cardsContainer.classList.add('oculto');
        botoesAcao.classList.add('oculto');
        inputArea.classList.remove('oculto');
        document.getElementById('cacoSaldo').textContent = SALDO_INICIAL_CACO;
        return;
    }

    cardsContainer.classList.remove('oculto');
    botoesAcao.classList.remove('oculto');
    inputArea.classList.add('oculto');
    document.getElementById('cacoSaldo').textContent = Math.round(cacoSaldo);
    
    if (cacoSaldo <= 0) {
        alert("O Caco zerou!");
    }

    // Cria os cards para cada gateiro
    gateiros.forEach(gateiro => {
        const saldoReais = gateiro.fichas * VALOR_FICHA;
        const totalAcumuladoClass = gateiro.saldoAcumulado >= 0 ? 'saldo-positivo' : 'saldo-negativo';

        const cardHTML = `
            <div class="card" id="card${gateiro.id}">
                <div class="card-header">
                    <h2 onclick="editarNome('${gateiro.id}')">${gateiro.nome}</h2>
                    <span class="saldo-geral ${totalAcumuladoClass}" id="saldoGeral${gateiro.id}">
                        Geral: R$ ${gateiro.saldoAcumulado.toFixed(2).replace('.', ',')}
                    </span>
                </div>
                <div class="saldo-info">
                    <p>Fichas: <span class="saldo-fichas" id="saldoFichas${gateiro.id}">${Math.round(gateiro.fichas)}</span></p>
                    <p>Saldo: <span class="saldo-reais" id="saldoReais${gateiro.id}">R$ ${saldoReais.toFixed(2).replace('.', ',')}</span></p>
                </div>
                <div class="input-group">
                    <input type="number" id="valor${gateiro.id}" placeholder="Valor">
                    <button class="add" onclick="adicionar('${gateiro.id}')">💰</button>
                    <button class="subtract" onclick="subtrair('${gateiro.id}')">Compra</button>
                </div>
            </div>
        `;
        cardsContainer.innerHTML += cardHTML;
    });
}

// Função para exibir/esconder a área de input de gateiros
function toggleGateirosInput() {
    const inputArea = document.getElementById('gateiros-input-area');
    inputArea.classList.toggle('oculto');
}

// Função para definir o número de gateiros e manter dados
function setNumGateiros() {
    const numGateirosInput = document.getElementById('numGateirosInput');
    const numGateiros = parseInt(numGateirosInput.value);

    if (isNaN(numGateiros) || numGateiros < 1 || numGateiros > 10) {
        alert("Por favor, insira um número de 1 a 10.");
        return;
    }

    let gateiros = JSON.parse(localStorage.getItem('gateiros')) || [];
    const currentNumGateiros = gateiros.length;

    if (numGateiros > currentNumGateiros) {
        for (let i = currentNumGateiros + 1; i <= numGateiros; i++) {
            gateiros.push({ id: `Gateiro${i}`, nome: `Gateiro ${i}`, fichas: 0, saldoAcumulado: 0 });
        }
    } else if (numGateiros < currentNumGateiros) {
        // Remove os gateiros excedentes do final do array
        gateiros = gateiros.slice(0, numGateiros);
    }
    
    // Apenas inicializa o saldo do Caco se ele não existir
    if (localStorage.getItem(NOME_CACO) === null) {
        localStorage.setItem(NOME_CACO, SALDO_INICIAL_CACO);
    }
    
    localStorage.setItem('gateiros', JSON.stringify(gateiros));
    renderizarPagina();
}

// Funções de adicionar/subtrair fichas
function adicionar(id) {
    const inputValor = document.getElementById(`valor${id}`).value;
    const valor = parseFloat(inputValor);
    if (isNaN(valor) || valor <= 0) { alert("Valor inválido."); return; }

    const gateiros = JSON.parse(localStorage.getItem('gateiros'));
    const gateiro = gateiros.find(g => g.id === id);
    gateiro.fichas += valor;
    
    let cacoSaldo = parseFloat(localStorage.getItem(NOME_CACO));
    cacoSaldo += valor;
    
    localStorage.setItem('gateiros', JSON.stringify(gateiros));
    localStorage.setItem(NOME_CACO, cacoSaldo);
    renderizarPagina();
}

function subtrair(id) {
    const inputValor = document.getElementById(`valor${id}`).value;
    const valor = parseFloat(inputValor);
    if (isNaN(valor) || valor <= 0) { alert("Valor inválido."); return; }

    const gateiros = JSON.parse(localStorage.getItem('gateiros'));
    const gateiro = gateiros.find(g => g.id === id);
    gateiro.fichas -= valor;

    let cacoSaldo = parseFloat(localStorage.getItem(NOME_CACO));
    cacoSaldo -= valor;
    
    localStorage.setItem('gateiros', JSON.stringify(gateiros));
    localStorage.setItem(NOME_CACO, cacoSaldo);
    renderizarPagina();
}

// Funções de controle
function editarNome(id) {
    const gateiros = JSON.parse(localStorage.getItem('gateiros'));
    const gateiro = gateiros.find(g => g.id === id);
    const novoNome = prompt(`Editar nome para "${gateiro.nome}":`);
    if (novoNome && novoNome.trim() !== '') {
        gateiro.nome = novoNome.trim();
        localStorage.setItem('gateiros', JSON.stringify(gateiros));
        renderizarPagina();
    }
}

function finalizarSessao() {
    if (confirm("Deseja finalizar a rodada? As fichas serão zeradas e os valores somados ao total Geral.")) {
        const gateiros = JSON.parse(localStorage.getItem('gateiros'));
        gateiros.forEach(gateiro => {
            const saldoAtualReais = gateiro.fichas * VALOR_FICHA;
            gateiro.saldoAcumulado += saldoAtualReais;
            gateiro.fichas = 0;
        });
        localStorage.setItem('gateiros', JSON.stringify(gateiros));
        renderizarPagina();
    }
}

function resetarPagina() {
    if (confirm("Deseja resetar TUDO? Isso apagará todos os dados salvos.")) {
        localStorage.clear();
        renderizarPagina();
    }
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', renderizarPagina);
