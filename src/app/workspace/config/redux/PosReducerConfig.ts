import { ReducerConfig } from "@config";
import { MenuReducer } from "@ws/Menu/redux";
import { WorkspaceReducer } from "@ws/redux/Workspace.reducer";
import { State } from "@WsState";
import { PageReducer } from "@app/redux";

export class PosReducerConfig extends ReducerConfig<State> {
    constructor() {
        super({
            workspace: WorkspaceReducer,
            menu: MenuReducer,
            page: PageReducer,
        });
    }
}
