import { call, put } from "@redux-saga/core/effects";
import { AppAction } from "app-redux-utils";
import { push } from "connected-react-router";

import { LandingConfig, SiteConfig, UserWorkspace, WorkspaceSiteSettings } from "@app/models/wokrspaces";
import { SagaBase } from "@config/saga";
import { DataFailed, DataService } from "@data";
import { MainActions } from "@main/redux";
import { mainUrls } from "@main/routing";
import { ISiteSettingsFormValues } from "@main/Site/models";
import { MainSelectors } from "@selectors";
import { FavIconUrlResolver } from "@shared/molecules";
import { FileHelper, Mapper } from "@utils";

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

export class SiteSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<SiteStore>) {
        yield put(SiteActions.updateStore(partialStore));
    }

    static* loadData(action: AppAction) {
        const settingsMode: "create" | "update" = yield MainSelectors.getSettingsMode();
        if (settingsMode === "create") {
            return;
        }

        const landingConfig: LandingConfig = yield MainSelectors.getLandingConfig();
        const siteConfig = landingConfig.siteConfig;

        const faviconVariant = FavIconUrlResolver.getVariant(siteConfig.faviconUrl);
        yield SiteSaga.updateStore({
            initialValues: {
                domain: "hardcode-domain",
                siteName: siteConfig.name,
                favicon: faviconVariant,
                openGraphImage: null,
                openGraphTitle: siteConfig.openGraphTitle,
                primaryColor: siteConfig.color,
            },
            siteUrl: `hardcode-domain.${process.env.MAIN_DOMAIN}`,
            siteName: siteConfig.name,
            faviconVariant,
            openGraphImage: siteConfig.openGraphImageUrl,
            openGraphTitle: siteConfig.openGraphTitle,
            color: siteConfig.color,
        });
    }

    static* onChangeSiteName(action: AppAction<IOnChangeSiteNameData>) {
        yield SiteSaga.updateStore({
            siteName: action.payload.siteName,
        });
    }

    static* onChangeDomain(action: AppAction<IOnChangeDomainData>) {
        const { domain } = action.payload;

        let url = "";
        if (domain) {
            url = `${domain}.${process.env.MAIN_DOMAIN}`;
        }

        yield SiteSaga.updateStore({
            siteUrl: url,
        });
    }

    static* onChangeFavicon(action: AppAction<IOnChangeFaviconData>) {
        yield SiteSaga.updateStore({
            faviconVariant: action.payload.faviconVariant,
        });
    }

    static* onChangeOpenGraphImage(action: AppAction<IOnChangeOpenGraphImageData>) {
        const { imageFile, dispatch } = action.payload;

        let openGraphImage = "";
        if (imageFile) {
            openGraphImage = yield call(FileHelper.toBase64, imageFile);
        }
        dispatch(SiteActions.updateStore({
            openGraphImage,
        }));
    }

    static* onChangeOpenGraphTitle(action: AppAction<IOnChangeOpenGraphTitleData>) {
        yield SiteSaga.updateStore({
            openGraphTitle: action.payload.title,
        });
    }

    static* onChangeColor(action: AppAction<IOnChangeColorData>) {
        yield SiteSaga.updateStore({
            color: action.payload.color,
        });
    }

    static* submitSettings(action: AppAction<ISubmitSettingsData>) {
        const { formValues } = action.payload;

        const settings = Mapper.map<WorkspaceSiteSettings>(
            nameof<ISiteSettingsFormValues>(),
            nameof<WorkspaceSiteSettings>(),
            formValues
        );

        yield SiteSaga.updateStore({
            settingsAreSending: true,
        });

        const settingsMode: "create" | "update" = yield MainSelectors.getSettingsMode();
        if (settingsMode === "create") {
            const workspace: DataFailed | UserWorkspace = yield call(DataService.workspace.createAsync, settings);
            if (workspace instanceof DataFailed) {
                yield SiteSaga.updateStore({
                    settingsAreSending: false,
                });
                yield SagaBase.displayClientError(workspace);
                return;
            }
        }

        const siteConfig: DataFailed | SiteConfig = yield call(DataService.workspace.updateSiteAsync, settings);
        if (siteConfig instanceof DataFailed) {
            yield SiteSaga.updateStore({
                settingsAreSending: false,
            });
            yield SagaBase.displayClientError(siteConfig);
            return;
        }

        yield SiteSaga.updateStore({
            settingsAreSending: false,
        });

        yield put(MainActions.loadLandingConfig());

        yield put(push(mainUrls.dataSettings));
    }
}
