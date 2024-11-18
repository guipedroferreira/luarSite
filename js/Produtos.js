window.addEventListener("load", () => {
    getprodutos();
});

async function getprodutos() {
    try {
        const respostaprodutos = await fetch("https://t93pg6q8.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27produto%27%5D%7BPreco%2C+Images%5B0%5D%7Basset+-%3E+%7Burl%7D%7D%2C+Nome%2C+_id%7D", {
            method: "GET"
        });
        const json = await respostaprodutos.json();

        for(let i = 0; i < json.result.length; i++){
            montarprodutos(json.result[i]);
        }
    } catch (error) {
        console.error(error.message);
    }
}

function montarprodutos(data) {
    const divprodutos = document.createElement("div");
    divprodutos.classList.add("col-4");
    
    const linkprodutos = document.createElement("a");
    linkprodutos.href = `produto.html?id=${data._id}`;

    const imagens = document.createElement("img");
    imagens.classList.add("shadow-default");
    imagens.src = data.Images.asset.url;
    imagens.style.aspectRatio = "1/1";
    imagens.style.objectFit = "cover";
    linkprodutos.appendChild(imagens);
    
    const titulo = document.createElement("h4");
    titulo.innerText = data.Nome;
    titulo.classList.add("mt-[10px]");

    const preco = document.createElement("p");
    preco.innerText = "R$ " + formatarPreco(data.Preco);

    const button = document.createElement("a");
    button.innerText = "Entar em contato";
    button.classList.add("bg-[#89A992]", "rounded-[50px]", "btn", "mt-[10px]", "text-[white]");
    button.href = `https://api.whatsapp.com/send/?phone=5545920013524&text=Olá, gostaria de saber mais sobre a ${data.Nome}.&type=phone_number&app_absent=0`;
    divprodutos.append(linkprodutos, titulo, preco, button);

    document.getElementById("velas").appendChild(divprodutos);
}


function formatarPreco(precoOriginal) {

    let precoEmTexto = precoOriginal.toString();
    let decimal = precoEmTexto.match(/(?<=\.)\d+/g);

    if(decimal) {

      if(Number(decimal) < 10) {
  
        return (precoEmTexto + '0').replace(/\./g, ',');
  
      } else {
  
        return precoEmTexto.replace(/\./g, ',');
  
      }
  
    } else {

      return precoEmTexto + ',00';

    }

}