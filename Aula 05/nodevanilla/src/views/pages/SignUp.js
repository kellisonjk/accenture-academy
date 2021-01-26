import baseURL from '../../service/baseURL.js';

window.postRegisterNewUser = async () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application-/json'
        },
    }

    try{
        const registerData = {  
            name: document.getElementById('name').value,
            password: document.getElementById('password').value,
            cpf: document.getElementById('cpf').value,
            login: document.getElementById('login').value
        }

        const response = await fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify(registerData)
        })
        


        const json = response.json()
        console.log("JSON", json);
        return json

    } catch(err){
        console.log('Ocorreu um erro: ', err)
    }
}

let SignUp = {
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
                    <form>
                            <div class="mb-3">
                                <label for="login" class="form-label">Login</label>
                                <input type="text" class="form-control" id="login">
                            </div>
                            <div class="mb-3">
                                <label for="name" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="name">
                            </div>
                            <div class="mb-3">
                                <label for="cpf" class="form-label">CPF</label>
                                <input type="text" class="form-control" id="cpf">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Senha</label>
                                <input type="password" class="form-control" id="password">
                            </div>
                            <div class="mb-3">
                                <label for="confirm-password" class="form-label">Confirme a senha</label>
                                <input type="password" class="form-control" id="confirm-password">
                            </div>

                            <div class="mb-3 d-flex justify-content-between">
                                <button class="btn btn-danger" id="cancel">Cancelar</button>
                                <button class="btn btn-primary" id="submit-form">Salvar cadastro</button>
                            </div>
                    </form>

                    </div>
                </div>
            </div>
        </div>
        `

        return view
    },
    after_render: async () => {
        document.getElementById('cancel').addEventListener('click', () => {
            window.location.replace('#/login')
        }),
        document.getElementById('submit-form').addEventListener('click', () => {
            let name = document.getElementById('name').value
            let password = document.getElementById('password').value
            let confirmPassword = document.getElementById('confirm-password').value
            let cpf = document.getElementById('cpf').value
            let login = document.getElementById('login').value
            
            if(password === confirmPassword){
                console.log('Validação concluída');

                axios
                    .post(`${baseURL}usuarios`, {
                        cpf, login, nome: name, senha: password
                    }, {
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                    .then(
                        res =>{

                            if ( res.status === 200 ){
                                window.location.replace('#/login')
                            }

                            /*console.log(res.data);
                            
                            localStorage.setItem('@token', res.data.token)
                            sessionStorage.setItem('@token', res.data.token)
                            Cookies.set('@token',res.data.token, {expires: 1})*/
                        }
                    )
            }
            else{
                alert('Senhas não conferem, verifique se digitou corretamente.');
            }
        });
    }
}

export default SignUp;