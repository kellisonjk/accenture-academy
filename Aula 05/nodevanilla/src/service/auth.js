
const Auth = {
    isAuthenticated: async () => { console.log('ii')
        return localStorage.getItem('@token')
    },
    securePage: async () => {
        console.log("LL")
        if(!localStorage.getItem('@token')){
            window.location.replace('#/login'); 
        } else{ 
            console.log("Usuário logado")
        } 
    }
}

export default Auth;