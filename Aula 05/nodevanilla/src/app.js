const content = null || document.getElementById('container')
const footer = null || document.getElementById('footer')
const classesFooter = ["content-footer", "d-flex", "justify-content-center", "align-content-center"];

footer.innerHTML = `<p style="margin: 0" class="align-self-center">&copy; Todos os direitos reservados</p>`;
footer.classList.add(...classesFooter);

content.innerHTML = `
<div class="row justify-content-center align-items-center flex-wrap">
            <div class="col-md-5 d-flex align-items-center">
                <img src="https://lh3.googleusercontent.com/proxy/MGxg-HKn2OieHK054-pgMrTrEfHibsyddUxWhUdCmgBSQUMDAhDQuz9zAiSGTK72gGIKcAOZUlawF0-62IHpTtJICrH89dQNCai2NVJndTEmgIwbAnERb9UYQB91QmAQcCTOsOGUpg"
                    alt="logo" class="logo">
            </div>
            <div class="col-md-4">
                <div class="card shadow rounded">
                    <div class="card-body">
                        <h4 class="card-title text-center mb-5">Painel de estudos</h4>
                        <form>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" aria-describedby="emailHelp">

                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Senha</label>
                                <input type="password" class="form-control" id="password">
                            </div>

                            <div class="mb-3 d-flex justify-content-center">
                                <button type="submit" class="btn btn-primary">Entrar</button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
`