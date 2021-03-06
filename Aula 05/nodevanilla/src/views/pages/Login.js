import baseURL from '../../service/baseURL.js';
//import logo from '../../images/logo-gama.png'

const form_onchange = () =>{
        let password = document.getElementById('password').value;
        let login = document.getElementById('login').value;

        document.getElementById('error-login').innerHTML = '';

        if(password.length < 6 || login.length < 4){
            document.getElementById('enter-account').setAttribute("disabled","disabled");
            document.getElementById('enter-account').classList.replace("btn-primary", "btn-secondary");
        } else {
            document.getElementById('enter-account').removeAttribute("disabled");
            document.getElementById('enter-account').classList.replace("btn-secondary", "btn-primary");
        }
    }

let Home = {

    render : async () => {
        let view = `
        <div style="padding-top: 15vh">
            <div class="container card shadow rounded login-view">
                <div class="row">
                    <div class="col-md p-3 d-flex flex-column justify-content-center align-content-center logo">
                        <img src="https://jobs.gama.academy/assets/logo-horizontal-56fdf595cd4297fde69d61d5e08e0d40bbae324401df82d2fbfa39250b8c7993.png"
                            alt="logo">
                    </div>
                    <div class="col-md p-3">
                        <div class="mb-3">
                            <label for="login" class="form-label">Usuário</label>
                            <input type="teste" class="form-control" id="login" minlength="4">

                        </div>
                        <label for="password" class="form-label">Senha</label>
                        <div class="mb-3 input-group">
                            <input type="password" class="form-control" id="password" minlength="6">
                            <div class="input-group-text" id="passwordVisibility"><i class="fas fa-eye"></i></i></div>
                        </div>
                        <div class="mb-3 text-center" id="error-login">
                        </div>

                        <div class="mb-3 d-flex justify-content-center">
                            <button class="btn btn-secondary" id="enter-account" disabled>Entrar</button>
                        </div>

                        <div class="mb-3 mt-4 links-login">
                            <div>Não tem cadastro? <a href="/#/signup">Cadastre-se.</a></div>
                            <div>Esqueceu sua senha? <a href="#">Vamos recuperá-la.</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        `

        return view
    },

    after_render: async () => {
        document.getElementById('login').addEventListener('keyup', () => {
            form_onchange()
        }),
        document.getElementById('password').addEventListener('keyup', () => {
            form_onchange()
        }),
        document.getElementById('passwordVisibility').addEventListener('click', () => {
            let password = document.getElementById('password');
            let typePassword = password.getAttribute('type');
            let passwordVisibilityButton = document.getElementById('passwordVisibility');
            
            switch(typePassword){
                case 'text':
                        password.setAttribute('type','password');
                        passwordVisibilityButton.innerHTML = '<i class="fas fa-eye"></i>';
                    break;
                case 'password':
                        password.setAttribute('type','text');
                        passwordVisibilityButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
                    break;
            }
        }),
        document.getElementById('enter-account').addEventListener('click', () => {
            let password = document.getElementById('password').value
            let login = document.getElementById('login').value
            
            if(login.length >= 4 && password.length >= 6){
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
                        res =>{console.log(res.status)
                            if(res.status == 200){
                                window.location.replace("#/dashboard")
                                
                                localStorage.setItem('@token', res.data.token)
                                localStorage.setItem('@userDataAccount', JSON.stringify(res.data))
                            }
                            
                        }
                    ).catch(err => {
                        document.getElementById('error-login').innerHTML = err.response.data.error
                    })
            }
            else{
                alert('Usuário ou senha inválidos, verifique e digite novamente.');
            }
        });        
    }
}

export default Home;