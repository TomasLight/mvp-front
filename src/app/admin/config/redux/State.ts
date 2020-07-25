import { ContentStore } from "@admin/Content/redux";
import { ImportStore } from "@admin/Import/redux";
import { MainStore } from "@admin/redux";
import { SiteStore } from "@admin/Site/redux";

export class State {
    main: MainStore;
    site: SiteStore;
    import: ImportStore;
    content: ContentStore;
}
