class User {
    constructor(user, pass) {
        this.username = user;
        this.pass = pass;
        this.adopted = [];
        this.donations = [];
    }

    adopt(animal) {
        if (this.adopted.indexOf(animal) === -1) {
            this.adopted.push(animal);
        }
    }

    removeFromAdopted(animal) {
        let index = this.adopted.indexOf(animal);
        if (index !== -1) {
            this.adopted.splice(index, 1);
            animal.isAdopted = false;
        }
    }

    hasAdopted(animal) {
        return this.adopted.indexOf(animal) !== -1;
    }

    makeDonation(donation){
        this.donations.push(donation);
    }
}


class UserManager {
    constructor() {
        let loggedUser = JSON.parse(localStorage.getItem('isThereUser'));
        if (loggedUser) {
            this.loggedUser = new User(loggedUser.username, loggedUser.pass);
        }
    }

    loggedUser = null;
    

    users = [
        new User('slavi', 'bahur'),
        new User('bahur', 'slavi'),
        new User('tina', 'T12345*')
    ];

    login = ({ username, pass }) => {
        let foundUser = this.users.find(user => user.username === username &&
            user.pass === pass
        );

        if (foundUser) {
            this.loggedUser = foundUser;
            localStorage.setItem('isThereUser', JSON.stringify(this.loggedUser));
            return true;
        }
        return false;
    }

    register = ({ username, pass }) => {
        let foundUser = this.users.find(user => user.username === username);

        if (foundUser) {
            return false;
        }

        this.users.push(new User(username, pass));
        return true;
    }
}

let userManager = new UserManager();

