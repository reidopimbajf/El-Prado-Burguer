let carrinho = [];

// Adicionar produto
function adicionarProduto(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

}

// Atualizar carrinho
function atualizarCarrinho() {

    const lista =
        document.getElementById("listaCarrinho");

    const contador =
        document.getElementById("contador");

    const totalTexto =
        document.getElementById("valorTotal");

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {

        total += item.preco;

        lista.innerHTML += `
        <div class="item-carrinho">

            <span>${item.nome}</span>

            <div>

                R$ ${item.preco.toFixed(2)}

                <button
                onclick="removerProduto(${index})"
                style="
                background:none;
                border:none;
                color:red;
                cursor:pointer;
                margin-left:10px;
                ">
                ✕
                </button>

            </div>

        </div>
        `;

    });

    contador.innerText =
        carrinho.length;

    totalTexto.innerHTML =
        `Total: R$ ${total.toFixed(2)}`;

}

// Remover produto
function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}

// Abrir carrinho
function abrirCarrinho() {

    document
        .getElementById("carrinho")
        .classList.add("ativo");

}

// Fechar carrinho
function fecharCarrinho() {

    document
        .getElementById("carrinho")
        .classList.remove("ativo");

}

// Abrir checkout
function abrirCheckout() {

    if(carrinho.length === 0){

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }

    document
        .getElementById("checkout")
        .style.display = "flex";

}

// Enviar pedido
function enviarPedido() {

    const nome =
        document.getElementById("nome").value;

    const telefone =
        document.getElementById("telefone").value;

    const endereco =
        document.getElementById("endereco").value;

    const pagamento =
        document.getElementById("pagamento").value;

    if(nome.trim() === ""){

        alert("Informe seu nome.");

        return;

    }

    if(telefone.trim() === ""){

        alert("Informe seu WhatsApp.");

        return;

    }

    if(endereco.trim() === ""){

        alert("Informe o endereço.");

        return;

    }

    let total = 0;

    let mensagem =
        "🍔 *EL PRADO BURGUER*%0A%0A";

    mensagem +=
        "👤 Cliente: " +
        nome +
        "%0A";

    mensagem +=
        "📱 WhatsApp: " +
        telefone +
        "%0A";

    mensagem +=
        "📍 Endereço: " +
        endereco +
        "%0A";

    mensagem +=
        "💳 Pagamento: " +
        pagamento +
        "%0A%0A";

    mensagem +=
        "📦 *PEDIDO*%0A";

    carrinho.forEach(item => {

        total += item.preco;

        mensagem +=
            "• " +
            item.nome +
            " - R$ " +
            item.preco.toFixed(2) +
            "%0A";

    });

    mensagem +=
        "%0A💰 *TOTAL: R$ " +
        total.toFixed(2) +
        "*";

    window.open(
        "https://wa.me/5511975342595?text=" +
        mensagem,
        "_blank"
    );

}