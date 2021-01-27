import Auth from "../../service/auth.js";
import baseURL from '../../service/baseURL.js';

const userData = JSON.parse(localStorage.getItem('@userDataAccount'));

const requestDataAccount = async () => {
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
                console.log("O")
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    return dataAccount
}

const doBalanceTransfer = async (transferData) => {
    if(userData){

        let {usuario, token} = userData;
        
        axios
            .post(`${baseURL}lancamentos`, {
                    ...transferData
                }, 
                {
                    headers: {
                        'Content-type': 'application/json',
                        "Authorization": token
                    }
                })
            .then(res => {
               console.log('Res', res)

            })
            .catch(err => {
                console.log('err', err.response)
            })
    }

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
                <div class="w-100 card bg-primary mb-3">
                    <div class="card-body text-white row">
                        <div class="col-md-8 d-flex flex-column justify-content-center align-content-center">
                            <p class="card-text">
                                Seu saldo atual é <strong>${balance}</strong>.
                            </p>
                        </div>
                        <div  class="col-md-4 d-flex justify-content-end"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <button type="button" class="btn btn-light">Realizar transferência</button>
                        </div>
                    
                    </div>
                </div>   

                <div class="container d-flex justify-content-between align-items-center flex-wrap">
                    ${
                        dataAccount.map(data => {
                            return `
                            <div class="col-5 mt-2">
                                <div class="card">
                                    <div class="card-header">${data.descricao}</div>
                                    <div class="card-body">
                                        <h5 class="card-title">Detalhamento</h5>
                                        <p class="card-text"></p>
                                    </div>
                                </div>
                            </div>
                            `
                        }).join('')

                    }
                </div>

            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Transferência entre contas</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body row">
                        <div class="container flex-column p-3">
                        
                            <label for="cpf" class="form-label">CPF</label>
                            <div class="input-group mb-3 ">
                                <input type="text" class="form-control" id="cpf" maxlegth="14" placeholder="000.000.000-00"
                                pattern="\\d{3}\.\\d{3}\.\\d{3}-\\d{2}">
                            </div>
                            <label for="description" class="form-label">Descrição</label>
                            <div class="input-group mb-3 ">
                                <input type="text" class="form-control" id="description" placeholder="Descrição">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" style="border-left-width: 1px !important">R$</span>
                                <input type="text" class="form-control" id="amount" placeholder="0,00">
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="send-transfer">Transferir</button>
                    </div>
                    </div>
                </div>
            </div>
            `
        }

        return view
    },
    after_render: async () => {
        document.getElementById('send-transfer').addEventListener('click', () => {
            const cpf = document.getElementById('cpf').value.replace(/[^\d]/g, "")
            const valor = document.getElementById('amount').value
            const descricao = document.getElementById('description').value
            const data = new Date();
            const dataFormatada = `${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`;

            const {contaCredito}  = userData;    
            
            const toTransfer = {conta: contaCredito.id, contaDestino: cpf, descricao, data: dataFormatada, planoConta: 1, valor}
            
            doBalanceTransfer(toTransfer);
        });
    }
}

export default Dash;