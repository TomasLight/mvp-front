import { ReducerConfig } from "@config";
import { MenuReducer } from "@ws/Menu/redux";
import { WorkspaceReducer } from "@ws/redux/Workspace.reducer";
import { State } from "@WsState";

export class PosReducerConfig extends ReducerConfig<State> {
    constructor() {
        super({
            pos: WorkspaceReducer,
            menu: MenuReducer,
        });
    }
}
