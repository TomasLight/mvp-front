import { MenuReducer } from "@pos/Menu/redux";
import { ReducerConfig } from "@config";
import { State } from "@PosState";

export class PosReducerConfig extends ReducerConfig<State> {
    constructor() {
        super({
            menu: MenuReducer,
        });
    }
}
