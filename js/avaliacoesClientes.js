window.addEventListener("load", (event) => {
    getAvaliacoes();
});

async function getAvaliacoes() {

    try {

        const respostaAvaliacacao = await fetch("https://t93pg6q8.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27avaliacao%27%5D%7BNome%2C+Descricao%2C+PerfilFoto%7Basset+-%3E+%7Burl%7D%7D%2C+Avaliacao%7D", {
            method: "GET"
        });

        const json = await respostaAvaliacacao.json();

        for (let i = 0; i < json.result.length; i++) {

            montarAvaliacao(json.result[i]);

        }


    } catch (error) {
        console.error(error.message);
    }

}

function montarAvaliacao(json) {

    const divUsuario = document.createElement("div");
    divUsuario.classList.add('col-3');

    const iconeAspas = document.createElement("i");
    iconeAspas.classList.add("fa", "!text-[#ffb9b9]", "fa-quote-left");

    const descricaoUsuario = document.createElement("p");
    descricaoUsuario.innerText = json.Descricao;

    const divRating = document.createElement("div");
    divRating.classList.add("rating");

    for(let i = 0; i < 5; i++) {

        const rating = document.createElement("i");
        rating.classList.add("fa", "!text-[#89A992]", "fa-star");
        divRating.append(rating);

    }

    const perfilFoto = document.createElement("img");
    perfilFoto.classList.add("sc-380:!hidden");
    perfilFoto.src = json.PerfilFoto.asset.url;

    const nome = document.createElement("h3");
    nome.innerText = json.Nome;

    divUsuario.append(iconeAspas, descricaoUsuario, divRating, perfilFoto, nome);

    document.getElementById('reviews').append(divUsuario);

}