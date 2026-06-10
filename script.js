let carrinho = [];
let total = 0;
function adicionar(nome, preco){
carrinho.push(nome);
total += preco;
atualizar();
}
function atualizar(){
let lista = document.getElementById("lista");
lista.innerHTML = "";
carrinho.forEach(item => {
lista.innerHTML += `<li>${item}</li>`;
});
document.getElementById("total")
.innerHTML =
`Total: R$ ${total.toFixed(2)}`;
}
function enviarWhatsapp(){
let mensagem =
"🍔 PEDIDO EL PRADO%0A%0A";
carrinho.forEach(item => {
mensagem += item + "%0A";
});
mensagem += `%0A💰 Total: R$ ${total.toFixed(2)}`;
window.open(
`https://wa.me/5511999999999?text=${mensagem}`
);
}
