window.addEventListener("load", () => {
    getOQueFazemos();
});

async function getOQueFazemos() {
    try {
        const respostaOQueFazemos = await fetch("https://t93pg6q8.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27oquefazemos%27%5D%5B0%5D%7BDescricao%2C+Titulo%7D", {
            method: "GET"
        });
        const json = await respostaOQueFazemos.json();
        montarOQueFazemos(json.result);
    } catch (error) {
        console.error(error.message);
    }
}

function montarOQueFazemos(data) {
    const divOQueFazemos = document.createElement("div");
    divOQueFazemos.classList.add("section");

    const titulo = document.createElement("h1");
    titulo.innerText = data.Titulo;

    const descricao = document.createElement("p");
    descricao.innerText = data.Descricao;

    divOQueFazemos.append(titulo, descricao);
    document.getElementById("o-que-fazemos").append(divOQueFazemos);
}
