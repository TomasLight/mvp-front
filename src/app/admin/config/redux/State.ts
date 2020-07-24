import { ContentStore } from "@admin/Content/redux";
import { DataStore } from "@admin/Data/redux";
import { MainStore } from "@admin/redux";
import { SiteStore } from "@admin/Site/redux";

export class State {
    main: MainStore;
    site: SiteStore;
    data: DataStore;
    content: ContentStore;
}
