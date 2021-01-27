import Auth from "../../service/auth.js";
//import logo from '../../images/logo-gama.png'

let Home = {
    render : async () => {
        await Auth.securePage();

        let userData = JSON.parse(localStorage.getItem('@userDataAccount'));
        let view = ``;

        if(userData){
            let {usuario: user, conta} = userData;
            let firstName = user.nome.split(' ')[0];

            view = `
                <div class="container" class="d-flex align-items-center">
                    <div class="row  justify-content-center align-items-center flex-wrap">
                        <div class="col-md-5">
                            <h3 class="mb-5">Painel de estudos</h3>
                            <p>
                                Olá <strong class="username">${firstName}</strong>, você realizou login no sistema de ensino da Gama Academy.
                            </p>
                            <p>
                                Agora você pode acessar o seu dashbaord e verificar seus eercícios e avaliações
                            </p>
                        </div>
                        <div class="col-md-5">
                            <img src="https://jobs.gama.academy/assets/logo-horizontal-56fdf595cd4297fde69d61d5e08e0d40bbae324401df82d2fbfa39250b8c7993.png"
                                alt="logo" class="logo-home">
                        </div>
                    </div>
                </div>
            `
        }

        return view
    },
    after_render: async () => {}
}

export default Home;