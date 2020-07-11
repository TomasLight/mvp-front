import { createAction } from "app-redux-utils";

import {
    IOnChangeDomainData,
    IOnChangeSiteNameData,
    IOnChangeFaviconData,
    IOnChangeOpenGraphImageData,
    IOnChangeOpenGraphTitleData,
    ISetUserNameData,
} from "./Setup.actions.dataTypes";
import { SetupStore } from "./Setup.store";

export class SetupActions {
    static readonly PREFIX = "SETUP_";
    static readonly UPDATE_STORE = SetupActions.PREFIX + "UPDATE_STORE";

    static readonly SET_USER_NAME = SetupActions.PREFIX + "SET_USER_NAME";

    static readonly ON_CHANGE_SITE_NAME = SetupActions.PREFIX + "ON_CHANGE_SITE_NAME";
    static readonly ON_CHANGE_DOMAIN = SetupActions.PREFIX + "ON_CHANGE_DOMAIN";
    static readonly ON_CHANGE_FAVICON = SetupActions.PREFIX + "ON_CHANGE_FAVICON";
    static readonly ON_CHANGE_OPEN_GRAPH_IMAGE = SetupActions.PREFIX + "ON_CHANGE_OPEN_GRAPH_IMAGE";
    static readonly ON_CHANGE_OPEN_GRAPH_TITLE = SetupActions.PREFIX + "ON_CHANGE_OPEN_GRAPH_TITLE";

    static updateStore = (partialStore: Partial<SetupStore>) =>
        createAction(SetupActions.UPDATE_STORE, partialStore);

    static setUserName = (data: ISetUserNameData) =>
        createAction(SetupActions.SET_USER_NAME, data);

    static onChangeSiteName = (data: IOnChangeSiteNameData) =>
        createAction(SetupActions.ON_CHANGE_SITE_NAME, data);

    static onChangeDomain = (data: IOnChangeDomainData) =>
        createAction(SetupActions.ON_CHANGE_DOMAIN, data);

    static onChangeFavicon = (data: IOnChangeFaviconData) =>
        createAction(SetupActions.ON_CHANGE_FAVICON, data);

    static onChangeOpenGraphImage = (data: IOnChangeOpenGraphImageData) =>
        createAction(SetupActions.ON_CHANGE_OPEN_GRAPH_IMAGE, data);

    static onChangeOpenGraphTitle = (data: IOnChangeOpenGraphTitleData) =>
        createAction(SetupActions.ON_CHANGE_OPEN_GRAPH_TITLE, data);
}
