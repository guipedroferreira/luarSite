function switch_menu() {
    let dropdown_menu = document.getElementById("drop-down")
    if (dropdown_menu) {
        if (dropdown_menu.classList.contains("opacity-[0]")) {
            dropdown_menu.classList.remove("opacity-[0]")
        } else {
            dropdown_menu.classList.add("opacity-[0]")
        }
    }

}

function link(link) {
    window.location.href = link
}

function getBuy(link, e) {
    console.log(link, e)
    let doc = document.getElementById(e)
    if (doc) {
        window.location.href = link.replace("$quantidade", doc.value)
    }
}

const URL = "";

window.addEventListener("load", async function () {

    const wrapper = document.querySelector("div.valores");

    const result = await fetch(URL, {
        method: "GET",
    });

    const data = await result.json();

    for (let i = 0; i < data.result.lenght; i++) {
        const elemento = montarItem(data.result[i]);
        wrapper.append(elemento);
    }

});

function montarItem(data) {

    const h3 = document.createElement("h3");
    h3.innerText = data.Titulo;

    const hr = document.createElement("hr");

    const p = document.createElement("p");
    p.innerText = data.Descricao;

    const div = document.createElement("div");
    div.classList.add("valor");
    div.append(h3, hr, p);

    return div;

}


getAvaliacoes();

async function getAvaliacoes() {

try {

    const respostaAvaliacacao = await fetch("https://t93pg6q8.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27avaliacao%27%5D%7BNome%2C+Descricao%2C+PerfilFoto%7Basset+-%3E+%7Burl%7D%7D%2C+Avaliacao%7D", {
        method: "GET"
    });

    const json = await respostaAvaliacacao.json();

    for(let i = 0; i < json.result.length; i++) {

        montarAvaliacao(json.result[i]);

    }
    

} catch {
}

}

function montarAvaliacao(json) {

    const divUsuario = document.createElement("div");
    divUsuario.classList.add('col-3');

    const iconeAspas = document.createElement("i");
    iconeAspas.classList.add("fa", "!text-[#ffb9b9]", "fa-quote-left");

    const descricaoUsuario = document.createElement("p");
    descricaoUsuario.innerText = json.Descricao;

    const rating1 = document.createElement("i");
    rating1.classList.add("fa", "!text-[#89A992]", "fa-star");

    const rating2 = document.createElement("i");
    rating2.classList.add("fa", "!text-[#89A992]", "fa-star");

    const rating3 = document.createElement("i");
    rating3.classList.add("fa", "!text-[#89A992]", "fa-star");

    const rating4 = document.createElement("i");
    rating4.classList.add("fa", "!text-[#89A992]", "fa-star");

    const rating5 = document.createElement("i");
    rating5.classList.add("fa", "!text-[#89A992]", "fa-star");

    const divRating = document.createElement("div");
    divRating.classList.add("rating");

    divRating.append(rating1, rating2, rating3, rating4, rating5);

    const perfilFoto = document.createElement("img");
    perfilFoto.classList.add("sc-380:!hidden");
    perfilFoto.src = json.PerfilFoto.asset.url;

    const nome = document.createElement("h3");
    nome.innerText = json.Nome;

    divUsuario.append(iconeAspas, descricaoUsuario, divRating, perfilFoto, nome);

    document.getElementById('reviews').append(divUsuario);

    



}