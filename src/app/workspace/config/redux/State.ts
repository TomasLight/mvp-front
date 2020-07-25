import { MenuStore } from "@ws/Menu/redux/Menu.store";
import { WorkspaceStore } from "@ws/redux/Workspace.store";

export class State {
    workspace: WorkspaceStore;
    menu: MenuStore;
}
