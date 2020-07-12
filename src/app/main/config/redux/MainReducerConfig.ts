import { PageReducer } from "@app/redux";
import { ReducerConfig } from "@config";
import { ContentReducer } from "@main/Content/redux";
import { SetupReducer } from "@main/Setup/redux";
import { State } from "@MainState";

export class MainReducerConfig extends ReducerConfig<State> {
    constructor() {
        super({
            setup: SetupReducer,
            content: ContentReducer,
            page: PageReducer,
        });
    }
}
