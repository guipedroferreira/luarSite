window.addEventListener("load", () => {
    getSobreNos();
});

async function getSobreNos() {
    try {
        const respostaSobreNos = await fetch("https://t93pg6q8.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27sobrenos%27%5D%5B0%5D%7BDescricao%2C+Titulo%7D", {
            method: "GET"
        });
        const json = await respostaSobreNos.json();
        montarSobreNos(json.result);
    } catch (error) {
        console.error(error.message);
    }
}

function montarSobreNos(data) {
    const divSobreNos = document.createElement("div");
    divSobreNos.classList.add("section");

    const titulo = document.createElement("h1");
    titulo.innerText = data.Titulo;

    const descricao = document.createElement("p");
    descricao.innerText = data.Descricao;

    divSobreNos.append(titulo, descricao);
    document.getElementById("sobre-nos").append(divSobreNos);
}
