import Auth from "../../service/auth.js";

let Nav = {
    render: async () => {
  
        let view = `
            <nav class="container navbar navbar-expand-lg navbar-light bg-light p-3 mb-4">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img class="logo-menu"
                            src="https://assets.website-files.com/5ff79f3ebebf6b12f6b7747f/5ffe04fc6284b7e90070d985_logo-gama-academy.png">
                    </a>
                    ${await Auth.isAuthenticated() ? `<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>` : ``}
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                       ${await Auth.isAuthenticated() ? `<li class="nav-item">
                            <a class="nav-link" href="/#/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/#/dashboard">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="logout">Sair</a>
                        </li>` : ``}
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