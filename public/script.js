const data = {
    produtos: [
        { id: 1, 
          nome: "Pizza Margherita", 
          preco: 48.00, 
          categoria: "Italiana", 
          imagem: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400", 
          descricao: "Molho de tomate artesanal, muçarela de búfala fresca, manjericão e azeite de oliva.", 
          emEstoque: true
        },
        { id: 2, 
          nome: "Sushis Variados (16 un)", 
          preco: 75.00, 
          categoria: "Japonesa", 
          imagem: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400", 
          descricao: "Combinado do chef com salmão fresco, atum, uramakis, hossomakis e niguiris.", 
          emEstoque: true 
        },
        { id: 3, 
          nome: "Hambúrguer Artesanal BBQ", 
          preco: 39.90, 
          categoria: "Burgers", 
          imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", 
          descricao: "Blend bovino de 180g, queijo cheddar derretido, bacon crocante e molho barbecue caseiro.", 
          emEstoque: true 
        },
        { id: 4, 
          nome: "Tacos de Carne Asada", 
          preco: 34.00, 
          categoria: "Mexicana", 
          imagem: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400", 
          descricao: "Três tortillas de milho recheadas com fraldinha grelhada, cebola, coentro e guacamole fresca.", 
          emEstoque: true 
        },
        { id: 5, 
          nome: "Ramen de Porco Shoyu", 
          preco: 58.00, 
          categoria: "Japonesa", 
          imagem: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400", 
          descricao: "Caldo aromático de shoyu, macarrão artesanal, barriga de porco (chashu), ovo marinado e algas.", 
          emEstoque: false 
        }, 
        { id: 6, 
          nome: "Batata Frita com Cheddar", 
          preco: 28.00, 
          categoria: "Burgers", 
          imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400", 
          descricao: "Porção generosa de batatas rústicas fritas com cobertura cremosa de cheddar e farofa de bacon.", 
          emEstoque: true 
        },    
    ]
};

const productList = document.getElementById("product-list");         
const productDetails = document.getElementById("product-details");   
const searchInput = document.querySelector("#search");               
const categorySelect = document.querySelector("#category");         

function formatPrice(preco) {
    return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(prato) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", prato.id);
    card.style.border = "1px solid #efebe9";
    card.innerHTML = `
        <img src="${prato.imagem}" alt="${prato.nome}">
        <div class="card-category">${prato.categoria}</div>
        <div class="card-title">${prato.nome}</div>
        <div class="card-price">${formatPrice(prato.preco)}</div>
        <div class="card-buttons">
            <button class="btn-details">Ver detalhes</button>
            <button class="btn-highlight">⭐ Favoritar</button>
        </div>
    `;
    const btnDetails = card.querySelector(".btn-details");
    const btnHighlight = card.querySelector(".btn-highlight");

    btnDetails.addEventListener("click", () => {
        showProductDetails(prato);
    });
    btnHighlight.addEventListener("click", () => {
        card.classList.toggle("highlight");
    });
    return card;
}

function renderProducts(listaDePratos) {
    productList.innerHTML = ""; 

    listaDePratos.forEach(prato => {
        const cardPrato = createProductCard(prato);
        productList.appendChild(cardPrato);
    });
    auditRenderedCards();
}

function renderCategories() {
    const categorias = ["Todas"];
    data.produtos.forEach(prato => {
        if (!categorias.includes(prato.categoria)) {
            categorias.push(prato.categoria);
        }
    });
    categorySelect.innerHTML = "";
    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}
function showProductDetails(prato) {
    const statusDisponivel = prato.emEstoque ? "Disponível para pedido rápido" : "Esgotado por hoje";
    const statusCor = prato.emEstoque ? "color: #2e7d32;" : "color: #c62828;";

    productDetails.innerHTML = `
        <div class="details-active">
            <h3>${prato.nome}</h3>
            <span class="card-category">Culinária ${prato.categoria}</span>
            <img src="${prato.imagem}" alt="${prato.nome}">
            <p><strong>Ingredientes & Descrição:</strong><br>${prato.descricao}</p>
            <br>
            <p><strong>Preço individual:</strong> <span class="card-price">${formatPrice(prato.preco)}</span></p>
            <p><strong>Disponibilidade:</strong> <span style="${statusCor} font-weight: bold;">${statusDisponivel}</span></p>
        </div>
    `;
}
function filterProducts() {
    const termoBusca = searchInput.value.toLowerCase();
    const categoriaSelecionada = categorySelect.value;
    const pratosFiltrados = data.produtos.filter(prato => {
        const bateTexto = prato.nome.toLowerCase().includes(termoBusca) || prato.descricao.toLowerCase().includes(termoBusca);
        const bateCategoria = categoriaSelecionada === "Todas" || prato.categoria === categoriaSelecionada;
        return bateTexto && bateCategoria;
    });

    renderProducts(pratosFiltrados);
}

function auditRenderedCards() {
    const todosOsCards = document.querySelectorAll(".card"); 
    console.log(`[DOM Audit] Atualmente existem ${todosOsCards.length} pratos renderizados na página.`);
    todosOsCards.forEach(card => {
        const idPrato = card.getAttribute("data-id");
        console.log(`-> Card ID: ${idPrato} carregado com sucesso.`);
    });
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);

document.getElementById("btnRender").addEventListener("click", () => {
    searchInput.value = "";
    categorySelect.value = "Todas";
    renderProducts(data.produtos);
});

renderCategories();
renderProducts(data.produtos);


  
