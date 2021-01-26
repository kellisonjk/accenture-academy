const SecureFunctions = {
    isAuthenticated: async () => {
        return localStorage.getItem('@token');
    },
    securePage: async () => {
        if(!(this.isAuthenticated)){
            window.location.replace('#/login'); 
        }   else{ 
            console.log("Usuário logado")
        } 
    }
}