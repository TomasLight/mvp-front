import { IPageDto } from "./IPageDto";

export interface IPagesDto {
    readonly [application: string]: IPageDto;
}
