interface Pet {
    makeNoise(): void;
    getName(): string;
}

abstract class Animal implements Pet {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    abstract makeNoise(): void;
}

class Parrot extends Animal {
    override makeNoise(): void {
        console.log("Чирик-чирик!");
    }
}

class Turtle extends Animal {
    override makeNoise(): void {
        console.log("Ш-ш-ш!");
    }
}

class Person {
    private pet: Pet;
    private readonly name: string;

    constructor(pet: Pet, name: string) {
        this.pet = pet;
        this.name = name;
    }

    setPet(pet: Pet): void {
        this.pet = pet;
    }

    getPetInfo(): void {
        console.log(`Питомца по имени ${this.pet.getName()} держит ${this.name}.`);
        console.log("Звук питомца:");
        this.pet.makeNoise();
    }
}

const jack = new Person(new Parrot("Кеша"), "Джек");
const john = new Person(new Turtle("Завала"), "Джон");

jack.getPetInfo();
console.log();
john.getPetInfo();
