import { createAction } from "app-redux-utils";

import {
    IOnChangeDomainData,
    IOnChangeSiteNameData,
    IOnChangeFaviconData,
    IOnChangeOpenGraphImageData,
    IOnChangeOpenGraphTitleData,
    ISubmitSettingsData,
    IOnChangeColorData,
} from "./Site.actions.dataTypes";
import { SiteStore } from "./Site.store";

export class SiteActions {
    static readonly PREFIX = "SETUP_";
    static readonly UPDATE_STORE = SiteActions.PREFIX + "UPDATE_STORE";

    static readonly LOAD_DATA = SiteActions.PREFIX + "LOAD_DATA";

    static readonly ON_CHANGE_SITE_NAME = SiteActions.PREFIX + "ON_CHANGE_SITE_NAME";
    static readonly ON_CHANGE_DOMAIN = SiteActions.PREFIX + "ON_CHANGE_DOMAIN";
    static readonly ON_CHANGE_FAVICON = SiteActions.PREFIX + "ON_CHANGE_FAVICON";
    static readonly ON_CHANGE_OPEN_GRAPH_IMAGE = SiteActions.PREFIX + "ON_CHANGE_OPEN_GRAPH_IMAGE";
    static readonly ON_CHANGE_OPEN_GRAPH_TITLE = SiteActions.PREFIX + "ON_CHANGE_OPEN_GRAPH_TITLE";
    static readonly ON_CHANGE_COLOR = SiteActions.PREFIX + "ON_CHANGE_COLOR";

    static readonly SUBMIT_SETTINGS = SiteActions.PREFIX + "SUBMIT_SETTINGS";

    static updateStore = (partialStore: Partial<SiteStore>) =>
        createAction(SiteActions.UPDATE_STORE, partialStore);

    static loadData = () => createAction(SiteActions.LOAD_DATA);

    static onChangeSiteName = (data: IOnChangeSiteNameData) =>
        createAction(SiteActions.ON_CHANGE_SITE_NAME, data);

    static onChangeDomain = (data: IOnChangeDomainData) =>
        createAction(SiteActions.ON_CHANGE_DOMAIN, data);

    static onChangeFavicon = (data: IOnChangeFaviconData) =>
        createAction(SiteActions.ON_CHANGE_FAVICON, data);

    static onChangeOpenGraphImage = (data: IOnChangeOpenGraphImageData) =>
        createAction(SiteActions.ON_CHANGE_OPEN_GRAPH_IMAGE, data);

    static onChangeOpenGraphTitle = (data: IOnChangeOpenGraphTitleData) =>
        createAction(SiteActions.ON_CHANGE_OPEN_GRAPH_TITLE, data);

    static onChangeColor = (data: IOnChangeColorData) =>
        createAction(SiteActions.ON_CHANGE_COLOR, data);

    static submitSettings = (data: ISubmitSettingsData) =>
        createAction(SiteActions.SUBMIT_SETTINGS, data);

    // static goToStepThree = (data: IGoToStepThreeData) =>
    //     createAction(SiteActions.GO_TO_STEP_THREE, data);
}
