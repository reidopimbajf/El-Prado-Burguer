// PRODUTOS

const produtos = [

{
    id:1,
    nome:"El Prado Burger",
    categoria:"burger",
    descricao:"180g Angus + Cheddar + Bacon",
    preco:34.90,
    imagem:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
},

{
    id:2,
    nome:"X Bacon Premium",
    categoria:"burger",
    descricao:"Duplo Bacon Artesanal",
    preco:39.90,
    imagem:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=800"
},

{
    id:3,
    nome:"Double Smash",
    categoria:"burger",
    descricao:"2 Smash + Cheddar",
    preco:44.90,
    imagem:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800"
},

{
    id:4,
    nome:"Combo Casal",
    categoria:"combo",
    descricao:"2 Burgers + 2 Batatas + 2 Refrigerantes",
    preco:89.90,
    imagem:"https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800"
},

{
    id:5,
    nome:"Batata Especial",
    categoria:"porcao",
    descricao:"Batata Crocante",
    preco:19.90,
    imagem:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800"
},

{
    id:6,
    nome:"Coca-Cola Lata",
    categoria:"bebida",
    descricao:"350ml",
    preco:6,
    imagem:"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800"
}

];

// CARRINHO

let carrinho = [];

let produtoSelecionado = null;

let quantidade = 1;

// CARREGAR PRODUTOS

function carregarProdutos(lista){

    const container =
    document.getElementById("produtos");

    container.innerHTML = "";

    lista.forEach(produto => {

        container.innerHTML += `

        <div class="produto">

            <img src="${produto.imagem}">

            <div class="produto-info">

                <h3>${produto.nome}</h3>

                <p>${produto.descricao}</p>

                <span>
                R$ ${produto.preco.toFixed(2)}
                </span>

                <button
                onclick="abrirProduto(${produto.id})">

                Adicionar

                </button>

            </div>

        </div>

        `;

    });

}

// FILTRO

function filtrar(categoria){

    if(categoria === "todos"){

        carregarProdutos(produtos);

        return;

    }

    const filtrados =
    produtos.filter(
    produto =>
    produto.categoria === categoria
    );

    carregarProdutos(filtrados);

}

// ABRIR PRODUTO

function abrirProduto(id){

    produtoSelecionado =
    produtos.find(
    produto =>
    produto.id === id
    );

    quantidade = 1;

    document.getElementById(
    "produtoNome"
    ).innerText =
    produtoSelecionado.nome;

    document.getElementById(
    "produtoDescricao"
    ).innerText =
    produtoSelecionado.descricao;

    document.getElementById(
    "produtoPreco"
    ).innerText =
    "R$ " +
    produtoSelecionado.preco.toFixed(2);

    document.getElementById(
    "qtd"
    ).innerText =
    quantidade;

    document
    .getElementById("modalProduto")
    .style.display = "flex";

}

// QUANTIDADE

function alterarQtd(valor){

    quantidade += valor;

    if(quantidade < 1){

        quantidade = 1;

    }

    document.getElementById(
    "qtd"
    ).innerText =
    quantidade;

}

// ADICIONAR CARRINHO

function adicionarCarrinho(){

    let adicionais = [];

    let valorExtra = 0;

    document
    .querySelectorAll(
    "#modalProduto input[type='checkbox']:checked"
    )
    .forEach(item => {

        adicionais.push(
        item.value
        );

        valorExtra +=
        Number(
        item.dataset.preco
        );

    });

    const observacao =
    document.getElementById(
    "observacao"
    ).value;

    carrinho.push({

        nome:
        produtoSelecionado.nome,

        preco:
        (
            produtoSelecionado.preco
            +
            valorExtra
        ) * quantidade,

        quantidade,

        adicionais,

        observacao

    });

    atualizarCarrinho();

    document
    .getElementById("modalProduto")
    .style.display = "none";

}

// ATUALIZAR CARRINHO

function atualizarCarrinho(){

    const lista =
    document.getElementById(
    "itensCarrinho"
    );

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach(item => {

        total += item.preco;

        lista.innerHTML += `

        <div class="item-carrinho">

            <h4>
            ${item.nome}
            </h4>

            <small>
            Qtd: ${item.quantidade}
            </small>

            <small>
            ${item.adicionais.join(", ")}
            </small>

            <small>
            ${item.observacao}
            </small>

            <div class="preco">

            R$ ${item.preco.toFixed(2)}

            </div>

        </div>

        `;

    });

    document.getElementById(
    "contador"
    ).innerText =
    carrinho.length;

    document.getElementById(
    "total"
    ).innerText =
    "Total: R$ " +
    total.toFixed(2);

}

// CARRINHO

function abrirCarrinho(){

    document
    .getElementById("carrinho")
    .classList.add("ativo");

}

function fecharCarrinho(){

    document
    .getElementById("carrinho")
    .classList.remove("ativo");

}

// FINALIZAR

function finalizarPedido(){

    if(carrinho.length === 0){

        alert(
        "Seu carrinho está vazio."
        );

        return;

    }

    let total = 0;

    let mensagem =
    "🍔 *EL PRADO BURGUER*%0A%0A";

    mensagem +=
    "📦 *PEDIDO*%0A";

    carrinho.forEach(item => {

        total += item.preco;

        mensagem +=

        "• " +
        item.nome +

        " | Qtd: " +
        item.quantidade +

        " | R$ " +
        item.preco.toFixed(2) +

        "%0A";

        if(item.adicionais.length){

            mensagem +=
            "Adicionais: " +
            item.adicionais.join(", ")
            + "%0A";

        }

        if(item.observacao){

            mensagem +=
            "Obs: " +
            item.observacao
            + "%0A";

        }

        mensagem += "%0A";

    });

    mensagem +=

    "💰 TOTAL: R$ " +
    total.toFixed(2);

    window.open(
    "https://wa.me/5511975342595?text="
    + mensagem,
    "_blank"
    );

}

// INICIAR

carregarProdutos(produtos);