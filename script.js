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
.cart-floating{

    position:fixed;

    bottom:20px;

    right:20px;

    background:#D4AF37;

    color:black;

    padding:15px 25px;

    border-radius:50px;

    font-weight:700;

    cursor:pointer;

    z-index:1000;

    box-shadow:0 5px 15px rgba(0,0,0,.3);

}

.cart-sidebar{

    position:fixed;

    right:-450px;

    top:0;

    width:400px;

    height:100%;

    background:#121212;

    transition:.4s;

    z-index:2000;

    display:flex;

    flex-direction:column;

}

.cart-sidebar.active{

    right:0;

}

.cart-header{

    display:flex;

    justify-content:space-between;

    align-items:center;

    padding:20px;

    border-bottom:1px solid #333;

}

.cart-header button{

    background:none;

    border:none;

    color:white;

    font-size:24px;

}

#cart-items{

    flex:1;

    overflow:auto;

    padding:20px;

}

.cart-item{

    display:flex;

    justify-content:space-between;

    margin-bottom:15px;

}

.cart-footer{

    padding:20px;

    border-top:1px solid #333;

}

.checkout-btn{

    width:100%;

    padding:15px;

    background:#25D366;

    border:none;

    border-radius:10px;

    color:white;

    font-weight:700;

}

.checkout-modal{

    position:fixed;

    inset:0;

    background:rgba(0,0,0,.8);

    display:none;

    justify-content:center;

    align-items:center;

    z-index:3000;

}

.checkout-content{

    background:#1b1b1b;

    padding:30px;

    width:90%;

    max-width:500px;

    border-radius:20px;

}

.checkout-content h2{

    margin-bottom:20px;

}

.checkout-content input,
.checkout-content select{

    width:100%;

    padding:15px;

    margin-bottom:15px;

    border:none;

    border-radius:10px;

}

.checkout-content button{

    width:100%;

    padding:15px;

    border:none;

    border-radius:10px;

    margin-top:10px;

}

.close-btn{

    background:#555;

    color:white;

}