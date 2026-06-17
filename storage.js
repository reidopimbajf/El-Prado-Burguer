// =========================
// STORAGE EL PRADO BURGUER
// =========================

// Salvar carrinho
function salvarCarrinho(carrinho) {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}

// Carregar carrinho
function carregarCarrinhoStorage() {

    return JSON.parse(
        localStorage.getItem("carrinho")
    ) || [];

}

// Limpar carrinho
function limparCarrinhoStorage() {

    localStorage.removeItem(
        "carrinho"
    );

}

// Salvar cupom
function salvarCupom(cupom) {

    localStorage.setItem(
        "cupom",
        cupom
    );

}

// Carregar cupom
function carregarCupom() {

    return localStorage.getItem(
        "cupom"
    ) || "";

}

// Salvar dados cliente
function salvarCliente(cliente) {

    localStorage.setItem(
        "cliente",
        JSON.stringify(cliente)
    );

}

// Carregar dados cliente
function carregarCliente() {

    return JSON.parse(
        localStorage.getItem(
            "cliente"
        )
    ) || {};

}