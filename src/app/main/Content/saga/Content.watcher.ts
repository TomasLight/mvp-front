import { WatcherBase } from "@utils/saga/WatcherBase";

import { ContentActions } from "../redux";
import { ContentSaga } from "./Content.saga";

export class ContentWatcher extends WatcherBase {
    constructor() {
        super();

        this.watchLatest(
            ContentActions.LOAD_FAKE_MENU,
            ContentSaga.loadFakeMenu
        );

        this.watchLatest(
            ContentActions.ON_CHANGE_ADDRESS,
            ContentSaga.onChangeAddress
        );
        this.watchLatest(
            ContentActions.ON_CHANGE_DELIVERY_LOCATION_LINK,
            ContentSaga.onChangeDeliveryLocationLink
        );
        this.watchLatest(
            ContentActions.ON_CHANGE_DELIVERY_TIME,
            ContentSaga.onChangeDeliveryTime
        );
        this.watchLatest(
            ContentActions.ON_CHANGE_FIRST_BLOCK_TEXT,
            ContentSaga.onChangeFirstBlockText
        );
        this.watchLatest(
            ContentActions.ON_CHANGE_PHONE,
            ContentSaga.onChangePhone
        );
        this.watchLatest(
            ContentActions.ON_CHANGE_PHOTO,
            ContentSaga.onChangePhoto
        );

        this.watchLatest(
            ContentActions.SUBMIT_SETTINGS,
            ContentSaga.submitSettings
        );
        this.watchLatest(
            ContentActions.CLOSE_PUBLISH_DIALOG,
            ContentSaga.closePublishDialog
        );
        this.watchLatest(
            ContentActions.REDIRECT_TO_SITE,
            ContentSaga.redirectToSite
        );
    }
}
