import { MenuStore } from "@ws/Menu/redux";
import { WorkspaceStore } from "@ws/redux";
import { PageStore } from "@app/redux";

export class State {
    workspace: WorkspaceStore;
    menu: MenuStore;
    page: PageStore;
}
