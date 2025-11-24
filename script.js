const cardContainer = document.querySelector("#card-container");
const campoBusca = document.querySelector("header div input");
let dados = [];

// Carrega os dados uma vez quando a página é aberta
window.onload = async () => {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        cardContainer.innerHTML = "<p>Não foi possível carregar os dados, tente novamente mais tarde.</p>";
    }
};

function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();

    if (!termoBusca) {
        cardContainer.innerHTML = "";
        return;
    }

    const resultados = dados.filter(item =>
        item.nome.toLowerCase().includes(termoBusca) ||
        item.descricao.toLowerCase().includes(termoBusca) ||
        item.categoria.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = "";

    if (dados.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    for (let dado of dados) {
        let article = document.createElement("article");
        article.style.animationDelay = `${dados.indexOf(dado) * 0.05}s`;
        article.classList.add("card");

        const imagem = dado.imagem
            ? `<img src="${dado.imagem}" alt="imagem de ${dado.nome}" class="card-imagem">` 
            : '';

        article.innerHTML = `
            <h2>${dado.nome}</h2>${imagem}
            <p><strong>Categoria:</strong> ${dado.categoria}</p>
            ${dado.tempo_recomendado ? `<p><strong>Tempo Recomendado:</strong> ${dado.tempo_recomendado}</p>` : ''}
            <p>${dado.descricao}</p>
            ${dado.link ? `<a href="${dado.link}" target="_blank" class="saiba-mais">Assita aqui</a>` : ''}
        `;
        cardContainer.appendChild(article);
    }
}

function limparBusca() {
    campoBusca.value = "";
    cardContainer.innerHTML = "";
}
