import { createAction } from "app-redux-utils";

import {
    IOnChangeAddressData,
    IOnChangeDeliveryLocationLinkData,
    IOnChangeDeliveryTimeData,
    IOnChangeFirstBlockTextData,
    IOnChangePhoneData,
    IOnChangePhotoData,
    ISubmitData,
} from "./Content.actions.dataTypes";
import { ContentStore } from "./Content.store";

export class ContentActions {
    static readonly PREFIX = "CONTENT_";
    static readonly UPDATE_STORE = ContentActions.PREFIX + "UPDATE_STORE";

    static readonly LOAD_FAKE_MENU = ContentActions.PREFIX + "LOAD_FAKE_MENU";

    static readonly ON_CHANGE_ADDRESS = ContentActions.PREFIX + "ON_CHANGE_ADDRESS";
    static readonly ON_CHANGE_DELIVERY_LOCATION_LINK = ContentActions.PREFIX + "ON_CHANGE_DELIVERY_LOCATION_LINK";
    static readonly ON_CHANGE_DELIVERY_TIME = ContentActions.PREFIX + "ON_CHANGE_DELIVERY_TIME";
    static readonly ON_CHANGE_FIRST_BLOCK_TEXT = ContentActions.PREFIX + "ON_CHANGE_FIRST_BLOCK_TEXT";
    static readonly ON_CHANGE_PHONE = ContentActions.PREFIX + "ON_CHANGE_PHONE";
    static readonly ON_CHANGE_PHOTO = ContentActions.PREFIX + "ON_CHANGE_PHOTO";

    static readonly SUBMIT = ContentActions.PREFIX + "ON_CHANGE_SITE_NAME";
    static readonly CLOSE_PUBLISH_DIALOG = ContentActions.PREFIX + "CLOSE_PUBLISH_DIALOG";
    static readonly REDIRECT_TO_SITE = ContentActions.PREFIX + "REDIRECT_TO_SITE";

    static updateStore = (partialStore: Partial<ContentStore>) =>
        createAction(ContentActions.UPDATE_STORE, partialStore);

    static loadFakeMenu = () => createAction(ContentActions.LOAD_FAKE_MENU);

    static onChangeAddress = (data: IOnChangeAddressData) =>
        createAction(ContentActions.ON_CHANGE_ADDRESS, data);

    static onChangeDeliveryLocationLink = (data: IOnChangeDeliveryLocationLinkData) =>
        createAction(ContentActions.ON_CHANGE_DELIVERY_LOCATION_LINK, data);

    static onChangeDeliveryTime = (data: IOnChangeDeliveryTimeData) =>
        createAction(ContentActions.ON_CHANGE_DELIVERY_TIME, data);

    static onChangeFirstBlockText = (data: IOnChangeFirstBlockTextData) =>
        createAction(ContentActions.ON_CHANGE_FIRST_BLOCK_TEXT, data);

    static onChangePhone = (data: IOnChangePhoneData) =>
        createAction(ContentActions.ON_CHANGE_PHONE, data);

    static onChangePhoto = (data: IOnChangePhotoData) =>
        createAction(ContentActions.ON_CHANGE_PHOTO, data);

    static submit = (data: ISubmitData) =>
        createAction(ContentActions.SUBMIT, data);

    static closePublishDialog = () => createAction(ContentActions.CLOSE_PUBLISH_DIALOG);
    static redirectToSite = () => createAction(ContentActions.REDIRECT_TO_SITE);
}
