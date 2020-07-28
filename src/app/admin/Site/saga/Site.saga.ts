import { call, put } from "@redux-saga/core/effects";
import { AppAction } from "app-redux-utils";
import { push } from "connected-react-router";

import { SiteConfig, Workspace, WorkspaceSiteSettings } from "@app/models/wokrspaces";
import { SagaBase } from "@config/saga";
import { DataFailed, DataServiceResult as Data } from "@utils/data";
import { DataService } from "@admin/data";
import { MainActions } from "@admin/redux";
import { mainUrls } from "@admin/routing";
import { ISiteSettingsFormValues } from "@admin/Site/models";
import { MainSelectors } from "@admin/redux/Main.selectors";
import { FavIconUrlResolver } from "@shared/molecules";
import { FileHelper, Mapper, Translate } from "@utils";

import {
    IOnChangeColorData,
    IOnChangeDomainData,
    IOnChangeFaviconData,
    IOnChangeOpenGraphImageData,
    IOnChangeOpenGraphTitleData,
    IOnChangeSiteNameData,
    ISubmitSettingsData,
    SiteActions,
    SiteStore,
} from "../redux";

function* updateStore(partialStore: Partial<SiteStore>) {
    yield put(SiteActions.updateStore(partialStore));
}

export class SiteSaga extends SagaBase {
    constructor() {
        super();
        this.loadData = this.loadData.bind(this);
        this.submitSettings = this.submitSettings.bind(this);
    }

    * loadData() {
        const settingsMode: "create" | "update" = yield MainSelectors.getSettingsMode();
        if (settingsMode === "create") {
            return;
        }

        const workspace: Data<Workspace> = yield call(DataService.workspace.currentWorkspaceAsync);
        if (workspace instanceof DataFailed) {
            yield this.displayClientError(workspace);
            return;
        }

        const siteConfig: Data<SiteConfig> = yield call(DataService.workspace.siteConfigAsync);
        if (siteConfig instanceof DataFailed) {
            yield this.displayClientError(siteConfig);
            return;
        }

        const faviconVariant = FavIconUrlResolver.getVariant(siteConfig.faviconUrl);
        yield updateStore({
            initialValues: {
                domain: workspace.domain,
                siteName: siteConfig.name,
                favicon: faviconVariant,
                openGraphImage: null,
                openGraphTitle: siteConfig.openGraphTitle,
                primaryColor: siteConfig.color,
            },
            siteUrl: `${workspace.domain}.${process.env.MAIN_DOMAIN}`,
            siteName: siteConfig.name,
            faviconVariant,
            openGraphImage: siteConfig.openGraphImageUrl,
            openGraphTitle: siteConfig.openGraphTitle,
            color: siteConfig.color,
        });
    }

    * onChangeSiteName(action: AppAction<IOnChangeSiteNameData>) {
        yield updateStore({
            siteName: action.payload.siteName,
        });
    }

    * onChangeDomain(action: AppAction<IOnChangeDomainData>) {
        const { domain } = action.payload;

        let url = "";
        if (domain) {
            url = `${domain}.${process.env.MAIN_DOMAIN}`;
        }

        yield updateStore({
            siteUrl: url,
        });
    }

    * onChangeFavicon(action: AppAction<IOnChangeFaviconData>) {
        yield updateStore({
            faviconVariant: action.payload.faviconVariant,
        });
    }

    * onChangeOpenGraphImage(action: AppAction<IOnChangeOpenGraphImageData>) {
        const { imageFile, dispatch } = action.payload;
        yield updateStore({
            openGraphImageIsLoading: true,
        });

        if (imageFile) {
            FileHelper.toBase64(imageFile).then((image: string) => {
                dispatch(SiteActions.updateStore({
                    openGraphImageIsLoading: false,
                    openGraphImage: image,
                }));
            });
        }
    }

    * onChangeOpenGraphTitle(action: AppAction<IOnChangeOpenGraphTitleData>) {
        yield updateStore({
            openGraphTitle: action.payload.title,
        });
    }

    * onChangeColor(action: AppAction<IOnChangeColorData>) {
        yield updateStore({
            color: action.payload.color,
        });
    }

    * submitSettings(action: AppAction<ISubmitSettingsData>) {
        const { formValues } = action.payload;

        const settings = Mapper.map<WorkspaceSiteSettings>(
            nameof<ISiteSettingsFormValues>(),
            nameof<WorkspaceSiteSettings>(),
            formValues
        );

        yield updateStore({
            settingsAreSending: true,
        });

        const settingsMode: "create" | "update" = yield MainSelectors.getSettingsMode();
        if (settingsMode === "create") {
            const workspace: Data<Workspace> = yield call(DataService.workspace.createConfigAsync, settings);
            if (workspace instanceof DataFailed) {
                yield updateStore({
                    settingsAreSending: false,
                });
                yield this.displayClientError(workspace);
                return;
            }

            const notificationAction = MainActions.workspaceWasCreated();
            notificationAction.callbackAction = () => push(mainUrls.dataSettings) as any;
            yield put(notificationAction);
        }
        else {
            const siteConfig: Data<SiteConfig> = yield call(DataService.workspace.updateSiteAsync, settings);
            if (siteConfig instanceof DataFailed) {
                yield updateStore({
                    settingsAreSending: false,
                });
                yield this.displayClientError(siteConfig);
                return;
            }
            yield this.displaySuccessMessage(Translate.getString("Настройки сайта сохранены"));
        }

        yield updateStore({
            settingsAreSending: false,
            initialValues: formValues,
        });
    }
}
