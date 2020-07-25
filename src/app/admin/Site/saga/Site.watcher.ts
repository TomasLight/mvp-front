import { Watcher } from "app-saga-utils";

import { SiteActions } from "../redux";
import { SiteSaga } from "./Site.saga";

export class SiteWatcher extends Watcher {
    constructor() {
        super();
        const saga = new SiteSaga();

        this.watchLatest(
            SiteActions.LOAD_DATA,
            saga.loadData
        );

        this.watchLatest(
            SiteActions.ON_CHANGE_SITE_NAME,
            saga.onChangeSiteName
        );
        this.watchLatest(
            SiteActions.ON_CHANGE_DOMAIN,
            saga.onChangeDomain
        );
        this.watchLatest(
            SiteActions.ON_CHANGE_FAVICON,
            saga.onChangeFavicon
        );
        this.watchLatest(
            SiteActions.ON_CHANGE_OPEN_GRAPH_IMAGE,
            saga.onChangeOpenGraphImage
        );
        this.watchLatest(
            SiteActions.ON_CHANGE_OPEN_GRAPH_TITLE,
            saga.onChangeOpenGraphTitle
        );
        this.watchLatest(
            SiteActions.ON_CHANGE_COLOR,
            saga.onChangeColor
        );

        this.watchLatest(
            SiteActions.SUBMIT_SETTINGS,
            saga.submitSettings
        );
    }
}
