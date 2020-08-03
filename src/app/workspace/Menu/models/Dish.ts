interface IDish {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    productIds: string[];
    workspaceId: string;
    created: string;
}

export class Dish implements IDish {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    productIds: string[];
    workspaceId: string;
    created: string;

    constructor(dish: IDish = null) {
        if (!dish) {
            this.id = "";
            this.title = "";
            this.description = "";
            this.image = "";
            this.price = null;
            this.productIds = [];
            this.workspaceId = "";
            this.created = "";
        }
        else {
            this.id = dish.id;
            this.title = dish.title;
            this.description = dish.description;
            this.image = dish.image;
            this.price = dish.price;
            this.productIds = dish.productIds;
            this.workspaceId = dish.workspaceId;
            this.created = dish.created;
        }
    }

    static sort(dishes: Dish[]) {
        return dishes.sort(Dish.compare);
    }

    static compare(leftDish: Dish, rightDish: Dish) {
        if (leftDish.title < rightDish.title) {
            return 0;
        }

        return 1;
    }
}
