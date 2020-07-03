import { IDishDto } from "./IDishDto";

export interface IDishDetailsDto extends IDishDto {
    readonly description: string;
}
