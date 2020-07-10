import { ReducerConfig } from "@config";
import { MenuReducer } from "@ws/Menu/redux";
import { PosReducer } from "@ws/redux/Pos.reducer";
import { State } from "@WsState";

export class PosReducerConfig extends ReducerConfig<State> {
    constructor() {
        super({
            pos: PosReducer,
            menu: MenuReducer,
        });
    }
}
