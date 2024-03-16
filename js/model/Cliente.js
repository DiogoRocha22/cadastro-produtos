class Produto {
    constructor(obj){
        obj = {}
        this.id = obj.id;
        this.nome = obj.nome
        this.valor = obj.valor
        this.estoqueProduto = obj.estoqueProduto
        this.observacao = obj.observacao
        this.dataCadastro = obj.dataCadastro
    }

    validar(){
        if(!this.nome || !this.valor ){
            return false
        }
    }
}