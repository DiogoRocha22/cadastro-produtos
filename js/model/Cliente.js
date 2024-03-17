class Produto {
    constructor(obj){
        obj = obj || {}
        this.id = obj.id;
        this.nome = obj.nome
        this.valor = parseInt(obj.valor)
        this.quantidadeEstoque = obj.quantidadeEstoque
        this.observacao = obj.observacao
        this.dataCadastro = obj.dataCadastro
    }

    validar(){
        if(this.nome && this.valor ){
            return true
        }
    }
}