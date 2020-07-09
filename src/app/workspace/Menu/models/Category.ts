export class Category {
    id: string;
    name: string;
    menuId: string;
    dishIds: string[];
    created: string;

    contains(dishId: string): boolean {
        return this.dishIds.some(id => id === dishId);
    }
}
