// =========================
// HOME EL PRADO BURGUER
// =========================

function adicionarHome(
    nome,
    preco
){

    let carrinho =
    JSON.parse(
        localStorage.getItem("carrinho")
    ) || [];

    carrinho.push({

        nome: nome,

        quantidade: 1,

        adicionais: [],

        observacao: "",

        preco: preco

    });

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarContador();

    alert(
        "✅ Produto adicionado ao carrinho!"
    );

}

function atualizarContador(){

    const contador =
    document.getElementById(
        "contadorHome"
    );

    if(!contador) return;

    let carrinho =
    JSON.parse(
        localStorage.getItem("carrinho")
    ) || [];

    contador.innerText =
    carrinho.length;

}

atualizarContador();