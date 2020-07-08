import { ReducerConfig } from "@config";
import { MenuReducer } from "@pos/Menu/redux";
import { PosReducer } from "@pos/redux/Pos.reducer";
import { State } from "@PosState";

export class PosReducerConfig extends ReducerConfig<State> {
    constructor() {
        super({
            pos: PosReducer,
            menu: MenuReducer,
        });
    }
}
