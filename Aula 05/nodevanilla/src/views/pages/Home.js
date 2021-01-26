import Utils from "../../service/utils.js";

let Home = {
    render : async () => {
        await Utils.isAuthenticated();

        let view = `
            <div class="container" style="min-height: 60vh">
                <div class="row  justify-content-center align-items-center flex-wrap">
                    <div class="col-md-5">
                        <h3>Painel de estudos</h3>
                        <p>
                            Olá, você realizou login no sistema de ensino da Gama Academy.
                        </p>
                        <p>
                            Agora você pode acessar o seu dashbaord e verificar seus eercícios e avaliações
                        </p>
                    </div>
                    <div class="col-md-5">
                        <img src="https://jobs.gama.academy/assets/logo-horizontal-56fdf595cd4297fde69d61d5e08e0d40bbae324401df82d2fbfa39250b8c7993.png"
                            alt="logo" class="logo">
                    </div>
                </div>
            </div>
        `

        return view
    },
    after_render: async () => {}
}

export default Home;