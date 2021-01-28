import Auth from "../../service/auth.js";
import baseURL from '../../service/baseURL.js';

const userData = JSON.parse(localStorage.getItem('@userDataAccount'));

const requestDashboard = async () => {
    let dash = null

    let {usuario, token} = await userData;
    
    await axios
        .get(`${baseURL}dashboard?fim=2021-01-31&inicio=2021-01-01&login=${usuario.login}`,  {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        .then(
            res =>  {
                localStorage.setItem('@userAccountsStatements', JSON.stringify(res.data))
            })
        .catch(err => console.log('err', err))
    
console.log('O')

}

const requestDataAccount = async () => {
    let dataAccount = null
    if(userData){

        let {usuario, token} = await userData;
        
        await axios
            .get(`${baseURL}lancamentos/planos-conta?login=${usuario.login}`,  {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            .then(
                res =>  {
                    localStorage.setItem('@userAccountPlans', JSON.stringify(res.data))
                    dataAccount = res.data
                })
            .catch(err => console.log('err', err))
    }

    console.log(dataAccount)

    return dataAccount
}

const doBalanceTransfer = async (transferData) => {

    let {token} = await userData;
    
    axios
        .post(`${baseURL}lancamentos`, {
                ...transferData
            }, 
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": token
                }
            }).then(res => {
                if(res == 200){
                    console.log('OK')
                    conta = ""
                    valor = ""
                    data = ""
                    descricao = ""
                    document.getElementById('cancel-transfer').click()
                }
            }).catch(err => alert(err))
    

}

const viewAccountItem = (conta) => {

    return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${conta.id}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${conta.id}" aria-expanded="true" aria-controls="collapse${conta.id}">
                    <div class="col-7 justify-content-start d-flex">                    
                        <div>
                           Conta ID ${conta.id} 
                        </div>                        
                    </div>
                    <div class="col-4 justify-content-end d-flex">
                        <div class="text-right p-2 w-75 bg-primary rounded-3 text-white">
                            Saldo: ${conta.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </div>
                    </div>
                </button>
            </h2>
            <div id="collapse${conta.id}" class="accordion-collapse collapse" aria-labelledby="heading${conta.id}" data-bs-parent="#accordion">
                <div class="accordion-body">
                    ${conta.lancamentos.length > 0 ? 
                        conta.lancamentos.map(info => {
                            return `
                                <div class="row">
                                    <div class="col">${info.data}</div>
                                    <div class="col">${info.descricao}</div>
                                    <div class="col">por ${info.planoConta.login}</div>
                                    <div class="col">${info.valor}</div>
                                </div>
                            `
                        }).join('') 
                        : `<div class="h-100 text-center">Nenhum lançamento para esta conta</div>`}
                </div>
            </div>
        </div>
    `
}

const Dash = {
    render: async () => {
        await Auth.securePage();
        const dataAccount = await requestDataAccount();
        
        await requestDashboard();

        const accounts = JSON.parse(localStorage.getItem('@userAccountsStatements'))
        const {contaBanco: contaBancoDash, contaCredito: contaCreditoDash} = accounts;

        
        let view = ``;

        if(userData){
            let {usuario: user, contaCredito} = await userData;
            let balance = contaCredito.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  
            view = `
            <div class="container">              
                <div class="container d-flex justify-content-end align-items-center mb-3">
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Realizar transferência
                    </button>
                </div>   

                <div class="container d-flex justify-content-between align-items-center flex-wrap">
                    <div class="container accordion" id="accordion">
                    ${
                        viewAccountItem(contaBancoDash)
                    }
                    ${
                        viewAccountItem(contaCreditoDash)
                    }
                    </div>
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
                        
                            <!--label for="cpf" class="form-label">CPF</label>
                            <div class="input-group mb-3 ">
                                <input type="text" class="form-control" id="cpf" maxlegth="14" placeholder="000.000.000-00"
                                pattern="\\d{3}\.\\d{3}\.\\d{3}-\\d{2}">
                            </div-->
                            
                            <label for="receiver" class="form-label">Destinatário</label>
                            <div class="input-group mb-3 ">
                                <input type="text" class="form-control" id="receiver" placeholder="Login do usuário">
                            </div>
                            <label for="description" class="form-label">Descrição</label>
                            <div class="input-group mb-3 ">
                                <input type="text" class="form-control" id="description" placeholder="Descrição">
                            </div>
                            <label for="birthday">Data da transferência:</label>
                            <div class="input-group mb-3 ">
                                <input type="date" class="form-control" id="dateTransfer" name="dateTransfer">
                            </div>
                            

                            <div class="input-group mb-3">
                                <span class="input-group-text" style="border-left-width: 1px !important">R$</span>
                                <input type="text" class="form-control" id="amount" placeholder="0,00">
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="cancel-transfer">Cancelar</button>
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
            let contaDestino = document.getElementById('receiver').value
            let valor = document.getElementById('amount').value
            let descricao = document.getElementById('description').value
            let data  = document.getElementById('dateTransfer').value

            const {usuario, contaCredito}  = userData;    
            
            const toTransfer = {
                conta: contaCredito.id, 
                contaDestino, 
                data, 
                descricao, 
                login: usuario.login,
                planoConta: 1, 
                valor
            }

            doBalanceTransfer(toTransfer)
            
        });
    }
}

export default Dash;