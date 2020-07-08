export interface IMenuItemDto {
    readonly id: string;
    readonly workspaceId: string;
    readonly created: string;
    readonly products: string[];
    readonly name: string;
    readonly description: string;
    readonly price: number;

    image: string;
}
