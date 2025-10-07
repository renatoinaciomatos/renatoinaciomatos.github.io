document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a tabela para garantir que as classes iniciais sejam aplicadas e o resumo seja calculado
    document.querySelectorAll('.state-button').forEach(button => {
        // Assume que o estado inicial já está definido corretamente no HTML (SIM/1.0)
        updateButtonAppearance(button);
    });

    // Calcula o resumo inicial ao carregar a página
    updateSummary();
});

/**
 * Mapeamento dos estados do IPO (texto, valor e classe CSS).
 * A ordem deve ser: SIM (1.0) -> AV (0.5) -> NA (0.0) -> SIM (1.0)
 */
const STATES_MAP =;

/**
 * Atualiza a aparência do botão (texto, classe CSS e valor de dados).
 * @param {HTMLElement} button - O elemento TD clicado.
 */
function updateButtonAppearance(button) {
    const currentStateText = button.getAttribute('data-state');
    const currentState = STATES_MAP.find(s => s.text === currentStateText);

    // Limpa todas as classes de estado e adiciona a classe correta
    button.classList.remove('state-sim', 'state-av', 'state-na');
    if (currentState) {
        button.textContent = currentState.text;
        button.setAttribute('data-value', currentState.value.toFixed(1)); // Garante o formato 1.0 ou 0.5
        button.classList.add(currentState.class);
    }
}

/**
 * Função principal para alternar o estado do botão ao ser clicado.
 * @param {HTMLElement} button - O elemento TD clicado.
 */
function toggleState(button) {
    const currentStateText = button.getAttribute('data-state');
    
    // Encontra o índice do estado atual
    let currentIndex = STATES_MAP.findIndex(s => s.text === currentStateText);
    
    // Calcula o índice do próximo estado na sequência (ciclo)
    let nextIndex = (currentIndex + 1) % STATES_MAP.length;
    let nextState = STATES_MAP[nextIndex];
    
    // Atualiza o estado no DOM
    button.setAttribute('data-state', nextState.text);
    
    // Atualiza a aparência e o valor
    updateButtonAppearance(button);

    // Recalcula e atualiza o resumo
    updateSummary();
}

/**
 * Recalcula a pontuação total (Sim=1.0, AV=0.5, Não=0.0) por domínio e o total geral.
 */
function updateSummary() {
    const domainScores = {
        Autocuidado: 0.0,
        Motor: 0.0,
        Linguagem: 0.0,
        Cognicao: 0.0,
        Socializacao: 0.0
    };
    let totalScore = 0.0;
    let totalItems = 0;

    // Itera sobre todas as linhas do corpo da tabela
    document.querySelectorAll('#assessmentTable tbody tr').forEach(row => {
        const domain = row.getAttribute('data-domain');
        const button = row.querySelector('.state-button');

        if (button && domain) {
            const scoreValue = parseFloat(button.getAttribute('data-value'));
            
            // Adiciona o valor ao domínio e ao total geral
            if (!isNaN(scoreValue)) {
                domainScores[domain] += scoreValue;
                totalScore += scoreValue;
                totalItems++;
            }
        }
    });

    // Atualiza os elementos HTML do resumo
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('totalScore').textContent = totalScore.toFixed(1);

    document.getElementById('scoreAutocuidado').textContent = domainScores.Autocuidado.toFixed(1);
    document.getElementById('scoreMotor').textContent = domainScores.Motor.toFixed(1);
    document.getElementById('scoreLinguagem').textContent = domainScores.Linguagem.toFixed(1);
    document.getElementById('scoreCognicao').textContent = domainScores.Cognicao.toFixed(1);
    document.getElementById('scoreSocializacao').textContent = domainScores.Socializacao.toFixed(1);
    }
