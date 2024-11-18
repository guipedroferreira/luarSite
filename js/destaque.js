window.addEventListener("load", (event) => {
    getDestaque();
});

async function getDestaque() {
    try {
        const resposta = await fetch("https://t93pg6q8.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27produto%27+%26%26+_id+%3D%3D+%2729eb8145-90b5-43a6-a2ff-ea7d30fba0b0%27%5D%5B0%5D%7BImages%5B%5D%7Basset+-%3E+%7Burl%7D%7D%2C+Nome%7D", {
            method: "GET"
        });

        const json = await resposta.json();
        montarDestaque(json.result);
    } catch (error) {
        console.error(error.message);
    }
}

function montarDestaque(json) {
    const divDestaque = document.getElementById("destaque");

    const imagens = document.createElement("div");
    imagens.classList.add("flex", "gap-[15px]", "justify-between", "sc-820:w-[100%]", "sc-820:flex-col");

    json.Images.forEach((imgData, index) => {
        const imageContainer = document.createElement("div");
        imageContainer.className = "col-3";

        const image = document.createElement("img");
        image.src = imgData.asset.url;
        image.classList.add("rounded-[2px]", "shadow-default");
        
        image.style.aspectRatio = "9/10";
        image.style.objectFit = "cover";

        imageContainer.append(image);

        if(index == 0) {

            const caption = document.createElement("p");
            caption.className = "text-center text-[gray] mt-[5px]";
            caption.style.textAlign = "start";
            caption.innerText = json.Nome;

            imageContainer.append(caption);

        }
        
        imagens.append(imageContainer);
    });

    divDestaque.append(imagens);
}
