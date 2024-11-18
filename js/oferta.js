window.addEventListener("load", (event) => {
    getOferta();
});

async function getOferta() {
    try {
        const respostaOferta = await fetch("https://t93pg6q8.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27novalinha%27%5D%5B0%5D%7BMensagem%2C+ProdutoNovaLinha+-%3E+%7BNome%2C+Images%5B0%5D%7Basset+-%3E+%7Burl%7D%7D%7D%7D", {
            method: "GET"
        });

        const dadosOferta = await respostaOferta.json();

        montarOferta(dadosOferta.result);
    
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error.message);
    }
}

function montarOferta(data) {
    const offerDiv = document.createElement("div");
    offerDiv.classList.add("offer");

    const smallContainer = document.createElement("div");
    smallContainer.classList.add("small-container");

    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    const col1 = document.createElement("div");
    col1.classList.add("col-2");

    const offerImg = document.createElement("img");
    offerImg.src = data.ProdutoNovaLinha.Images.asset.url;
    offerImg.classList.add("offer-img", "sc-1120");
    col1.appendChild(offerImg);

    const col2 = document.createElement("div");
    col2.classList.add("col-2");

    const novaLinha = document.createElement("p");
    novaLinha.innerText = "Nova linha!";
    col2.appendChild(novaLinha);

    const offerTitle = document.createElement("h1");
    offerTitle.classList.add("sc-420:!text-[27px]");
    offerTitle.innerText = data.ProdutoNovaLinha.Nome;
    col2.appendChild(offerTitle);

    const offerDescription = document.createElement("small");
    offerDescription.innerText = data.Mensagem;
    col2.appendChild(offerDescription);

    const buyButton = document.createElement("a");
    buyButton.classList.add("btn", "cursor-pointer", "hover:!text-[white]");
    buyButton.innerHTML = "Compre Agora! &#8594;";
    buyButton.setAttribute("href", "https://api.whatsapp.com/send/?phone=5545920013524&text=Olá, gostaria de saber mais sobre as velas da linha Oh, Happy Day.&type=phone_number&app_absent=0");
    col2.append(document.createElement("br"), buyButton);

    rowDiv.appendChild(col1);
    rowDiv.appendChild(col2);
    smallContainer.appendChild(rowDiv);
    offerDiv.appendChild(smallContainer);

    document.getElementById("offer-container").appendChild(offerDiv);
}
