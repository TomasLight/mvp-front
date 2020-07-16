import { ReducerConfig } from "@config";
import { ContentReducer } from "@main/Content/redux";
import { DataReducer } from "@main/Data/redux";
import { MainReducer } from "@main/redux";
import { SiteReducer } from "@main/Site/redux";
import { State } from "@MainState";

export class MainReducerConfig extends ReducerConfig<State> {
    constructor() {
        super({
            main: MainReducer,
            site: SiteReducer,
            data: DataReducer,
            content: ContentReducer,
        });
    }
}
