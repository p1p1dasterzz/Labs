class OrderLog {
    static #instance = new OrderLog();

    private constructor() {}

    static getInstance(): OrderLog {
        return OrderLog.#instance;
    }

    write(message: string): void {
        console.log(message);
    }
}

type CoffeeSize = "S" | "M" | "L";

interface CoffeeOrder {
    drink: string;
    size: CoffeeSize;
    milk: boolean;
}

class OrderBuilder {
    private size: CoffeeSize = "M";
    private milk = false;
    private readonly drink: string;

    constructor(drink: string) {
        this.drink = drink;
    }

    withSize(size: CoffeeSize): this {
        this.size = size;
        return this;
    }

    withMilk(): this {
        this.milk = true;
        return this;
    }

    build(): CoffeeOrder {
        return { drink: this.drink, size: this.size, milk: this.milk };
    }
}

interface Delivery {
    describe(): string;
}

class Pickup implements Delivery {
    describe(): string {
        return "Самовывоз из кофейни";
    }
}

class Courier implements Delivery {
    describe(): string {
        return "Доставка курьером";
    }
}

abstract class OrderService {
    protected abstract createDelivery(): Delivery;

    describeOrder(order: CoffeeOrder): string {
        return `${order.drink} — ${this.createDelivery().describe()}`;
    }
}

class PickupService extends OrderService {
    protected override createDelivery(): Delivery {
        return new Pickup();
    }
}

class CourierService extends OrderService {
    protected override createDelivery(): Delivery {
        return new Courier();
    }
}

interface Cup {
    readonly material: string;
}

interface Lid {
    readonly closure: string;
}

interface PackagingFactory {
    createCup(): Cup;
    createLid(): Lid;
}

class DisposablePackaging implements PackagingFactory {
    createCup(): Cup {
        return { material: "бумага" };
    }

    createLid(): Lid {
        return { closure: "одноразовая защёлка" };
    }
}

class ReusablePackaging implements PackagingFactory {
    createCup(): Cup {
        return { material: "нержавеющая сталь" };
    }

    createLid(): Lid {
        return { closure: "винтовая крышка" };
    }
}

const log = OrderLog.getInstance();
log.write(`Одиночка - один и тот же экземпляр: ${log === OrderLog.getInstance()}`);

const order = new OrderBuilder("Американо").withSize("L").withMilk().build();
log.write(`Строитель - ${order.drink}, размер ${order.size}, ${order.milk ? "с молоком" : "без молока"}`);

const services: OrderService[] = [new PickupService(), new CourierService()];
for (const service of services) {
    log.write(`Фабричный метод - ${service.describeOrder(order)}`);
}

const packagingFactories: PackagingFactory[] = [
    new DisposablePackaging(),
    new ReusablePackaging(),
];
for (const factory of packagingFactories) {
    const cup = factory.createCup();
    const lid = factory.createLid();
    log.write(`Абстрактная фабрика - стакан: ${cup.material}, закрытие: ${lid.closure}`);
}
