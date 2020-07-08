import { Category } from "@pos/Menu/models/Category";

export class Menu {
    public id: string;
    public workspaceId: string;
    public restaurants: string[];
    public created: string;
    public categories: Category[];
    public name: string;
}
