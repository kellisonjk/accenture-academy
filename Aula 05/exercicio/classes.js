// Nome
// Data de nascimento formato DD/MM/AAAA .split('/') pegar o indice 2 - 2021

// Retorno no console a seguinte mensagem - Olá meu nome é ${name} e tenho ${age}.


const person = class Person{
    constructor(name, birthday){
        this.name = name;
        this.birthday = birthday;
        this.age = new Date().getFullYear() - (birthday.split('/')[2]);
        this.greetings();

    }

    greetings(){
        
        console.log(`TEste ${this.name}, tenho ${this.age}`);
    }
}

new person('João', '20/05/1985');