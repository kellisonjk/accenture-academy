const Utils = { 
    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    },

    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // Check if the user is logged on
    isAuthenticated: async (route = 'login') => {
        if(!localStorage.getItem('@token')){
            window.location.replace(`#/${route}`); 
        }   else{ 
            console.log("Usuário logado")
        } 
    }
}

export default Utils;