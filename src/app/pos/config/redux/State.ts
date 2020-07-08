import { MenuStore } from "@pos/Menu/redux";
import { PosStore } from "@pos/redux";

export class State {
    public pos: PosStore;
    public menu: MenuStore;
}
