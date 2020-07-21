interface ICategory {
    id: string;
    name: string;
    menuId: string;
    dishIds: string[];
    created: string;
}

export class Category implements ICategory {
    id: string;
    name: string;
    menuId: string;
    dishIds: string[];
    created: string;

    constructor(category: ICategory = null) {
        if (!category) {
            this.id = "";
            this.name = "";
            this.menuId = "";
            this.dishIds = [];
            this.created = "";
        }
        else {
            this.id = category.id;
            this.name = category.name;
            this.menuId = category.menuId;
            this.dishIds = category.dishIds;
            this.created = category.created;
        }
    }

    contains(dishId: string): boolean {
        return this.dishIds.some(id => id === dishId);
    }
}
