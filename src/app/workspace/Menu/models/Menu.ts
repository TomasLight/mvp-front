import { Category } from "@ws/Menu/models/Category";

export class Menu {
    id: string;
    workspaceId: string;
    restaurants: string[];
    created: string;
    categories: Category[];
    name: string;
}
