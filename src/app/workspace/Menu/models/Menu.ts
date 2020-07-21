import { Category } from "@ws/Menu/models/Category";

interface IMenu {
    id: string;
    workspaceId: string;
    restaurants: string[];
    created: string;
    categories: Category[];
    name: string;
}

export class Menu implements IMenu {
    id: string;
    workspaceId: string;
    restaurants: string[];
    created: string;
    categories: Category[];
    name: string;

    constructor(menu: IMenu = null) {
        if (!menu) {
            this.id = "";
            this.workspaceId = "";
            this.restaurants = [];
            this.created = "";
            this.categories = [];
            this.name = "";
        }
        else {
            this.id = menu.id;
            this.workspaceId = menu.workspaceId;
            this.restaurants = menu.restaurants;
            this.created = menu.created;
            this.categories = menu.categories;
            this.name = menu.name;
        }
    }
}
