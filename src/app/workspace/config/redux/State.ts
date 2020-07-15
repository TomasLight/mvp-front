import { MenuStore } from "@ws/Menu/redux";
import { WorkspaceStore } from "@ws/redux";

export class State {
    workspace: WorkspaceStore;
    menu: MenuStore;
}
