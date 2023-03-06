renderPage = () => {

    let homePage = document.getElementById("home");
    let adoptedPage = document.getElementById("adopted");
    let searchField = document.getElementById("search-field");
    let heading = document.getElementById('donation-heading');
    let registerForm = document.getElementById('registerForm');

    let user = new User();
    let manager = new AnimalManager();

    window.addEventListener("load", handleHashChange);
    window.addEventListener("hashchange", handleHashChange);

    handleHashChange();

    function handleHashChange() {
        let hash = location.hash.slice(1) || "login";
        let ids = ["home", "adopted", "donations", "login", "register"];

        ids.forEach(id => {
            let page = document.getElementById(id);

            if (id === hash) {
                page.style.display = "flex";
            } else {
                page.style.display = "none";
            }
        });

        searchField.style.display = "none";
        registerForm.style.display = "none";

        switch (hash) {
            case "home":
                printElements(manager.animalsList, homePage, true);
                searchField.style.display = "block";
                break;
            case "adopted":
                printElements(user.adopted, adoptedPage, false, new Date());
                break;
            case "register":
                registerForm.style.display = "flex";
                break;
        }
    }


    function printElements(
        animalsList,
        container,
        hideAdopted = false,
        adoptionDate = false
    ) {

        container.innerHTML = "";

        for (let i = 0; i < animalsList.length; i++) {
            const animal = animalsList[i];

            if (hideAdopted && user.hasAdopted(animal)) {
                continue;
            }

            let card = document.createElement("div");
            card.classList.add("card");

            let img = document.createElement("img");
            img.src = `./assets/images/${animal.image}`;

            let name = document.createElement("p");
            name.innerText = `Име: ${animal.name}`;

            let type = document.createElement("p");
            type.innerText = animal.type;

            let bread = document.createElement("p");
            bread.innerText = `Порода: ${animal.bread}`;

            let age = document.createElement("p");
            age.innerText = `Възраст: ${animal.age}г.`;

            let sex = document.createElement("p");
            sex.innerText = animal.sex;

            let neededSum = document.createElement("p");
            neededSum.innerText = `Остават: ${animal.neededAmount - animal.currentlyRisedAmount} лв.`;

            let adoptBtn = document.createElement("button");
            adoptBtn.classList.add("adoptBtn");

            let donateBtn = document.createElement("button");
            donateBtn.innerText = "Donate";
            donateBtn.classList.add("donateBtn");

            donateBtn.addEventListener("click", function handleClick() {
                location.hash = "donations";

                heading.innerHTML = `How much do you want to donate for ${animal.name}?`;

                let donateSumButton = document.getElementById("donate-sum");
                let donationForm = document.getElementById("donation-form");

                donateSumButton.addEventListener("click", function handleDonateSumClick(event) {
                    event.preventDefault();
                    let amount = document.getElementById("donater-amount").value;
                    let donaterName = document.getElementById("donater-name").value;

                    if (!amount) {
                        alert("Please enter a donation amount.");
                        return;
                    }
                    if (!donaterName) {
                        alert("Please enter your name.");
                        return;
                    }
                    if (amount > animal.neededAmount - animal.currentlyRisedAmount) {
                        alert(`The desired amount is higher than the needed sum. Only
                        ${animal.neededAmount - animal.currentlyRisedAmount} will be taken.`);
                        amount = animal.neededAmount - animal.currentlyRisedAmount;
                        animal.currentlyRisedAmount += amount;
                    } else {
                        animal.neededAmount -= amount;
                    }

                    let donation = new Donation(animal, amount);
                    user.makeDonation(donation);
                    printDonation(donation);

                    donateSumButton.removeEventListener("click", handleDonateSumClick);
                    donateBtn.removeEventListener("click", handleClick);
                });

                donationForm.reset();
            })

            card.append(
                img,
                name,
                type,
                bread,
                age,
                neededSum,
                adoptBtn,
                donateBtn
            )
            container.appendChild(card);


            if (animal.currentlyRisedAmount >= animal.neededAmount) {
                donateBtn.style.display = "none";
            }

            if (user.hasAdopted(animal)) {
                adoptBtn.classList.add("adopted");
                adoptBtn.innerText = "Leave";
                neededSum.style.display = "none";
                donateBtn.style.display = "none";

                if (adoptionDate) {
                    let adoptionDateHolder = document.createElement("p");
                    adoptionDateHolder.innerText = `Дата на осиновяване: ${adoptionDate.toLocaleDateString()}`;
                    card.appendChild(adoptionDateHolder);
                }
                adoptBtn.addEventListener("click", function () {
                    user.removeFromAdopted(animal);
                    handleHashChange();
                });
            } else {
                adoptBtn.innerText = "Adopt";
                adoptBtn.addEventListener("click", function () {
                    user.adopt(animal);
                    handleHashChange();
                });
            }
        }
    };

    printDonation = (donation) => {
        let table = document.getElementById("donations-history");
        let newRow = table.insertRow();
        let dateCell = newRow.insertCell();
        let animalCell = newRow.insertCell();
        let amountCell = newRow.insertCell();

        dateCell.textContent = donation.date.toISOString().slice(0, 10);
        animalCell.textContent = donation.animal.name;
        amountCell.textContent = donation.amount;
    }


    addDropDownOptions = (animalTypes) => {
        let selectElement = document.getElementById("select-type");

        animalTypes.forEach(type => {
            let option = document.createElement("option");
            option.innerText = type;
            option.value = type;
            selectElement.appendChild(option);
        });

        selectElement.addEventListener("change", function (event) {
            selected = event.target.value;
            let filtered = manager.filter(selected);
            printElements(filtered, homePage);
        });
    }

    addDropDownOptions(manager.animalTypes);

    let search = document.getElementById("search");
    search.addEventListener("input", function (event) {
        let text = event.target.value;
        let filtered = manager.search(text);
        printElements(filtered, homePage);
    });

    renderLogin = () => {
        let form = document.getElementById('loginForm');
        let usernameInput = document.getElementById('usernameInput');
        let passwordInput = document.getElementById('passwordInput');
        let errorMassage = document.getElementById('loginError');
        let loginButton = document.getElementById('loginButton');

        usernameInput.addEventListener('input', () => {
            loginButton.disabled = !(usernameInput.value && passwordInput.value);
        });

        passwordInput.addEventListener('input', () => {
            loginButton.disabled = !(usernameInput.value && passwordInput.value);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let username = e.target.elements.username.value;
            let pass = e.target.elements.pass.value;

            if (validateLogin({ username, pass })) {
                let successfulLogin = userManager.login({ username, pass });

                if (!successfulLogin) {
                    errorMassage.innerText = 'Wrong username or password!';
                    errorMassage.style.display = 'block';

                } else {
                    location.hash = 'home';
                    errorMassage.innerText = "";
                    form.reset();
                }
            }
        });

        loginButton.disabled = !(usernameInput.value && passwordInput.value);
    }

    validateLogin = ({ username, pass }) => {
        if (!username || !pass) {
            return false;
        }
        return true;
    }
    renderLogin();

    validateRegister = () => {
        let registerError = document.getElementById('registerError');
        let username = document.getElementById('username').value;
        let pass = document.getElementById('pass').value;
        let confirmPass = document.getElementById('confirm-pass').value;
        let registerButton = document.getElementById('registerButton');

        let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;

        if (username && pass && confirmPass) {

            if (pass === confirmPass) {
                if (passRegex.test(pass)) {
                    registerButton.disabled = false;
                    registerError.innerText = "";
                    return true;

                } else {
                    registerError.innerText = 'Password must be at least 6 characters long and contain at least one special character, one lowercase letter, and one uppercase letter.';
                }

            } else {
                registerError.innerText = 'Password and confirm password do not match.';
            }
        }

        registerError.style.display = 'block';
        registerButton.disabled = true;

        return false;
    }

    renderRegister = () => {
        let registerForm = document.getElementById("registerForm");
        let registerButton = document.getElementById('registerButton');
        let registerError = document.getElementById('registerError');

        registerButton.disabled = true;

        document.getElementById('username').addEventListener('input', () => {
            validateRegister();
        });

        document.getElementById('pass').addEventListener('input', () => {
            validateRegister();
        });

        document.getElementById('confirm-pass').addEventListener('input', () => {
            validateRegister();
        });

        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (validateRegister()) {
                let username = document.getElementById('username').value;
                let pass = document.getElementById('pass').value;
                let registrationSuccessful = userManager.register({ username, pass });

                if (registrationSuccessful) {
                    userManager.loggedUser = { username, pass };
                    location.hash = "home";
                } else {
                    registerError.innerText = 'Username already taken';
                    registerError.style.display = 'block';
                }
            }
            registerForm.reset();
        });

    }
    renderRegister();
}

renderPage();

