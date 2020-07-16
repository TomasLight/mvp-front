import { ReducerConfig } from "@config";
import { MenuReducer } from "@ws/Menu/redux";
import { WorkspaceReducer } from "@ws/redux/Workspace.reducer";
import { State } from "@WsState";

export class WorkspaceReducerConfig extends ReducerConfig<State> {
    constructor() {
        super({
            workspace: WorkspaceReducer,
            menu: MenuReducer,
        });
    }
}
