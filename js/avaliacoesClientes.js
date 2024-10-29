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