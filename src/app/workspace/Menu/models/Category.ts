export class Category {
    id: string;
    name: string;
    menuId: string;
    dishIds: string[];
    created: string;

    constructor() {
        this.id = "";
        this.name = "";
        this.menuId = "";
        this.dishIds = [];
        this.created = "";
    }

    contains(dishId: string): boolean {
        return this.dishIds.some(id => id === dishId);
    }
}
