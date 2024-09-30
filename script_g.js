    // Função para verificar se o texto está presente
    function checkTextAndChangeColor() {
        const searchText = "ryanalbuquerquedasilvawebphone";
        const additionalTexts = ["descanso", "disponível"];
        const bodyText = document.body.innerText.toLowerCase() || '';

        const foundSearchText = bodyText.includes(searchText.toLowerCase());
        const foundAdditionalText = additionalTexts.some(text => bodyText.includes(text.toLowerCase()));

        if (foundSearchText && foundAdditionalText) {
            // Muda a cor de fundo de todos os elementos para rosa
            document.body.style.backgroundColor = 'pink';
            document.querySelectorAll('*').forEach(element => {
                element.style.backgroundColor = 'pink';
            });
        } else if (foundSearchText && !foundAdditionalText) {
            // Restaura as cores originais se apenas o nome for encontrado
            document.body.style.backgroundColor = '';
            document.querySelectorAll('*').forEach(element => {
                element.style.backgroundColor = '';
            });
        } else {
            // Restaura as cores originais se nenhuma condição for atendida
            document.body.style.backgroundColor = '';
            document.querySelectorAll('*').forEach(element => {
                element.style.backgroundColor = '';
            });
        }
    }

    // Verifica a cada 5 segundos
    setInterval(checkTextAndChangeColor, 5000);
    
