let carrinho = [];
let total = 0;

function adicionar(produto, valor){

carrinho.push(produto);

total += valor;

atualizar();
}

function atualizar(){

const lista =
document.getElementById("lista");

lista.innerHTML="";

carrinho.forEach(item=>{

lista.innerHTML += `<li>${item}</li>`;

});

document.getElementById("total")
.innerHTML =
`Total: R$ ${total.toFixed(2)}`;
}

function enviarWhatsapp(){

const nome =
document.getElementById("nome").value;

const endereco =
document.getElementById("endereco").value;

const pagamento =
document.getElementById("pagamento").value;

let mensagem =
`🍔 *PEDIDO EL PRADO BURGUER*%0A%0A`;

mensagem +=
`👤 Cliente: ${nome}%0A`;

mensagem +=
`📍 Endereço: ${endereco}%0A%0A`;

mensagem +=
`📦 Itens:%0A`;

carrinho.forEach(item=>{

mensagem += `- ${item}%0A`;

});

mensagem +=
`%0A💰 Total: R$ ${total.toFixed(2)}`;

mensagem +=
`%0A💳 Pagamento: ${pagamento}`;

window.open(
`https://wa.me/5511975342595?text=${mensagem}`
);

}
