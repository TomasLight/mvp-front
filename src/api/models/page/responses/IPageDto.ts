import { IPageBlockDto } from "./IPageBlockDto";

export interface IPageDto {
    readonly layout: string;
    readonly alias: string;
    readonly blocks: IPageBlockDto[];
}
