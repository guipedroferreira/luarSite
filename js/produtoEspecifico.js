window.addEventListener("load", (event) => {
    getProduto();
});

async function getProduto() {

    const parametros = new URLSearchParams(document.location.search);
    const produtoID = parametros.get("id");

    const url = `https://t93pg6q8.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27produto%27+%26%26+_id+%3D%3D+%27${produtoID}%27%5D%5B0%5D%7BNome%2C+Images%5B%5D%7Basset+-%3E+%7Burl%7D%7D%2C+Preco%2C+Quantidade%2C+Descricao%2C+Cores%7D`;
    
    try {

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();

      if(json.result != null) {
        montarProduto(json.result);
      }

    } catch (error) {

      console.error(error.message);

    }

}


function montarProduto(data) {

    imagensDoProduto(data.Images);

    const produtoInfo = document.getElementById("produtoInfo");

    const breadcrumbs = document.createElement("p");
    breadcrumbs.innerText = "Início / Velas";

    const produtoNome = document.createElement("h1");
    produtoNome.innerText = data.Nome;
    produtoNome.setAttribute("id", "nome");

    const produtoPreco = document.createElement("h4");
    produtoPreco.innerText = "R$ " + formatarPreco(data.Preco);

    const produtoCores = document.createElement("select");
    produtoCores.setAttribute("id", "corEscolhida");
    
    for(let i = 0; i < data.Cores.length; i++) {
        const produtoCor = document.createElement("option");
        produtoCor.innerText = data.Cores[i];
        produtoCores.appendChild(produtoCor);
    }

    const produtoQuantidade = document.createElement("input");
    produtoQuantidade.setAttribute("type", "number");
    produtoQuantidade.setAttribute("value", "1");
    produtoQuantidade.setAttribute("min", "1");
    produtoQuantidade.setAttribute("max", data.Quantidade);
    produtoQuantidade.setAttribute("id", "quantidade");

    const botaComprar = document.createElement("button");
    botaComprar.classList.add("btn", "!text-white");
    botaComprar.setAttribute("onclick", "comprar()");
    botaComprar.innerText = "Comprar Agora";

    const produtoDetalhesTitulo = document.createElement("h3");
    produtoDetalhesTitulo.innerText = "Detalhes do Produto";

    const produtoDetalhesTituloIcone = document.createElement("i");
    produtoDetalhesTituloIcone.classList.add("fa", "!text-[#89A992]", "fa-indent");

    produtoDetalhesTitulo.appendChild(produtoDetalhesTituloIcone);

    const produtoDetalhesDescricao = document.createElement("p");
    produtoDetalhesDescricao.classList.add("text-[gray]");
    produtoDetalhesDescricao.innerText = data.Descricao;

    produtoInfo.append(breadcrumbs, produtoNome, produtoPreco, produtoCores, produtoQuantidade, botaComprar, produtoDetalhesTitulo, document.createElement("br"), produtoDetalhesDescricao)

}

function imagensDoProduto(data) {

    const secaoImage = document.getElementById("produtoImagens");

    const imagemPrincipal = document.createElement("img");
    imagemPrincipal.src = data[0].asset.url;
    imagemPrincipal.setAttribute("width", "100%");
    imagemPrincipal.setAttribute("id", "productImg");

    const imagensLista = document.createElement("div");
    imagensLista.classList.add("small-img-row", "mt-[10px]");

    for(let i = 0; i < data.length; i++) {

        const imagemContainer = document.createElement("div");
        imagemContainer.classList.add("small-img-col");

        const imagem = document.createElement("img");
        imagem.src = data[i].asset.url;
        imagem.classList.add("small-img");
        imagem.setAttribute("width", "100%");

        imagem.addEventListener("click", () => { mudarImagem(imagem.src) });

        imagemContainer.appendChild(imagem);
        imagensLista.appendChild(imagemContainer);

    }

    secaoImage.append(imagemPrincipal, imagensLista);

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

function comprar() {

    const cor = document.getElementById("corEscolhida").value;
    const quantidade = document.getElementById("quantidade").value;
    const nome = document.getElementById("nome").innerText;

    location.href = `https://api.whatsapp.com/send/?phone=5545920013524&text=Olá, gostaria de comprar ${quantidade} ${nome} na cor ${cor}.&type=phone_number&app_absent=0`;

}

function mudarImagem(imgSrc) {

    document.getElementById("productImg").src = imgSrc;

}