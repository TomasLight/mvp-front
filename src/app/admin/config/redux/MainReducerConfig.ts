import { ReducerConfig } from "@config/redux";
import { ContentReducer } from "@admin/Content/redux";
import { DataReducer } from "@admin/Data/redux";
import { MainReducer } from "@admin/redux";
import { SiteReducer } from "@admin/Site/redux";
import { State } from "@AdminState";

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
