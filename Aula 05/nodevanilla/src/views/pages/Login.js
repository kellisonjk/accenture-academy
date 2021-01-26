import baseURL from '../../service/baseURL.js';

let Home = {

    render : async () => {
        let view = `
        <div class="row justify-content-center align-items-center flex-wrap">
            <div class="col-md-5 d-flex flex-column align-items-center">
                <h3 class="card w-100 text-center p-2">Bem vindo à</h3>
                <img src="https://jobs.gama.academy/assets/logo-horizontal-56fdf595cd4297fde69d61d5e08e0d40bbae324401df82d2fbfa39250b8c7993.png"
                    alt="logo" class="logo">
            </div>
            <div class="col-md-4">
                <div class="card shadow rounded">
                    <div class="card-body">
                            <div class="mb-3">
                                <label for="login" class="form-label">Usuário</label>
                                <input type="teste" class="form-control" id="login" minlength="4">

                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Senha</label>
                                <input type="password" class="form-control" id="password" minlength="4">
                            </div>

                            <div class="mb-3 d-flex justify-content-center">
                                <button class="btn btn-primary" id="enter-account">Entrar</button>
                            </div>

                            <div class="mb-3 text-center mt-4">
                                <a href="/#/signup">Não tem cadastro? Clique aqui.</a>
                            </div>

                    </div>
                </div>
            </div>
        </div>

        `

        return view
    },
    form_onchange: () =>{
        let password = document.getElementById('password').value;
        let login = document.getElementById('login').value;
        if(password.length >= 4 && login.length >= 4){
            document.getElementById('enter-account').setAttribute("disabled","disabled");;
        } else {
            document.getElementById('enter-account').removeAttribute("disabled");
        }
    },
    after_render: async () => {
        document.getElementById('enter-account').addEventListener('click', () => {
            let password = document.getElementById('password').value
            let login = document.getElementById('login').value
            
            if(login.length >= 4 && password.length >= 4){
                console.log('Validação concluída');

                axios
                    .post(`${baseURL}login`, {
                        usuario: login, senha: password
                    }, {
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                    .then(
                        res =>{
                            window.location.replace("#/dashboard")
                            
                            localStorage.setItem('@token', res.data.token)
                            localStorage.setItem('@userDataAccount', JSON.stringify(res.data))
                            
                        }
                    )
            }
            else{
                alert('Usuário ou senha inválidos, verifique e digite novamente.');
            }
        });        
    }
}

export default Home;