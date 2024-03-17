function salvarToken(token){
    localStorage.setItem('token', token)
}

function getToken(){
    return localStorage.getItem("token")
}

function salvarUser(usuario){
    localStorage.setItem('usuario', usuario)
}

function getUsuario(){
   return  localStorage.getItem("usuario")
}

function logout(){
    localStorage.clear
    window.open('login.html', '_self')
}