import { WatcherBase } from "@utils/saga/WatcherBase";

import { SetupActions } from "../redux";
import { SetupSaga } from "./Setup.saga";

export class SetupWatcher extends WatcherBase {
    constructor() {
        super();

        this.watchLatest(
            SetupActions.SET_USER_NAME,
            SetupSaga.setUserName
        );

        this.watchLatest(
            SetupActions.ON_CHANGE_SITE_NAME,
            SetupSaga.onChangeSiteName
        );
        this.watchLatest(
            SetupActions.ON_CHANGE_DOMAIN,
            SetupSaga.onChangeDomain
        );
        this.watchLatest(
            SetupActions.ON_CHANGE_FAVICON,
            SetupSaga.onChangeFavicon
        );
        this.watchLatest(
            SetupActions.ON_CHANGE_OPEN_GRAPH_IMAGE,
            SetupSaga.onChangeOpenGraphImage
        );
        this.watchLatest(
            SetupActions.ON_CHANGE_OPEN_GRAPH_TITLE,
            SetupSaga.onChangeOpenGraphTitle
        );
        this.watchLatest(
            SetupActions.ON_CHANGE_COLOR,
            SetupSaga.onChangeColor
        );

        this.watchLatest(
            SetupActions.GO_TO_STEP_TWO,
            SetupSaga.goToStepTwo
        );
    }
}
