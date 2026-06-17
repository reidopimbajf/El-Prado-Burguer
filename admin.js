const usuarioAdmin = "admin";
const senhaAdmin = "prado123";

let produtos =
JSON.parse(
localStorage.getItem("produtos")
) || [];

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

// CADASTRAR

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

if(
!nome ||
!preco ||
!descricao ||
!imagem
){

alert(
"Preencha todos os campos."
);

return;

}

const produto = {

id: Date.now(),

nome,

categoria,

preco:Number(preco),

descricao,

imagem

};

produtos.push(produto);

localStorage.setItem(
"produtos",
JSON.stringify(produtos)
);

listarProdutos();

limparFormulario();

alert(
"Produto cadastrado!"
);

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

<button
onclick="excluirProduto(${produto.id})">

Excluir

</button>

</div>

`;

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

document.getElementById("preco").value = "";

document.getElementById("descricao").value = "";

document.getElementById("imagem").value = "";

}