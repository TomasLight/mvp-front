import { ReducerConfig } from "@config";
import { SetupReducer } from "@main/Setup/redux";
import { State } from "@MainState";

export class MainReducerConfig extends ReducerConfig<State> {
    constructor() {
        super({
            setup: SetupReducer,
        });
    }
}
