import Auth from "../../service/auth.js";
import baseURL from '../../service/baseURL.js';

const userData = JSON.parse(localStorage.getItem('@userDataAccount'));

let requestDataAccount = async () => {
    let dataAccount = null
    if(userData){

        let {usuario, token} = userData;
        
        await axios
            .get(`${baseURL}lancamentos/planos-conta?login=${usuario.login}`,  {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            .then(res => {
                dataAccount = res.data

            })
            .catch(err => {
                console.log('err', err.response)
            })
    }

    return dataAccount
}


let Dash = {
    render: async () => {
        await Auth.securePage();
        const dataAccount = await requestDataAccount();
        
        let view = ``;

        if(userData){
            let {usuario: user, conta} = userData;
            let userName = user.nome;
            let balance = conta.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  
            view = `
            <div class="container">
                <div class="container d-flex justify-content-between align-items-center">                
                    <div class="col-8 card bg-primary mb-3">
                        <div class="card-body text-white">
                            <p class="card-text">Olá, <strong class="username">${userName}</strong>, seu saldo está em <strong>${balance}</strong>.</p>
                        </div>
                    </div>                 
                    <div class="col-3 card bg-primary mb-3">
                        <button type="button" class="btn btn-success">Realizar transferência</button>
                    </div>         
                </div>

                <div class="container d-flex justify-content-center align-items-center">
                    ${
                        dataAccount.map(data => {
                            return `
                            <div class="col-6 ">
                                <div class="card">
                                    <div class="card-header">${data.descricao}</div>
                                    <div class="card-body">
                                        <h5 class="card-title">Detalhamento</h5>
                                        <p class="card-text"></p>
                                    </div>
                                </div>
                            </div>
                            `
                        })

                    }
                </div>

            </div>
            `
        }

        return view
    },
    after_render: async () => {
    }
}

export default Dash;