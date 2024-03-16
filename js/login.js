
let campoEmail = window.document.getElementById('email')
let campoSenha = window.document.getElementById('password')
let button = window.document.getElementById('submit')

function autenticar(email, senha){

    const url = `http://localhost:3400/login`

    fetch(
        url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, senha})
        }
    )
    .then(response => response = response.json())
    .then(response =>  {
        console.log(response)
        
        if(response.mensagem){
            alert(response.mensagem)

            return
        }
        alert("Seja bem vinda " + response.usuario.nome)
        window.open('home.html', '_self');

    })
    .catch((err) => {
        console.log("não foi possivel fazer a requisiçao", err)
    })
}



button.addEventListener('click', () => {

    let emailDigitado = campoEmail.value
    let senhaDigitada = campoSenha.value
   
    autenticar(emailDigitado, senhaDigitada)
        
    
})