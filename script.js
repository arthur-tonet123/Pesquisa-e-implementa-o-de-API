const input = document.getElementById("cep-input");
const btn = document.getElementById("search-btn");
const resultArea = document.getElementById("result-area");


function renderMessage(text, type) {

    const simbolo = type === "error" ? "✕" : "✎";

    resultArea.innerHTML = `
        <div class="message ${type}">
            <strong>${simbolo}</strong>
            <span>${text}</span>
        </div>
    `;
}


function renderAddress(data) {

    const campos = [
        ["CEP", data.cep],
        ["Rua", data.logradouro],
        ["Bairro", data.bairro],
        [
            "Cidade / UF",
            data.localidade && data.uf
                ? `${data.localidade} - ${data.uf}`
                : ""
        ],
        ["DDD", data.ddd]
    ];


    const linhas = campos.map(([label, valor]) => {

        const possuiValor =
            valor &&
            String(valor).trim().length > 0;


        return `
            <div class="address-line">

                <dt>${label}</dt>

                <dd class="${possuiValor ? "" : "empty"}">
                    ${possuiValor ? valor : "não informado"}
                </dd>

            </div>
        `;

    }).join("");


    resultArea.innerHTML = `
        <dl class="address-card">
            ${linhas}
        </dl>
    `;
}


async function buscarCep() {

    const valor = input.value.trim();

    const cep = valor.replace(/\D/g, "");


    if (cep.length === 0) {

        renderMessage(
            "Digite um CEP para realizar a busca.",
            "info"
        );

        return;
    }


    if (cep.length !== 8) {

        renderMessage(
            "CEP inválido. Digite os 8 números do CEP.",
            "error"
        );

        return;
    }


    btn.disabled = true;

    renderMessage(
        "Buscando endereço...",
        "info"
    );


    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );


        if (!resposta.ok) {

            renderMessage(
                "O serviço não respondeu corretamente. Tente novamente.",
                "error"
            );

            return;
        }


        const dados = await resposta.json();


        if (dados.erro) {

            renderMessage(
                "CEP não encontrado. Confira os números e tente novamente.",
                "error"
            );

            return;
        }


        renderAddress(dados);


    } catch (erro) {

        renderMessage(
            "Não foi possível conectar ao serviço. Verifique sua internet.",
            "error"
        );

    } finally {

        btn.disabled = false;

    }
}




btn.addEventListener("click", buscarCep);




input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        buscarCep();

    }

});




input.addEventListener("input", function() {

    let numeros = input.value
        .replace(/\D/g, "")
        .slice(0, 8);


    if (numeros.length > 5) {

        input.value =
            numeros.substring(0, 5) +
            "-" +
            numeros.substring(5);

    } else {

        input.value = numeros;

    }

});
