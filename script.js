

(async function() {
    async function fetchJsonData() {
        const url = 'https://raw.githubusercontent.com/Alvarothe/site-tester/refs/heads/main/mensagens.json';
        const response = await fetch(url);
        return await response.json();
    }

    function createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ui-atendimento {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                padding: 15px;
                background-color: rgba(26, 42, 58, 0.9);
                background-image: url('https://i.pinimg.com/originals/1a/a2/00/1aa2008c04d15f46d38b797cb1452ed4.gif');
                background-size: cover;
                background-position: center;
                border: 1px solid #ff8c00;
                border-radius: 8px;
                z-index: 9999;
                width: 300px;
                font-family: Arial, sans-serif;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                color: #fff;
                display: flex;
                flex-direction: column;
                font-size: 15px;
                display: none; /* Initially hidden */
            }
            .ui-atendimento p {
                margin: 5px 0;
                text-align: center;
            }
            .ui-atendimento input[type="text"], .search-input {
                width: 100%;
                padding: 5px;
                margin-bottom: 5px;
                border: 1px solid #ff8c00;
                border-radius: 3px;
                background-color: rgba(0, 0, 0, 0.6);
                color: #ffff;
                box-sizing: border-box;
                font-size: 15px;
            }
            .ui-atendimento input[type="text"]:disabled {
                background-color: #555;
                color: #999;
                cursor: not-allowed;
            }
            .toggle-container {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 5px 0;
            }
            .infoService-container {
                display: flex;
                justify-content: space-between;
                padding: 0 30%;
                align-items: center;
                margin: 5px 0;
            }
            .toggle-label {
                margin: 0 5px;
            }
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 20px;
                margin: 0 5px;
            }
            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #cc0000;
                transition: .4s;
                border-radius: 20px;
            }
            .slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 2px;
                bottom: 2px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            input:checked + .slider {
                background-color: #00cc00;
            }
            input:checked + .slider:before {
                transform: translateX(20px);
            }
            .toggle-label {
                font-weight: bold;
                font-size: 10px;
            }
            .content-wrapper {
                display: flex;
                flex-direction: column;
                margin-top: 10px;
            }
            .message-content {
                background-color: rgba(0, 0, 0, 0.6);
                padding: 5px;
                height: 90px;
                overflow-y: auto;
                border-radius: 3px;
                margin-bottom: 10px;
                font-size: 14px;
                transition: transform 0.5s ease;
            }
            .message-content::-webkit-scrollbar {
                width: 5px;
            }
            .message-content::-webkit-scrollbar-thumb {
                background-color: #ff8c00;
                border-radius: 5px;
            }
            .info-container {
                display: flex;
                flex-direction: column;
            }
            .info-item {
                background-color: rgba(0, 0, 0, 0.6);
                padding: 5px;
                border-radius: 3px;
                margin-bottom: 5px;
            }
            .etiqueta {
                font-weight: bold;
                color: #ff8c00;
                font-size: 10px;
            }
            .dropdown {
                position: relative;
                width: 100%;
            }
            .dropdown-content {
                display: none;
                position: absolute;
                background-color: rgba(0, 0, 0, 0.6);
                width: 100%;
                max-height: 170px;
                overflow-y: auto;
                border: 1px solid #ff8c00;
                border-radius: 3px;
                z-index: 1;
            }
            .dropdown-content::-webkit-scrollbar {
                display: none;
            }
            .dropdown-content div {
                color: #fff;
                padding: 5px 8px;
                text-decoration: none;
                display: block;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s ease, transform 0.3s ease;
            }
            .dropdown-content div:hover {
                background-color:  rgba(230, 126, 34, 0.87);
                transform: scale(1.15);
                text-align: center;
            }
            .show {
                display: block;
            }
            .openButton {
                position: fixed;
                top: 380px;
                right: 10px;
                z-index: 1000;
                cursor: pointer;
                width: 25px;
                height: 50px;
                transition: transform 0.3s ease;
            }
            .openButton.flipped {
                transform: scaleX(-1);
            }
            .finalize-button {
                background-color: #ff8c00;
                color: #fff;
                justify-content: center;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                transition: background-color 0.3s ease;
                margin-top: 10px;
                width: 60%;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }

            .finalize-button:hover {
                background-color: #e67e22;
            }
        `;
        document.head.appendChild(style);
    }

    function createToggleOpenButton() {
        const container = document.createElement('div');
        container.className = 'openButton';

        container.innerHTML = `
            <img src="https://pngmaterial.com/dvsxyz02/uploads/curvy-arrow-png.png" alt="Botão de Seta" style="width: 100%; height: 100%;">
        `;

        // Adicionar evento de clique
        container.onclick = function() {
            const MensagemDoProtocolo = document.querySelector('.ui-atendimento');
            if (MensagemDoProtocolo.style.display === 'none' || MensagemDoProtocolo.style.display === '') {
                MensagemDoProtocolo.style.display = 'flex';
            } else {
                MensagemDoProtocolo.style.display = 'none';
            }
            this.classList.toggle('flipped');
        };

        
        // Adicionar o contêiner ao corpo do documento
        document.body.appendChild(container);
    }

    function createInterface(data) {
        const container = document.createElement('div');
        container.className = 'ui-atendimento';

        container.innerHTML = `
            <p>Fala com o titular?</p>
            <div class="toggle-container">
                <span class="toggle-label">Não</span>
                <label class="toggle-switch">
                    <input type="checkbox" id="titularToggle" checked>
                    <span class="slider"></span>
                </label>
                <span class="toggle-label">Sim</span>
            </div>

            <input type="text" id="nomeDoContato" placeholder="Nome do contato" autocomplete="off" disabled>

            <div class="dropdown">
                <input type="text" class="search-input" placeholder="Pesquisar título...">
                <div class="dropdown-content" id="titleDropdown"></div>
            </div>

            <div class="content-wrapper">
                <div id="MensagemDoProtocolo" class="message-content"></div>
                <div class="info-container">
                    <div class="info-item">
                        <div class="infoService-container">
                            <span>Externo?</span>
                            <span id="externoValue"></span>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="infoService-container">
                            <span>Aguardar?</span>
                            <span id="aguardarValue"></span>
                        </div>
                    </div>
                    <div class="info-item">
                        <p class="etiqueta">Etiqueta: <span id="etiquetaValor"></span></p>
                    </div>
                </div>
                
                <button id="finalizeButton" class="finalize-button">Finalizar Atendimento</button>
            </div>
        `;

        document.body.appendChild(container);

        const nomeDoContato = document.getElementById('nomeDoContato');
        const MensagemDoProtocolo = document.getElementById('MensagemDoProtocolo');
        const titularToggle = document.getElementById('titularToggle');
        const externoValue = document.getElementById('externoValue');
        const aguardarValue = document.getElementById('aguardarValue');
        const etiquetaValor = document.getElementById('etiquetaValor');
        const searchInput = document.querySelector('.search-input');
        const dropdown = document.getElementById('titleDropdown');

        let currentIndex = 0;


        function populateDropdown(filter = '') {
            dropdown.innerHTML = '';
            data.forEach((item, index) => {
                if (item.titulo.toLowerCase().includes(filter.toLowerCase())) {
                    const option = document.createElement('div');
                    option.textContent = item.titulo;
                    option.onclick = () => {
                        searchInput.value = item.titulo;
                        dropdown.classList.remove('show');
                        currentIndex = index;
                        updateMessage();
                    };
                    dropdown.appendChild(option);
                }
            });
        }

        titularToggle.addEventListener('change', () => {
            nomeDoContato.disabled = titularToggle.checked;
            updateMessage();
        });

        nomeDoContato.addEventListener('input', updateMessage);

        searchInput.addEventListener('focus', () => {
            populateDropdown();
            dropdown.classList.add('show');
        });

        searchInput.addEventListener('input', () => {
            populateDropdown(searchInput.value);
            dropdown.classList.add('show');
        });

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        const finalizeButton = document.getElementById('finalizeButton');

        finalizeButton.addEventListener('click', () => {
            const selectedItem = data[currentIndex];

            const atendimentoInfo = {
                etiqueta: selectedItem.etiqueta,
                externo: selectedItem.externo,
                aguardar: selectedItem.aguardar,
                mensagem: MensagemDoProtocolo.innerText,
                etiquetaExterno: selectedItem.etiqueta_externo,
                servicoExterno: selectedItem.servico
            };
            //teste
            searchInput.addEventListener('focus', () => {
                        populateDropdown();
                        dropdown.classList.add('show');
                    });
            // Limpa o campo de pesquisa.
            searchInput.value = '';
            populateDropdown();
            console.log('Informações do atendimento:', atendimentoInfo);
            document.querySelector('.openButton').click();


            
            // Seleciona o elemento textarea pelo seletor
            const textarea = document.querySelector('textarea.text-area');


            // Clica no seletor de etiquetas com a classe 'anticon anticon-plus'
            const seletorEtiqueta = setInterval(() => {
                const adicionarEtiqueta = document.querySelector('.anticon.anticon-plus');
                if (adicionarEtiqueta) { adicionarEtiqueta.click(); clearInterval(seletorEtiqueta); }
            }, 50);

            console.log('testando123')
            //digita a mensagem nos eventos do atendimento
            if (textarea) {
                // Define o valor do textarea para o texto da mensagem
                textarea.value = MensagemDoProtocolo.innerText; 

                // Dispara um evento de input para garantir que a mudança seja registrada
                const eventoInput = new Event('input', { bubbles: true });
                textarea.dispatchEvent(eventoInput);
            }
        });
        // Faz atualização dos input dentro da mensagem e das etiquetas
        function updateMessage() {
            const selectedItem = data[currentIndex];
            externoValue.textContent = selectedItem.externo ? 'Sim' : 'Não';
            aguardarValue.textContent = selectedItem.aguardar ? 'Sim' : 'Não';
            etiquetaValor.textContent = selectedItem.etiqueta;

            let titularMessage = titularToggle.checked ? 'Titular' : nomeDoContato.value.trim();
            MensagemDoProtocolo.innerHTML = `${titularMessage ? titularMessage + ' entrou em contato e ' : ''}${selectedItem.mensagem}`;
        }

        updateMessage();
    }
    createStyles();
    createToggleOpenButton();
    const data = await fetchJsonData();
    createInterface(data);
})();