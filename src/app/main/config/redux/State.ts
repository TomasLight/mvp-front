import { ContentStore } from "@main/Content/redux";
import { DataStore } from "@main/Data/redux";
import { MainStore } from "@main/redux";
import { SiteStore } from "@main/Site/redux";

export class State {
    main: MainStore;
    site: SiteStore;
    data: DataStore;
    content: ContentStore;
}
