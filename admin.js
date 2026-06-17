const usuarioAdmin = "admin";
const senhaAdmin = "prado123";

let produtos =
JSON.parse(
localStorage.getItem("produtos")
) || [];

let produtoEditando = null;

// LOGIN

function login(){

const usuario =
document.getElementById("usuario").value;

const senha =
document.getElementById("senha").value;

if(
usuario === usuarioAdmin &&
senha === senhaAdmin
){

document.getElementById("loginTela")
.style.display = "none";

document.getElementById("painel")
.style.display = "block";

listarProdutos();

}
else{

alert(
"Usuário ou senha inválidos."
);

}

}

// LOGOUT

function logout(){

location.reload();

}

// CADASTRAR / EDITAR

function salvarProduto(){

const nome =
document.getElementById("nome").value;

const categoria =
document.getElementById("categoria").value;

const preco =
document.getElementById("preco").value;

const descricao =
document.getElementById("descricao").value;

const imagem =
document.getElementById("imagem").value;

const destaque =
document.getElementById("destaque").checked;

const promocao =
document.getElementById("promocao").checked;

if(
!nome ||
!preco ||
!descricao ||
!imagem
){

alert("Preencha todos os campos.");

return;

}

if(produtoEditando){

const index =
produtos.findIndex(
produto =>
produto.id === produtoEditando
);

produtos[index] = {

id: produtoEditando,

nome,

categoria,

preco:Number(preco),

descricao,

imagem,

destaque,

promocao

};

alert("Produto atualizado!");

produtoEditando = null;

}
else{

const produto = {

id: Date.now(),

nome,

categoria,

preco:Number(preco),

descricao,

imagem,

destaque,

promocao

};

produtos.push(produto);

alert("Produto cadastrado!");

}

localStorage.setItem(
"produtos",
JSON.stringify(produtos)
);

listarProdutos();

limparFormulario();

}

// LISTAR

function listarProdutos(){

const lista =
document.getElementById("listaProdutos");

lista.innerHTML = "";

produtos.forEach(produto => {

lista.innerHTML += `

<div class="produto-admin">

<img src="${produto.imagem}">

<h4>${produto.nome}</h4>

<p>${produto.descricao}</p>

<p class="preco">
R$ ${produto.preco.toFixed(2)}
</p>

<p>
${produto.destaque ? "⭐ Em Destaque" : ""}
</p>

<p>
${produto.promocao ? "🔥 Promoção" : ""}
</p>

<div class="acoes-produto">

<button
class="btn-editar"
onclick="editarProduto(${produto.id})">

Editar

</button>

<button
class="btn-excluir"
onclick="excluirProduto(${produto.id})">

Excluir

</button>

</div>

</div>

`;

});

}

// EDITAR

function editarProduto(id){

const produto =
produtos.find(
produto =>
produto.id === id
);

if(!produto) return;

produtoEditando = id;

document.getElementById("nome").value =
produto.nome;

document.getElementById("categoria").value =
produto.categoria;

document.getElementById("preco").value =
produto.preco;

document.getElementById("descricao").value =
produto.descricao;

document.getElementById("imagem").value =
produto.imagem;

document.getElementById("destaque").checked =
produto.destaque || false;

document.getElementById("promocao").checked =
produto.promocao || false;

window.scrollTo({
top:0,
behavior:"smooth"
});

}

// EXCLUIR

function excluirProduto(id){

if(
!confirm(
"Deseja excluir este produto?"
)
){

return;

}

produtos =
produtos.filter(
produto =>
produto.id !== id
);

localStorage.setItem(
"produtos",
JSON.stringify(produtos)
);

listarProdutos();

}

// LIMPAR

function limparFormulario(){

document.getElementById("nome").value = "";

document.getElementById("categoria").value = "burger";

document.getElementById("preco").value = "";

document.getElementById("descricao").value = "";

document.getElementById("imagem").value = "";

document.getElementById("destaque").checked = false;

document.getElementById("promocao").checked = false;

}