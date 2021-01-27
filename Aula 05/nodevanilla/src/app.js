// CSS
import css from "../src/css/styles.css";

// Default components
import Footer from './views/components/Footer.js'
import Nav from './views/components/Nav.js';

// Components
import Home from './views/pages/Home.js';
import Dash from './views/pages/Dash.js';
import Login from './views/pages/Login.js';
import SignUp from './views/pages/SignUp.js';
import Error404 from './views/pages/Error404.js';
  
// Utils
import Utils from './service/utils.js';

// Lista de rotas com suporte. Qualquer URL diferente dessas rotas gerará um erro 404
// customizando o carregamento da rota adicioando o atributo 'type'
let routes = {
    '/': {route: Home, fullPage: false},
    '/signup': {route: SignUp, fullPage: true},
    '/login': {route: Login, fullPage: true},
    '/dashboard': {route: Dash, fullPage: false}
}


// O código do roteador. Pega um URL, verifica a lista de rotas com suporte e, em seguida, renderiza a página de conteúdo correspondente.
const router = async () => {

    // Elemento de visualização de carregamento Lazy Load:
    const header = null || document.getElementById('header');
    const content = null || document.getElementById('container');
    const footer = null || document.getElementById('footer');

    // Obtenha o URl do navegador
    let request = Utils.parseRequestURL()

    // Analise o URL e se ele tiver uma parte de id, altere-o com a string ": id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    if(routes[parsedURL] && !routes[parsedURL].fullPage){
        // Renderizar o cabeçalho e rodapé da página
        header.innerHTML = await Nav.render();
        await Nav.after_render();
        footer.innerHTML = await Footer.render();
        await Footer.after_render();
    } else{
        header.innerHTML = '';
        footer.innerHTML = '';
    }


    // Obtenha a página de nosso hash de rotas com suporte.
    // Se o URL analisado não estiver em nossa lista de rotas compatíveis, selecione a página 404
    let page = routes[parsedURL] ? routes[parsedURL].route : Error404
    content.innerHTML = await page.render();
    await page.after_render();
  
}

// Observa a mudança de hash:
window.addEventListener('hashchange', router);

// Observa o carregamento da página:
window.addEventListener('load', router);
