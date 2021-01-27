
const Auth = {
    isAuthenticated: async () => { 
        return localStorage.getItem('@token')
    },
    securePage: async () => {
        if(!localStorage.getItem('@token')){
            window.location.replace('#/login'); 
        } 
    }
}

export default Auth;