const url = 'http://localhost:3400/produtos'

let listaDeProdutos = [];
let btnAdicionar = document.querySelector('#btn-adicionar');
let tabelaProduto = document.querySelector('table>tbody');
let modalProduto = new bootstrap.Modal(document.getElementById('modal'))

let formInputs = {
    id: document.getElementById('id'),
    nome: document.getElementById('nome'),
    valor: document.getElementById('valor'),
    estoque: document.getElementById('estoque'),
    observacao: document.getElementById('observacao'),
    btnSalvar: document.getElementById('btn-salvar'),
    btnCancelar: document.getElementById('btn-cancelar')
}

function buscarProdutos(){
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': getToken()
        },
    })
    .then(response => response = response.json())
    .then(response => {
        console.log(response)
        listaDeProdutos = response
        preencherTabela(listaDeProdutos)

    }).catch((err) => {
       
        console.log(err)
    })
}

buscarProdutos()

function preencherTabela(produtos){

    tabelaProduto.textContent = ''

    produtos.forEach(produto => {
        let tr = document.createElement('tr')

        let tdId = document.createElement('td')
        let tdNome = document.createElement('td')
        let tdEstoque = document.createElement('td')
        let tdObervacao = document.createElement('td')
        let tdValor = document.createElement('td')
        let tdData = document.createElement('td')
        let tdAcao = document.createElement('td')

        tdId.textContent = produto.id
        tdNome.textContent = produto.nome
        tdEstoque.textContent = produto.quantidadeEstoque
        tdObervacao.textContent = produto.observacao
        tdValor.textContent = `R$ ${produto.valor.toFixed(2)}`
        tdData.textContent = new Date(produto.dataCadastro).toLocaleDateString()
        tdAcao.innerHTML = `<button class="btn btn-outline-primary btn-sm mr-3">
            Editar
        </button>
        <button onclick="excluirProduto(${produto.id})" class="btn btn-outline-primary btn-sm mr-3">
            Excluir
        </button>`

        tr.appendChild(tdId)
        tr.appendChild(tdNome)
        tr.appendChild(tdValor)
        tr.appendChild(tdEstoque)
        tr.appendChild(tdObervacao)
        tr.appendChild(tdData)
        tr.appendChild(tdAcao)

        tabelaProduto.appendChild(tr)
    });
}

formInputs.btnSalvar.addEventListener('click', () => {
    let produto = new Produto({
        id: listaDeProdutos.length+1,
        nome: formInputs.nome.value,
        valor: parseInt(formInputs.valor.value),
        quantidadeEstoque: formInputs.estoque.value,
        observacao: formInputs.observacao.value,
        dataCadastro: new Date().toISOString()
    })
        if(produto.validar()){
            adicionarProduto(produto)
    
            formInputs.id.value = ''
            formInputs.nome = ''
            formInputs.valor = ''
            formInputs.estoque = ''
            formInputs.observacao = ''

            alert(`O produto ${produto.nome} foi adicionado com sucesso`)
        }

        return
    
})

function adicionarProduto(produto){
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(response => response = response.json())
    .then(response => {
        listaDeProdutos.push(response)

        preencherTabela(listaDeProdutos)

        modalProduto.hide()
        alert(`o produto ${response.nome} foi adicionado com sucesso`)
    })
}

function excluirProduto(id){
    let produto = listaDeProdutos.find(produto => produto.id == id)

    if(confirm("Deseja realmente excluir o produto" + produto.nome + "?")){
        fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers : {
                'Authorization': getToken()
            }
        })
        .then(() => {
            let i = listaDeProdutos.findIndex(produto => produto.id == id)

            listaDeProdutos.splice(i, 1)

            preencherTabela(listaDeProdutos)
        })
    }
}