window.addEventListener("load", (event) => {
    getDestaque();
});

async function getDestaque() {

    try {

        const resposta = await fetch("https://t93pg6q8.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27produto%27+%26%26+_id+%3D%3D+%2729eb8145-90b5-43a6-a2ff-ea7d30fba0b0%27%5D%5B0%5D%7BImages%5B%5D%7Basset+-%3E+%7Burl%7D%7D%2C+Nome%7D", {
            method: "GET"
        });

        const json = await resposta.json();

        console.log(json);
        montarDestaque(json.result)


    } catch (error) {
        console.error(error.message);
    }

}

function montarDestaque(json) {

    const divDestaque = document.getElementById("destaque");

    const imagens = document.createElement("div");
    
    for(let i = 0; i < json.Images.length; i++) {
        const image = document.createElement("img");
        image.src = json.Images[i].asset.url;
        image.classList.add("rounded-[2px]", "outra")
        imagens.append(image);
    }

    divDestaque.append(imagens);

}