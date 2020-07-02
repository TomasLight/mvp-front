import { SizeType } from "@enums/SizeType";

interface IDish {
    id: number;
    title: string;
    image: string;
    cost: number;

    sizes: number[];
    sizeType: SizeType;
}

export class Dish implements IDish {
    public id: number;
    public title: string;
    public image: string;
    public cost: number;

    public sizes: number[];
    public sizeType: SizeType;

    constructor(dish: IDish = null) {
        if (!dish) {
            this.id = null;
            this.title = "";
            this.image = "";
            this.cost = null;

            this.sizes = [];
            this.sizeType = SizeType.NA;
        }
        else {
            this.id = dish.id;
            this.title = dish.title;
            this.image = dish.image;
            this.cost = dish.cost;

            this.sizes = dish.sizes;
            this.sizeType = dish.sizeType;
        }
    }
}
