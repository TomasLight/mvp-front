import { PageStore } from "@app/redux";
import { ContentStore } from "@main/Content/redux";
import { SetupStore } from "@main/Setup/redux";

export class State {
    setup: SetupStore;
    content: ContentStore;
    page: PageStore;
}
