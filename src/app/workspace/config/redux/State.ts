import { MenuStore } from "@ws/Menu/redux";
import { PosStore } from "@ws/redux";

export class State {
    pos: PosStore;
    menu: MenuStore;
}
