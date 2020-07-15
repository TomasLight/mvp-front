import { ContentStore } from "@main/Content/redux";
import { MainStore } from "@main/redux";
import { SetupStore } from "@main/Setup/redux";

export class State {
    main: MainStore;
    setup: SetupStore;
    content: ContentStore;
}
