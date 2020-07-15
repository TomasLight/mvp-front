import { ReducerConfig } from "@config";
import { ContentReducer } from "@main/Content/redux";
import { MainReducer } from "@main/redux";
import { SetupReducer } from "@main/Setup/redux";
import { State } from "@MainState";

export class MainReducerConfig extends ReducerConfig<State> {
    constructor() {
        super({
            main: MainReducer,
            setup: SetupReducer,
            content: ContentReducer,
        });
    }
}
