let carrinho = [];
let produtoAtual = null;

const TAXA_ENTREGA = 5.00;

// ABRIR MODAL DE ADICIONAIS
function adicionarProduto(nome, preco) {

    produtoAtual = {
        nome,
        preco
    };

    document.getElementById("modalAdicionais").style.display = "flex";
}

// CONFIRMAR PRODUTO
function confirmarProduto() {

    let adicionais = [];
    let valorExtras = 0;

    document
        .querySelectorAll("#modalAdicionais input[type='checkbox']")
        .forEach(item => {

            if (item.checked) {

                adicionais.push(item.value);

                valorExtras += parseFloat(
                    item.dataset.preco
                );
            }
        });

    const observacao =
        document.getElementById(
            "observacaoProduto"
        ).value;

    carrinho.push({

        nome: produtoAtual.nome,

        preco: produtoAtual.preco + valorExtras,

        adicionais,

        observacao,

        quantidade: 1

    });

    limparModal();

    atualizarCarrinho();
}

// LIMPAR MODAL
function limparModal() {

    document
        .querySelectorAll(
            "#modalAdicionais input[type='checkbox']"
        )
        .forEach(item => {

            item.checked = false;

        });

    document.getElementById(
        "observacaoProduto"
    ).value = "";

    document.getElementById(
        "modalAdicionais"
    ).style.display = "none";
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {

    const lista =
        document.getElementById(
            "listaCarrinho"
        );

    const contador =
        document.getElementById(
            "contador"
        );

    const totalTexto =
        document.getElementById(
            "valorTotal"
        );

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {

        const subtotal =
            item.preco *
            item.quantidade;

        total += subtotal;

        let adicionaisHtml = "";

        if (
            item.adicionais &&
            item.adicionais.length > 0
        ) {

            adicionaisHtml =
                `<small>➕ ${item.adicionais.join(", ")}</small><br>`;
        }

        let observacaoHtml = "";

        if (item.observacao) {

            observacaoHtml =
                `<small>📝 ${item.observacao}</small><br>`;
        }

        lista.innerHTML += `

        <div class="item-carrinho">

            <div>

                <strong>${item.nome}</strong><br>

                ${adicionaisHtml}

                ${observacaoHtml}

                <small>
                    Quantidade:
                    <button onclick="diminuirQuantidade(${index})">➖</button>
                    ${item.quantidade}
                    <button onclick="aumentarQuantidade(${index})">➕</button>
                </small>

            </div>

            <div>

                R$ ${subtotal.toFixed(2)}

                <button
                    onclick="removerProduto(${index})"
                    style="
                        background:none;
                        border:none;
                        color:red;
                        cursor:pointer;
                        margin-left:10px;
                    ">
                    ✖
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

// AUMENTAR
function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();
}

// DIMINUIR
function diminuirQuantidade(index) {

    if (
        carrinho[index].quantidade > 1
    ) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);
    }

    atualizarCarrinho();
}

// REMOVER
function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

// ABRIR CARRINHO
function abrirCarrinho() {

    document
        .getElementById("carrinho")
        .classList.add("ativo");
}

// FECHAR CARRINHO
function fecharCarrinho() {

    document
        .getElementById("carrinho")
        .classList.remove("ativo");
}

// ABRIR CHECKOUT
function abrirCheckout() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;
    }

    document
        .getElementById("checkout")
        .style.display = "flex";
}

// ENVIAR PEDIDO
function enviarPedido() {

    const nome =
        document.getElementById("nome").value;

    const telefone =
        document.getElementById("telefone").value;

    const endereco =
        document.getElementById("endereco").value;

    const pagamento =
        document.getElementById("pagamento").value;

    if (!nome || !telefone) {

        alert(
            "Preencha nome e WhatsApp."
        );

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
        "📦 *PEDIDO*%0A%0A";

    carrinho.forEach(item => {

        const subtotal =
            item.preco *
            item.quantidade;

        total += subtotal;

        mensagem +=
            `🍔 ${item.nome} x${item.quantidade}%0A`;

        if (
            item.adicionais &&
            item.adicionais.length > 0
        ) {

            mensagem +=
                `➕ ${item.adicionais.join(", ")}%0A`;
        }

        if (item.observacao) {

            mensagem +=
                `📝 ${item.observacao}%0A`;
        }

        mensagem +=
            `💰 R$ ${subtotal.toFixed(2)}%0A%0A`;
    });

    mensagem +=
        `💵 *TOTAL: R$ ${total.toFixed(2)}*`;

    window.open(
        "https://wa.me/5511975342595?text=" +
        mensagem,
        "_blank"
    );
}