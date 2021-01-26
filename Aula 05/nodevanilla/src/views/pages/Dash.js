import Utils from "../../service/utils.js";

let Dash = {
    render: async () => {
        await Utils.isAuthenticated();
        let userData = JSON.parse(localStorage.getItem('@userDataAccount'));
        
        let {usuario: user, conta} = userData;
        let firstName = user.nome.split(' ')[0];
        let balance = conta.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        let view = `
        <div class="container">
            <div class="d-flex justify-content-center">                
                <div class="card text-dark bg-warning mb-3">
                    <div class="card-header">ATENÇÃO</div>
                    <div class="card-body">
                        <p class="card-text"><strong class="username">${firstName}</strong>, você atualmente possui um saldo de <strong>${balance}</strong>.</p>
                    </div>
                </div>
            </div>

            <div class="row justify-content-between align-items-center flex-wrap">
                <div class="col-md-4 d-flex justify-content-center">
                    <div class="card" style="width: 18rem;">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3iHW9F8U24tel7OWvX4YKDzZH1n8Kt42Zsw&usqp=CAU"
                            class="card-img-top img-dash">
                        <div class="card-body">
                            <h5 class="card-title">CSS 3</h5>
                            <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum,
                                repellendus! Libero neque, earum, quod labore vero facilis animi fugiat nostrum officiis
                                reiciendis obcaecati veniam sed dolore. Quasi voluptatum officiis necessitatibus!</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 d-flex mt-2 justify-content-center">
                    <div class="card" style="width: 18rem;">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDmu608ZZN0qZpKeJPh9mBUml69d1-lsGcA&usqp=CAU"
                            class="card-img-top  img-dash">
                        <div class="card-body">
                            <h5 class="card-title">HTML 5</h5>
                            <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ex deserunt
                                accusamus voluptatum. Maiores nesciunt quia non. Quam officia commodi quia consequatur
                                ratione reprehenderit facere, corrupti voluptate recusandae iusto deleniti.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 d-flex mt-2 justify-content-center">
                    <div class="card" style="width: 18rem;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
                            class="card-img-top  img-dash">
                        <div class="card-body">
                            <h5 class="card-title">JS</h5>
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas corrupti
                                minima maxime voluptatem quos recusandae, voluptatum aspernatur dolore quis rerum saepe in
                                odio. Magnam beatae pariatur nulla. Delectus, perspiciatis. Ad?</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col">
                    
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Votou em</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>João Carlos</td>
                                <td>CSS, HTML</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Maria Rafaela</td>
                                <td>JavaScript</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Maria Julia</td>
                                <td>HTML</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
                
        </div>
        `
        return view
    },
    after_render: async () => {
    }
}

export default Dash;