// Função para verificar se um texto é um CPF válido
function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) {
        rest = 0;
    }
    if (rest !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) {
        rest = 0;
    }
    if (rest !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

// Função para verificar se um texto é um protocolo válido
function isValidProtocol(protocol) {
    return /^\d{16}$/.test(protocol.replace(/^#/, ''));
}

// Função para buscar o último CPF válido e copiar para a área de transferência
function findLastCPFAndCopy() {
    const bodyText = document.body.innerText;

    const cpfPattern = /(\d{3}[.\s-]?\d{3}[.\s-]?\d{3}[.\s-]?\d{2})|(\d{11})/g;
    const foundCPFs = bodyText.match(cpfPattern);

    if (foundCPFs) {
        const lastCPF = foundCPFs.map(cpf => cpf.replace(/\s|-|\./g, '')).filter(isValidCPF).pop();
        if (lastCPF) {
            copyToClipboard(lastCPF);
            showAlert("Último CPF encontrado e copiado: " + lastCPF);
        } else {
            showAlert("Nenhum CPF válido encontrado.");
        }
    } else {
        showAlert("Nenhum CPF encontrado.");
    }
}

// Função para buscar o último protocolo visível na tela
function findLastVisibleProtocolAndCopy() {
    const bodyText = document.body.innerText;

    const protocolPattern = /#?\b\d{16}\b/g;
    const foundProtocols = bodyText.match(protocolPattern);

    if (foundProtocols) {
        const validProtocols = foundProtocols.map(protocol => protocol.replace(/^#/, '')).filter(isValidProtocol);
        const lastProtocol = validProtocols.pop();

        if (lastProtocol) {
            copyToClipboard(lastProtocol);
            showAlert("Último protocolo encontrado e copiado: " + lastProtocol);
        } else {
            showAlert("Nenhum protocolo válido encontrado.");
        }
    } else {
        showAlert("Nenhum protocolo encontrado.");
    }
}

// Função para copiar texto para a área de transferência
function copyToClipboard(text) {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
}

// Função para mostrar um alerta customizado
function showAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.style.position = "fixed";
    alertBox.style.top = "50%";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translate(-50%, -50%)";
    alertBox.style.backgroundColor = "#fff";
    alertBox.style.padding = "20px";
    alertBox.style.border = "1px solid #000";
    alertBox.style.borderRadius = "5px";
    alertBox.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
    alertBox.style.zIndex = "10000";
    alertBox.innerText = message;

    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// Evento para detectar a tecla pressionada
document.addEventListener('keydown', function(event) {
    if (event.key === "F1") {
        event.preventDefault();
        findLastCPFAndCopy();
    } else if (event.key === "F3") {
        event.preventDefault();
        findLastVisibleProtocolAndCopy();
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'F2') {
        let elements = document.querySelectorAll('p.participant-name');
        let copiedText = '';

        elements.forEach(element => {
            let text = element.innerText.trim();
            if (text) {
                copiedText += text + '\n'; // Adiciona o texto de cada <p> com a classe participant-name em uma nova linha
            }
        });

        if (copiedText) {
            navigator.clipboard.writeText(copiedText).then(() => {
                console.log('Texto copiado:', copiedText);

                // Faz cada <p> com a classe participant-name piscar em verde
                elements.forEach(element => {
                    element.style.transition = 'background-color 0.5s';
                    element.style.backgroundColor = 'limegreen';

                    // Remove o efeito após um curto período de tempo
                    setTimeout(() => {
                        element.style.backgroundColor = '';
                    }, 500);
                });
            }).catch(err => {
                console.error('Erro ao copiar o texto:', err);
            });
        } else {
            console.error('Nenhum texto encontrado nos elementos <p> com a classe participant-name');
        }
    }
});

//---
// Função para atualizar os estilos com base no tempo e na presença do elemento específico
function updateInteractionStyles() {
    const spans = document.querySelectorAll('.time-elapsed span');

    spans.forEach(span => {
        const text = span.textContent.trim();
        let minutes = null;

        // Verifica se o span contém "agora"
        if (text.includes('agora')) {
            minutes = 0;
        } else {
            const match = text.match(/(\d+)\s*min/);
            if (match) {
                minutes = parseInt(match[1], 10);
            }
        }

        const interactionWrapper = span.closest('.interaction-group-wrapper');
        const hasLastMessageSpan = interactionWrapper.querySelector('.status-icon.alert-state.last-message-was-customer.alert-state-abbreviated');
        const hasSpecificMessage = interactionWrapper.querySelector('.int-sup-main')?.textContent.includes('Olá, você deseja dar continuidade em nosso atendimento?');

        if (interactionWrapper) {
            // Remove as animações anteriores
            interactionWrapper.style.animation = '';

            // Se o elemento contém o span específico, pisca em amarelo
            if (hasLastMessageSpan) {
                interactionWrapper.style.animation = "blink-yellow 1s infinite";
            }
            // Se a mensagem específica está presente, ignore a animação até 10 minutos e aplique animação roxa para 10 minutos ou mais
            else if (hasSpecificMessage) {
                if (minutes >= 5) {
                    interactionWrapper.style.animation = "blink-purple 1s infinite";
                }
            }
            // Cancela a animação para "agora", "1 min", "2 min", "3 min", "4 min"
            else if (minutes >= 0 && minutes < 5) {
                interactionWrapper.style.animation = ''; // Não aplica nenhuma animação
            }
            // Inicia a animação em vermelho para "5 min" até "9 min"
            else if (minutes >= 5 && minutes < 10) {
                interactionWrapper.style.animation = "blink-red 1s infinite";
            }
            // Inicia a animação roxa para "10 min" ou mais
            else if (minutes >= 10) {
                interactionWrapper.style.animation = "blink-purple 1s infinite";
            }
        }
    });
}

// Define as animações de piscar em vermelho, roxo e amarelo
const style = document.createElement('style');
style.textContent = `
@keyframes blink-red {
    0% { background-color: transparent; }
    50% { background-color: rgba(255, 0, 0, 0.3); }
    100% { background-color: transparent; }
}

@keyframes blink-purple {
    0% { background-color: transparent; }
    50% { background-color: rgba(157, 0, 200, 0.3); }
    100% { background-color: transparent; }
}

@keyframes blink-yellow {
    0% { background-color: transparent; }
    50% { background-color: rgba(255, 255, 0, 0.3); }
    100% { background-color: transparent; }
}
`;
document.head.appendChild(style);

// Executa a função de atualização de estilos
updateInteractionStyles();

// Configura para verificar e atualizar a cada minuto (60000 ms)
setInterval(updateInteractionStyles, 6000);
setTimeout(() => {
   console.log('teste_require') 
}, 2000);
