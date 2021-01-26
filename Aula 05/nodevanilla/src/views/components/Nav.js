let Nav = {
    render: async () => {

        // "Botão sair" a ser adicionado ao menu caso o usuário esteja logado
        let buttonLogout = localStorage.getItem('@token') ? `
                        <li class="nav-item">
                            <a class="nav-link" id="logout">Sair</a>
                        </li>` : '';

        let view = `
            <nav class="container navbar navbar-expand-lg navbar-light bg-light p-3 mb-4">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img class="logo-menu"
                            src="https://assets.website-files.com/5ff79f3ebebf6b12f6b7747f/5ffe04fc6284b7e90070d985_logo-gama-academy.png">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/#/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/#/dashboard">Dashboard</a>
                        </li>
                        <!--li class="nav-item">
                            <a class="nav-link" href="/#/signup">Cadastrar</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/#/Login">Login</a>
                        </li-->
                        ${buttonLogout}
                    </ul>
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