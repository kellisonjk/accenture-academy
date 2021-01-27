import Auth from "../../service/auth.js";

let Nav = {
    render: async () => {
        const userData = JSON.parse(localStorage.getItem('@userDataAccount'));

        let firstName = userData ? userData.usuario.nome.split(' ')[0] : '<vazio>' ;
        let view = `
            <nav class="container navbar navbar-expand-lg navbar-light bg-light p-3 mb-4">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img class="logo-menu"
                            src="https://assets.website-files.com/5ff79f3ebebf6b12f6b7747f/5ffe04fc6284b7e90070d985_logo-gama-academy.png">
                    </a>
                    ${await Auth.isAuthenticated() ? 
                        `<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav ">
                            <li class="nav-item">
                                <a class="nav-link fw-bold" href="/#/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fw-bold" href="/#/dashboard">Dashboard</a>
                            </li>
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle fw-bold" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Olá, ${firstName}
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="#">Alterar senha</a></li>
                                <li><a class="dropdown-item" id="logout">Sair</a></li>
                            </ul>
                            </li>
                        </ul>` : 
                        ``}
                    </div>
                </div>
            </nav>
        `;
        
        return view
    },
    after_render: async () => { 
        if(document.getElementById('logout'))
            document.getElementById('logout').addEventListener('click', () => {
                localStorage.clear()
                window.location.replace('#/login');
            })
    }

}

export default Nav;