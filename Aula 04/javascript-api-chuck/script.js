const baseURL = "https://api.chucknorris.io/jokes/";

const body = document.querySelector('#body-app');
const mainMenu = document.querySelector('#main-menu');


const error = (message) => `
        <div class="container m-3 p-3 shadow bg-white rounded">
            <h5 style="color: red">Ops! Ocorreu um erro... ${message}</h5>
        </div>`;

const searchJokeBy = () => {
    const inputJokeValue = document.querySelector("#searchValue").value;

    searchByValue(inputJokeValue);
}

const searchByValue = (searchParam) =>{
    body.innerHTML = loadingResult;
    axios.get(baseURL + 'search?query=' + searchParam).then(
        res => {
            const jokes = res.data.result;

            const cards = jokes.map(joke => card(joke.value));

            body.innerHTML = `
            <div class="container m-3 p-3 shadow bg-white rounded">
                <h5>Resultados para: ${searchParam}</h5>
            </div>` 

            body.innerHTML += cards.join('');
        }
    ).catch(err => body.innerHTML = error(err.message));

    showActiveLinkItem(null);
}

const card = (value) => `
            <div class="card col-md-3 m-3 shadow bg-white rounded" style="width: 18rem; height: fit-content">
                <div class="card-body">
                    <p class="card-text">${value}</p>
                </div>
            </div>`;

const loadingResult = `
            <div class="container d-flex mt-5 align-items-center justify-content-center" style="width: 100vh;">
                <div class="spinner-grow text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                    <span class="sr-only">Loading...</span>
                </div>    
            </div>`;

const getRandomJoke = () => {
        
    axios.get(baseURL + 'random').then(
        res => {
            console.log('Random', res);

            body.innerHTML = card(res.data.value);
        }
    ).catch(err => body.innerHTML = error(err.message));
}

const showActiveLinkItem = (event) => {
    document.querySelectorAll('.nav-link').forEach( e => {
        e.classList.remove('active');
    });

    if(event)
        event.target.className="nav-link active";
}

function searchByLink(event, searchParam) { 

    showActiveLinkItem(event);

    searchByValue(searchParam);
}


axios.get(baseURL + 'categories').then(
    res => {
        console.log('Categories', res)

        let allCategories = res.data;
        

        let menu = [(`<li class="nav-item">
                        <a class="nav-link  active" onclick="showActiveLinkItem(event); getRandomJoke();">+Random</a>
                    </li>`)];

        menu.push(allCategories.slice(0, 7).map(label => 
                    (`<li class="nav-item">
                        <a class="nav-link" onclick="searchByLink(event, '${label}')">${label}</a>
                    </li>`)));

        if(allCategories.length > 7){
            let dropdownItens = allCategories.slice(6, allCategories.length).map(label => 
                    (`<li><a class="dropdown-item" href="#" onclick="searchByLink(event, '${label}')">${label}</a></li>`));
            
            const dropdown = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Mais
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    ${dropdownItens.join('')}
                </ul>
            </li>`

            menu.push(dropdown);
        }
        
        mainMenu.innerHTML = menu.join('');
            
    }
);


getRandomJoke();