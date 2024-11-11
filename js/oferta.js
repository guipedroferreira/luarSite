window.addEventListener("load", (event) => {
    getOferta();
});

async function getOferta() {
    try {
        const respostaOferta = await fetch("https://t93pg6q8.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27novalinha%27%5D%5B0%5D%7BMensagem%2C+ProdutoNova+Linha+-%3E+%7BNome%2C+Imagens%5B0%5D%7Basset+-%3E+%7Burl%7D%7D%7D%7D", {
            method: "GET"
        });

        const dadosOferta = await respostaOferta.json();

        if (dadosOferta.result.length > 0) {
            const ofertaData = dadosOferta.result[0];
            montarOferta(ofertaData);
        } else {
            console.error("Nenhuma oferta encontrada.");
        }
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error.message);
    }
}

function montarOferta(oferta) {
    const offerDiv = document.createElement("div");
    offerDiv.classList.add("offer");

    const smallContainer = document.createElement("div");
    smallContainer.classList.add("small-container");

    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    const col1 = document.createElement("div");
    col1.classList.add("col-2");

    const offerImg = document.createElement("img");
    offerImg.src = oferta.ProdutoNova.Linha[0].Imagens[0].asset.url;
    offerImg.classList.add("offer-img", "sc-1120");
    col1.appendChild(offerImg);

    const col2 = document.createElement("div");
    col2.classList.add("col-2");

    const novaLinha = document.createElement("p");
    novaLinha.innerText = "Nova linha!";
    col2.appendChild(novaLinha);

    const offerTitle = document.createElement("h1");
    offerTitle.classList.add("sc-420:!text-[27px]");
    offerTitle.innerText = oferta.ProdutoNova.Linha[0].Nome;
    col2.appendChild(offerTitle);

    const offerDescription = document.createElement("small");
    offerDescription.innerText = oferta.Mensagem;
    col2.appendChild(offerDescription);

    const buyButton = document.createElement("a");
    buyButton.classList.add("btn", "cursor-pointer", "hover:!text-[white]");
    buyButton.innerHTML = "Compre Agora! &#8594;";
    buyButton.setAttribute("href", "https://api.whatsapp.com/send/?phone=5545920013524&text=Olá, gostaria de saber mais sobre as velas da linha Oh, Happy Day.&type=phone_number&app_absent=0");
    col2.appendChild(buyButton);

    rowDiv.appendChild(col1);
    rowDiv.appendChild(col2);
    smallContainer.appendChild(rowDiv);
    offerDiv.appendChild(smallContainer);

    document.getElementById("offer-container").appendChild(offerDiv);
}
