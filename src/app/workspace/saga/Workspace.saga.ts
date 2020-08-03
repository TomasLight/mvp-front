import { call, put } from "@redux-saga/core/effects";
import { AppAction } from "app-redux-utils";
import { push } from "connected-react-router";

import { SagaBase } from "@config/saga/SagaBase";
import { DataServiceResult as Data, DataFailed } from "@utils/data";
import { DataService } from "@ws/data";
import { LandingConfigDataService } from "@ws/data/services/LandingConfigDataService";
import { ContentConfig, SiteConfig } from "@models";
import { workspaceUrls } from "@ws/routing";
import { WorkspaceActions, WorkspaceStore } from "../redux";

function* updateStore(partialStore: Partial<WorkspaceStore>) {
    yield put(WorkspaceActions.updateStore(partialStore));
}

function updateSiteTitle(title: string) {
    document.title = title;
}

function updateSiteFavicon(faviconUrl: string) {
    const link: HTMLLinkElement = document.getElementById("favicon") as HTMLLinkElement;
    link.href = faviconUrl;
}

export class WorkspaceSaga extends SagaBase {
    constructor() {
        super();
        this.loadSettings = this.loadSettings.bind(this);
    }

    * loadSettings(action: AppAction) {
        yield updateStore({
            dataIsLoading: true,
        });

        const landingDataService = new LandingConfigDataService();
        const siteConfig: Data<SiteConfig> = yield call(landingDataService.siteConfigAsync);
        if (siteConfig instanceof DataFailed) {
            yield updateStore({
                dataIsLoading: false,
            });

            yield this.displayClientError(siteConfig);
            yield put(push(workspaceUrls.notFound));
            yield updateStore({
                appIsInitialized: true,
            });
            return;
        }

        const contentConfig: ContentConfig = yield call(DataService.config.contentConfigAsync);
        const menuId: string = yield call(DataService.menu.menuIdAsync);

        yield updateStore({
            appIsInitialized: true,
            dataIsLoading: false,
            site: siteConfig,
            content: contentConfig,
            menuId,
        });

        updateSiteTitle(siteConfig.name);
        updateSiteFavicon(siteConfig.faviconUrl);
    }
}
