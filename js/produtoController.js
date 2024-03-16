const url = 'http://localhost:3400/produtos'

let listaDeProdutos = [];
let btnAdicionar = document.querySelector('#btn-adicionar');
let tabelaProduto = document.querySelector('table>tbody');
let modalProduto = new bootstrap.Modal(document.getElementById('modal-produto'));

let formInputs = {
    id: document.getElementById('id'),
    nome: document.getElementById('nome'),
    valor: document.getElementById('valor'),
    estoque: document.getElementById('estoque'),
    observacao: document.getElementById('observacao'),
    dataCadastro: document.getElementById('dataCadastro'),
    btnSalvar: document.getElementById('btn-salvar'),
    btnCancelar: document.getElementById('btn-cancelar')
}

function buscarProdutos(){
    fetch(url, {
        method: 'GET',
        headers: {
            authorization: obterToken()
        }
    })
}