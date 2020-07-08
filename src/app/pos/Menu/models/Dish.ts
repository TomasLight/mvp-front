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
    public id: string;
    public title: string;
    public description: string;
    public image: string;
    public price: number;
    public productIds: string[];
    public workspaceId: string;
    public created: string;

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
}
