import { Watcher } from "app-saga-utils";

import { SiteActions } from "../redux";
import { SiteSaga } from "./Site.saga";

export class SiteWatcher extends Watcher {
    constructor() {
        super();

        this.watchLatest(
            SiteActions.LOAD_DATA,
            SiteSaga.loadData
        );

        this.watchLatest(
            SiteActions.ON_CHANGE_SITE_NAME,
            SiteSaga.onChangeSiteName
        );
        this.watchLatest(
            SiteActions.ON_CHANGE_DOMAIN,
            SiteSaga.onChangeDomain
        );
        this.watchLatest(
            SiteActions.ON_CHANGE_FAVICON,
            SiteSaga.onChangeFavicon
        );
        this.watchLatest(
            SiteActions.ON_CHANGE_OPEN_GRAPH_IMAGE,
            SiteSaga.onChangeOpenGraphImage
        );
        this.watchLatest(
            SiteActions.ON_CHANGE_OPEN_GRAPH_TITLE,
            SiteSaga.onChangeOpenGraphTitle
        );
        this.watchLatest(
            SiteActions.ON_CHANGE_COLOR,
            SiteSaga.onChangeColor
        );

        this.watchLatest(
            SiteActions.SUBMIT_SETTINGS,
            SiteSaga.submitSettings
        );
        // this.watchLatest(
        //     SiteActions.GO_TO_STEP_THREE,
        //     SiteSaga.goToStepThree
        // );
    }
}
