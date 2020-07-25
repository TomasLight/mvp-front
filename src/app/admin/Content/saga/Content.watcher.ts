import { Watcher } from "app-saga-utils";

import { ContentActions } from "../redux";
import { ContentSaga } from "./Content.saga";

export class ContentWatcher extends Watcher {
    constructor() {
        super();
        const saga = new ContentSaga();

        this.watchLatest(
            ContentActions.LOAD_DATA,
            saga.loadData
        );
        this.watchLatest(
            ContentActions.LOAD_FAKE_MENU,
            saga.loadFakeMenu
        );

        this.watchLatest(
            ContentActions.ON_CHANGE_ADDRESS,
            saga.onChangeAddress
        );
        this.watchLatest(
            ContentActions.ON_CHANGE_DELIVERY_LOCATION_LINK,
            saga.onChangeDeliveryLocationLink
        );
        this.watchLatest(
            ContentActions.ON_CHANGE_DELIVERY_TIME,
            saga.onChangeDeliveryTime
        );
        this.watchLatest(
            ContentActions.ON_CHANGE_FIRST_BLOCK_TEXT,
            saga.onChangeFirstBlockText
        );
        this.watchLatest(
            ContentActions.ON_CHANGE_PHONE,
            saga.onChangePhone
        );
        this.watchLatest(
            ContentActions.ON_CHANGE_PHOTO,
            saga.onChangePhoto
        );

        this.watchLatest(
            ContentActions.SUBMIT_SETTINGS,
            saga.submitSettings
        );
        this.watchLatest(
            ContentActions.CLOSE_PUBLISH_DIALOG,
            saga.closePublishDialog
        );
        this.watchLatest(
            ContentActions.REDIRECT_TO_SITE,
            saga.redirectToSite
        );
    }
}
