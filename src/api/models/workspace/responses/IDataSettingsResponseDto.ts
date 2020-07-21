export interface ICreatedMenuCategoriesDto {
    id: string;
    menuId: string;
    items: any[];
    created: string;
    name: string;
}

export interface IDataSettingsResponseDto {
    id: string;
    workspaceId: string;
    restaurants: any[];
    created: string;
    categories: ICreatedMenuCategoriesDto[];
    name: string;
}
