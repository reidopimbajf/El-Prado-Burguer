// =========================
// HOME EL PRADO BURGUER
// =========================

let produtos =
JSON.parse(
localStorage.getItem("produtos")
) || [];

function carregarDestaques(){

    const container =
    document.getElementById(
        "produtosDestaque"
    );

    if(!container) return;

    container.innerHTML = "";

    if(produtos.length === 0){

        container.innerHTML = `

        <div class="produto">

            <h3>
            Nenhum produto cadastrado
            </h3>

            <p>
            Utilize o painel Admin.
            </p>

        </div>

        `;

        return;

    }

    produtos
    .slice(0,3)
    .forEach(produto => {

        container.innerHTML += `

        <div class="produto">

            <img src="${produto.imagem}">

            <h3>
            ${produto.nome}
            </h3>

            <p>
            ${produto.descricao}
            </p>

            <span>
            R$ ${produto.preco.toFixed(2)}
            </span>

            <a
            href="cardapio.html">

            Ver Produto

            </a>

        </div>

        `;

    });

}

carregarDestaques();