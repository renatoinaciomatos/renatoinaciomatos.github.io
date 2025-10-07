document.addEventListener('DOMContentLoaded', () => {
    // Definindo as constantes de estado
    const STATES =; // Ordem requerida: Sim -> Às Vezes -> Não
    const STATE_CLASSES = {
        "SIM": "state-sim",
        "AV": "state-av",
        "NA": "state-na"
    };

    // Inicializa todos os botões no estado SIM e calcula o resumo inicial
    document.querySelectorAll('.state-button').forEach(button => {
        // Assegura que o texto e a classe inicial correspondam ao atributo data-state
        const initialState = button.getAttribute('data-state');
        button.textContent = initialState;
        button.classList.add(STATE_CLASSES);
    });

    updateSummary();
});

/**
 * Função principal para alternar o estado do botão (Sim -> AV -> Não -> Sim).
 * @param {HTMLElement} button - O elemento TD clicado.
 */
function toggleState(button) {
    const currentState = button.getAttribute('data-state');
    const STATES =;
    
    // Calcula o índice do próximo estado na sequência (ciclo)
    let currentIndex = STATES.indexOf(currentState);
    let nextIndex = (currentIndex + 1) % STATES.length;
    let nextState = STATES[nextIndex];
    
    // Atualiza o estado no DOM
    button.setAttribute('data-state', nextState);
    button.textContent = nextState;
    
    // Remove todas as classes de estado e adiciona a próxima
    button.classList.remove('state-sim', 'state-av', 'state-na');
    
    const STATE_CLASSES = {
        "SIM": "state-sim",
        "AV": "state-av",
        "NA": "state-na"
    };
    button.classList.add(STATE_CLASSES);

    // Recalcula e atualiza o resumo
    updateSummary();
}

/**
 * Recalcula a contagem de Sim, AV e Não e atualiza o resumo.
 */
function updateSummary() {
    const table = document.getElementById('assessmentTable');
    if (!table) return;

    let simCount = 0;
    let avCount = 0;
    let naCount = 0;
    let totalSkills = 0;

    // Itera sobre todas as linhas do corpo da tabela
    table.querySelectorAll('tbody tr').forEach(row => {
        const button = row.querySelector('.state-button');
        if (button) {
            const state = button.getAttribute('data-state');
            totalSkills++;

            if (state === "SIM") {
                simCount++;
            } else if (state === "AV") {
                avCount++;
            } else if (state === "NA") {
                naCount++;
            }
        }
    });

    // Atualiza os elementos HTML do resumo
    document.getElementById('totalSkills').textContent = totalSkills;
    document.getElementById('simCount').textContent = simCount;
    
    // Os contadores AV e NA são cruciais para o PEI
    document.getElementById('avCount').textContent = avCount; // Habilidades que precisam de generalização
    document.getElementById('naCount').textContent = naCount; // Habilidades a adquirir (Novas metas)
}
