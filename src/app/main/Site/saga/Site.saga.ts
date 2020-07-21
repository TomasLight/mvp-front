import { AppAction } from "app-redux-utils";
import { call, put } from "@redux-saga/core/effects";
import { push } from "connected-react-router";

import { MainActions } from "@main/redux";
import { FavIconUrlResolver } from "@shared/molecules";
import { mainUrls } from "@main/routing";
import { MainSelectors } from "@selectors";
import { WorkspaceApi } from "@api";
import { ISiteSettingsFormValues } from "@main/Site/models";
import { LandingConfig, WorkspaceSiteSettings } from "@app/models/wokrspaces";
import { SagaBase } from "@config/saga";
import { ApiResponse, FileHelper, Mapper } from "@utils";

import {
    ISubmitSettingsData,
    IOnChangeColorData,
    IOnChangeDomainData,
    IOnChangeFaviconData,
    IOnChangeOpenGraphImageData,
    IOnChangeOpenGraphTitleData,
    IOnChangeSiteNameData,
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
        // const response: ApiResponse<LandingConfig> = yield WorkspaceApi.getLandingConfig();
        // if (response.hasError()) {
        //     yield SiteSaga.updateStore({
        //         settingsAreSending: false,
        //     });
        //     yield SagaBase.displayClientError(response);
        //     return;
        // }

        // const siteConfig = response.data.siteConfig;
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

        // const workspaceId = response.data.workspaceId;
        // const landingConfigId = response.data.id;
        // yield all([
        //     put(MainActions.setWorkspaceId({ workspaceId })),
        //     put(MainActions.setLandingConfigId({ landingConfigId })),
        // ]);
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
            const creatingResponse: ApiResponse = yield WorkspaceApi.create(settings);
            if (creatingResponse.hasError()) {
                yield SiteSaga.updateStore({
                    settingsAreSending: false,
                });
                yield SagaBase.displayClientError(creatingResponse);
                return;
            }
        }

        const landingConfig: LandingConfig = yield MainSelectors.getLandingConfig();
        const response: ApiResponse = yield WorkspaceApi.updateSiteSettings(
            landingConfig.workspaceId,
            landingConfig.id,
            settings
        );
        if (response.hasError()) {
            yield SiteSaga.updateStore({
                settingsAreSending: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield SiteSaga.updateStore({
            settingsAreSending: false,
        });

        yield put(MainActions.loadLandingConfig());

        yield put(push(mainUrls.dataSettings));
    }
}
