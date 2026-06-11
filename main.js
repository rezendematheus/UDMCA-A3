let templateCard = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 border p-4">
            <div class="card">
                <img src="{{thumbnail}}" class="card-img-top" alt="" style="max-height: 100px;">
                <div class="card-body" style="min-height: 160px;">
                    <div class="fw-bold text-truncate" >{{ title }} {{ name.first }} {{ name.last }}</div>
                    <div class="fw-light" style="font-size: 10pt">{{ email }}</div>
                    <p class="text-secondary fs-6">
                        {{ category }}
                    </p>
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="fw-bold fs-6" style="margin-bottom: 0px;">
                            R$ {{ price }}
                        </p>
                        <button href="#" class="btn btn-outline-secondary btn-sm">
                            <iconify-icon icon="lucide:users" class="me-1"></iconify-icon>
                            Favoritar
                        </button>
                    </div>
                </div>
            </div>
        </div>
`

let template = Handlebars.compile(templateCard);

async function lerDados() {
    let response = await fetch('https://dummyjson.com/products?limit=25')
    //console.log("response", response);
    let data = await response.json()
    console.log("data", data)

    let contentHtml = ""
    for (let idx in data.products) {
        let product = data.products[idx]
        console.log(product);
        contentHtml = contentHtml + template(product);
    }
    //console.log(contentHtml);
    let elem = document.getElementById("UsersList")
    //console.log(elem);
    elem.innerHTML = contentHtml
}

async function lerProdutos() {
    let response = await fetch('https://dummyjson.com/products')
    //console.log("response", response);
    let data = await response.json()
    // console.log("products", data)
}

lerDados()
lerProdutos()
