async function clickElement(selector, text) {
    const element = Array.from(document.querySelectorAll(selector))
        .find(el => el.textContent.trim().toLowerCase() === text.toLowerCase());
    if (element) {
        element.click();
        console.log(`Clicado: ${text}`);
        return true;
    }
    return false;
}

async function TentarNovamenteExterno(selector, text, proxElemento = null) {
    let tentativas = 0;
    while (true) {
        tentativas++;
        console.log(`Tentativa ${tentativas}: ${text}`);

        if (await clickElement(selector, text)) {
            if (proxElemento) {
                await new Promise(resolve => setTimeout(resolve, 200));
                if (await clickElement(...proxElemento)) break;
                continue;
            }
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}
const tipoReparo = 'Reparo físico'
const tipoProblema = 'Suspeita de LOS'

async function encaminharExterno() {
    const passos = [
        ['.icon-label', 'Enviar'],
        ['.ant-select-selection__placeholder', 'Pesquisar...'],
        ['.ant-select-dropdown-menu-item', 'Suporte Externo'],
        ['.ant-select-selection__placeholder', 'Selecione os problemas'],
        ['.ant-select-selection__rendered .ant-select-selection__placeholder', 'Selecione um serviço', 
        ['.ant-select-dropdown-menu-item', tipoReparo]],
        ['span.ng-star-inserted', 'Continuar']
    ];

    function itemExists(passos, searchText) {
        return passos.some(item => item[1].toLowerCase() === searchText.toLowerCase());
    }
    
    // Exemplo de uso
    const found = itemExists(passos, tipoReparo);
    console.log(found); // true
    
    for (const passo of passos) {
        await TentarNovamenteExterno(...passo);
        
        // Após selecionar os problemas, inserir "pon piscando"
        if (passo[1] === 'Selecione os problemas') {
            // Seleciona o campo de input dentro da div com a classe específica
            let inputInserirProblema = document.querySelector('.ant-select-search__field');

            // Verifica se o campo foi encontrado
            if (inputInserirProblema) {
                // Insere o texto "pon piscando" no campo
                inputInserirProblema.value = tipoProblema;
                
                // Dispara o evento 'input' para simular uma digitação real e acionar os ouvintes de eventos associados
                let inserirProblema = new Event('input', { bubbles: true });
                inputInserirProblema.dispatchEvent(inserirProblema);

                // Espera um pouco antes de clicar no elemento "pon piscando"
                await new Promise(resolve => setTimeout(resolve, 200));

                // Clica no elemento "pon piscando", insensível a maiúsculas/minúsculas
                await clickElement('.ant-select-dropdown-menu-item', tipoProblema);
            } else {
                console.log('Campo de input não encontrado');
            }
        }
    }
}

encaminharExterno();
