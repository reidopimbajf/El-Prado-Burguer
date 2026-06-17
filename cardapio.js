// =============================
// PRODUTOS
// =============================

let produtos =
JSON.parse(
localStorage.getItem("produtos")
) || [

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
}

];

// =============================
// VARIÁVEIS
// =============================

let carrinho = [];
let produtoSelecionado = null;
let quantidade = 1;
let desconto = 0;

// =============================
// CARREGAR PRODUTOS
// =============================

function carregarProdutos(lista){

const container =
document.getElementById("produtos");

container.innerHTML = "";

if(lista.length === 0){

container.innerHTML = `
<div style="
text-align:center;
padding:50px;
grid-column:1/-1;
">

<h2>
Nenhum produto cadastrado
</h2>

<p>
Cadastre produtos no painel Admin.
</p>

</div>
`;

return;

}

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

// =============================
// FILTROS
// =============================

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

// =============================
// ABRIR PRODUTO
// =============================

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

document.getElementById(
"modalProduto"
).style.display =
"flex";

}

// =============================
// QUANTIDADE
// =============================

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

// =============================
// ADICIONAR CARRINHO
// =============================

function adicionarCarrinho(){

let adicionais = [];
let valorExtra = 0;

document
.querySelectorAll(
"#modalProduto input[type='checkbox']:checked"
)
.forEach(item => {

adicionais.push(item.value);

valorExtra += Number(
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

quantidade,

adicionais,

observacao,

preco:
(
produtoSelecionado.preco +
valorExtra
) * quantidade

});

document
.getElementById("modalProduto")
.style.display =
"none";

document
.querySelectorAll(
"#modalProduto input[type='checkbox']"
)
.forEach(item =>
item.checked = false
);

document.getElementById(
"observacao"
).value = "";

atualizarCarrinho();

}

// =============================
// REMOVER ITEM
// =============================

function removerItem(index){

carrinho.splice(index,1);

atualizarCarrinho();

}

// =============================
// ATUALIZAR CARRINHO
// =============================

function atualizarCarrinho(){

const lista =
document.getElementById(
"itensCarrinho"
);

lista.innerHTML = "";

let total = 0;

carrinho.forEach(
(item,index) => {

total += item.preco;

lista.innerHTML += `

<div class="item-carrinho">

<h4>${item.nome}</h4>

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

<button
onclick="removerItem(${index})">

Remover

</button>

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

// =============================
// CARRINHO
// =============================

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

// =============================
// CUPOM
// =============================

function aplicarCupom(){

const cupom =
document
.getElementById("cupom")
.value
.toUpperCase();

if(cupom === "PRADO10"){

desconto = 10;

alert(
"🎉 Cupom aplicado!"
);

}
else{

alert(
"Cupom inválido."
);

}

}

// =============================
// CHECKOUT
// =============================

function abrirCheckout(){

if(carrinho.length === 0){

alert(
"Seu carrinho está vazio."
);

return;

}

let total = 0;

carrinho.forEach(item => {

total += item.preco;

});

if(desconto > 0){

total =
total -
(total * desconto / 100);

}

document.getElementById(
"resumoTotal"
).innerText =
"Total: R$ " +
total.toFixed(2);

document.getElementById(
"checkout"
).style.display =
"flex";

}

// =============================
// WHATSAPP
// =============================

function enviarWhatsApp(){

const nome =
document.getElementById("nome").value;

const telefone =
document.getElementById("telefone").value;

const cep =
document.getElementById("cep").value;

const endereco =
document.getElementById("endereco").value;

const complemento =
document.getElementById("complemento").value;

const pagamento =
document.getElementById("pagamento").value;

const bandeira =
document.getElementById("bandeira").value;

let total = 0;

let mensagem =
"🍔 *EL PRADO BURGUER*%0A%0A";

mensagem +=
"👤 Cliente: " + nome + "%0A";

mensagem +=
"📱 WhatsApp: " + telefone + "%0A";

mensagem +=
"📍 CEP: " + cep + "%0A";

mensagem +=
"🏠 Endereço: " + endereco + "%0A";

mensagem +=
"📌 Complemento: " + complemento + "%0A%0A";

mensagem +=
"💳 Pagamento: " + pagamento + "%0A";

if(
pagamento === "Crédito" ||
pagamento === "Débito"
){

mensagem +=
"🏦 Bandeira: " +
bandeira +
"%0A";

}

mensagem +=
"%0A📦 *PEDIDO*%0A";

carrinho.forEach(item => {

total += item.preco;

mensagem +=

"• " +
item.nome +

" x" +
item.quantidade +

" - R$ " +
item.preco.toFixed(2) +

"%0A";

if(item.adicionais.length){

mensagem +=
"Adicionais: " +
item.adicionais.join(", ") +
"%0A";

}

if(item.observacao){

mensagem +=
"Obs: " +
item.observacao +
"%0A";

}

mensagem += "%0A";

});

if(desconto > 0){

mensagem +=
"🎟 Cupom: PRADO10%0A";

total =
total -
(total * desconto / 100);

}

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

// =============================
// INICIAR
// =============================

carregarProdutos(produtos);

// Atualiza se houver mudança
window.addEventListener(
"storage",
() => {

produtos =
JSON.parse(
localStorage.getItem("produtos")
) || [];

carregarProdutos(produtos);

}
);