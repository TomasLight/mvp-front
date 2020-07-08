export class Category {
    public id: string;
    public name: string;
    public menuId: string;
    public dishIds: string[];
    public created: string;

    public contains(dishId: string): boolean {
        return this.dishIds.some(id => id === dishId);
    }
}
