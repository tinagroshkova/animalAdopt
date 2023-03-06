class Animal {
    constructor(name, image, type, bread, age, sex, neededAmount, currentlyRisedAmount) {
        this.name = name;
        this.image = image;
        this.type = type;
        this.bread = bread;
        this.age = age;
        this.sex = sex;
        this.neededAmount = neededAmount;
        this.currentlyRisedAmount = currentlyRisedAmount;
    }
}


class AnimalManager {
    constructor() {
        this.animalsList = DATA.map(animal => new Animal(
            animal.name,
            animal.image,
            animal.type,
            animal.bread,
            animal.age,
            animal.sex,
            animal.neededAmount,
            animal.currentlyRisedAmount)
        );


        this.animalTypes = [];

        this.animalsList.forEach(animal => {
            let type = animal.type;
            this.animalTypes.push(type)
        });

        this.animalTypes = Array.from(new Set(this.animalTypes));
    }

    search(keyword) {
        return this.animalsList.filter(animal => {
            return animal.name.toLowerCase().includes(keyword.trim().toLowerCase());
        });
    }

    filter(selectedType) {
        return this.animalsList.filter(animal => {
            return animal.type === selectedType;
        });
    }
}

