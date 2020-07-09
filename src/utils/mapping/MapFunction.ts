import { IMapFunction } from "./IMapFunction";
import { IMapKey } from "./IMapKey";

export class MapFunction<TResult = any> implements IMapFunction<TResult> {
    key: IMapKey;
    map: (model: any) => TResult;

    constructor(sourceType: string, destinationType: string, func: (model: any) => TResult) {
        this.key = {
            sourceType,
            destinationType,
        };
        this.map = func;
    }
}
