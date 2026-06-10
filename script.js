let carrinho = [];
let total = 0;

// Adicionar produto ao carrinho
function adicionar(produto, valor) {

    carrinho.push({
        nome: produto,
        preco: valor
    });

    total += valor;

    atualizarCarrinho();
}

// Atualizar carrinho na tela
function atualizarCarrinho() {

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    carrinho.forEach((item, index) => {

        lista.innerHTML += `
            <li>
                ${item.nome} - R$ ${item.preco.toFixed(2)}
                <button onclick="remover(${index})">
                    ❌
                </button>
            </li>
        `;

    });

    document.getElementById("total").innerHTML =
        `Total: R$ ${total.toFixed(2)}`;
}

// Remover item
function remover(index) {

    total -= carrinho[index].preco;

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

// Trocar categoria
function mostrarCategoria(categoria) {

    const categorias =
        document.querySelectorAll(".categoria");

    categorias.forEach(secao => {

        secao.classList.remove("ativa");

    });

    document
        .getElementById(categoria)
        .classList.add("ativa");
}

// Enviar pedido para WhatsApp
function enviarWhatsapp() {

    const nome =
        document.getElementById("nome").value;

    const endereco =
        document.getElementById("endereco").value;

    const pagamento =
        document.getElementById("pagamento").value;

    if (nome.trim() === "") {

        alert("Informe seu nome.");

        return;
    }

    if (endereco.trim() === "") {

        alert("Informe seu endereço.");

        return;
    }

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;
    }

    let mensagem =
        `🍔 *EL PRADO BURGUER*%0A%0A`;

    mensagem +=
        `👤 Cliente: ${nome}%0A`;

    mensagem +=
        `📍 Endereço: ${endereco}%0A`;

    mensagem +=
        `💳 Pagamento: ${pagamento}%0A%0A`;

    mensagem +=
        `📦 *ITENS DO PEDIDO*%0A`;

    carrinho.forEach(item => {

        mensagem +=
            `• ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;

    });

    mensagem +=
        `%0A💰 *TOTAL: R$ ${total.toFixed(2)}*`;

    window.open(
        `https://wa.me/5511975342595?text=${mensagem}`,
        "_blank"
    );
}

// Abrir categoria padrão ao carregar
document.addEventListener("DOMContentLoaded", () => {

    mostrarCategoria("lanches");

});