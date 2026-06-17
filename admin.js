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

alert("Usuário ou senha inválidos.");

}

}

// LOGOUT

function logout(){

location.reload();

}

// SALVAR

function salvarProduto(){

const produto = {

id: Date.now(),

nome:
document.getElementById("nome").value,

categoria:
document.getElementById("categoria").value,

preco:
Number(
document.getElementById("preco").value
),

descricao:
document.getElementById("descricao").value,

imagem:
document.getElementById("imagem").value

};

produtos.push(produto);

localStorage.setItem(
"produtos",
JSON.stringify(produtos)
);

limparFormulario();

listarProdutos();

}

// LISTAR

function listarProdutos(){

const lista =
document.getElementById("listaProdutos");

lista.innerHTML = "";

produtos.forEach(produto => {

lista.innerHTML += `

<div class="produto-admin">

<h3>${produto.nome}</h3>

<p>${produto.descricao}</p>

<p>
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