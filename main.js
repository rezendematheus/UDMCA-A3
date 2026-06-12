let templateCard = `
        <div id="prod-{{id}}" class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 border p-4 produto">
            <div class="card">
                <img src="{{thumbnail}}" class="card-img-top thumbnail" alt="" style="max-height: 100px;">
                <div class="card-body" style="min-height: 160px;">
                    <div class="fw-bold text-truncate titulo" >{{ title }}</div>
                    <div class="fw-light" style="font-size: 10pt">{{ email }}</div>
                    <p class="text-secondary fs-6 categoria">
                        {{ category }}
                    </p>
                    
                    <div class="d-flex justify-content-between align-items-center preco">
                        <p class="fw-bold fs-6" style="margin-bottom: 0px;">
                            R$ {{ price }}
                        </p>
                        <button data-id="{{ id }}" href="#" class="btn btn-sm btn-favoritar {{ classeFavorito }}">
                            <iconify-icon icon="lucide:users" class="me-1"></iconify-icon>
                            {{#if isFavorito}}Favoritado{{else}}Favoritar{{/if}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
`

// Cria o localStorage de favoritos
let template = Handlebars.compile(templateCard);

// Coleta dos dados da API
async function lerProdutos() {
    let elem = document.getElementById("ProductsList")
    let contentHtml = ""
    const favoritadosNoStorage = JSON.parse(localStorage.getItem('favoritos')) || [];
    try {
        let response = await fetch('https://dummyjson.com/products?limit=25')
        let data = await response.json()
        produtos = data.products;
    } catch (error) {
        produtos = favoritadosNoStorage;
    }
    for (let idx in produtos) {
        let product = produtos[idx]
        let achouFavorito = false;
        for (let f = 0; f < favoritadosNoStorage.length; f++) {
            if (String(favoritadosNoStorage[f].id) === String(product.id)) {
                achouFavorito = true;
                break; 
            }
        }

        if (achouFavorito) {
            product.classeFavorito = "favoritado btn-secondary";
        } else {
            product.classeFavorito = "btn-outline-secondary";
        }

        // console.log(product);
        contentHtml = contentHtml + template(product);
    }
    //console.log(contentHtml);
    //console.log(elem);
    elem.innerHTML = contentHtml
}

lerProdutos()

// Filtragem de produtos 

const inputBusca = document.getElementById("search-input")
console.log(inputBusca)
inputBusca.addEventListener('input', (event) => {
    let listaProdutos = document.querySelectorAll(".produto")
    const inputUser = event.target.value.toLocaleLowerCase().trim();
    
    listaProdutos.forEach(produto => {
        const textoProduto = produto.textContent.toLocaleLowerCase();
        
        if (!textoProduto.includes(inputUser)){
            produto.classList.add('collapse');
        } else {
            produto.classList.remove('collapse');
        }
    })

    console.log(listaProdutos);
});


///// Favoritar produtos

const favoritos = []

function guardaFavorito(dadosDoProduto) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    favoritos.push(dadosDoProduto)
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
}

function removeFavorito(dadosDoProduto) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    favoritos = favoritos.filter(favorito => {
        return favorito.id !== dadosDoProduto.id
    })
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
}

function encontraProdutoPorId( idDoProduto ) {
    const produto = document.getElementById("prod-"+idDoProduto)

    const thumbnailProduto =  produto.querySelector(".thumbnail").src;
    const tituloProduto = produto.querySelector(".titulo").textContent;
    const precoProduto = produto.querySelector(".preco").textContent;
    const categoryProduto = produto.querySelector(".categoria").textContent;

    const dadosDoProduto = {
        id: idDoProduto,
        thumbnail: thumbnailProduto,
        title: tituloProduto,
        price: precoProduto,
        category: categoryProduto
    }

    return dadosDoProduto
}


document.getElementById("ProductsList").addEventListener('click', (event) => {

    const botao = event.target.closest('.btn-favoritar');
    if (!botao) return;
    
    event.preventDefault();
    const idDoProduto  = botao.dataset.id;
    const dadosDoProduto = encontraProdutoPorId( idDoProduto )
    if(botao.classList.contains('favoritado')){
        botao.classList.remove('favoritado');
        botao.classList.remove('btn-secondary');
        botao.classList.add('btn-outline-secondary');
        removeFavorito( dadosDoProduto )
    } else {
        botao.classList.add('favoritado');
        botao.classList.remove('btn-outline-secondary');
        botao.classList.add('btn-secondary');
        guardaFavorito( dadosDoProduto )
    }

    console.log(localStorage.getItem('favoritos'))
})



// Criação de uma função que usa o localStorage para os produtos favoritados



