import { ICategoryDto } from "@api/models/menu/responses/ICategoryDto";

export interface IMenuDto {
    readonly id: string;
    readonly workspaceId: string;
    readonly restaurants: string[];
    readonly created: string;
    readonly categories: ICategoryDto[];
    readonly name: string;
}
