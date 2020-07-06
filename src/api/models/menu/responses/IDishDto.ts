import { SizeType } from "@enums";

export interface IDishDto {
    readonly id: number;
    readonly title: string;
    readonly image: string;
    readonly cost: number;
    readonly tag: number;

    readonly sizes: number[];
    readonly sizeType: SizeType;
}
