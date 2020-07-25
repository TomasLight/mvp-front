import { call, put } from "@redux-saga/core/effects";
import { AppAction } from "app-redux-utils";

import { SagaBase } from "@config/saga/SagaBase";
import { DataServiceResult as Data, DataFailed } from "@utils/data";
import { DataService } from "@ws/data";
import { ContentConfig, SiteConfig } from "@models";
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
    * loadSettings(action: AppAction) {
        yield updateStore({
            dataIsLoading: true,
        });

        const siteConfig: Data<SiteConfig> = yield call(DataService.config.siteConfigAsync);
        if (siteConfig instanceof DataFailed) {
            yield updateStore({
                dataIsLoading: false,
            });

            yield this.displayClientError(siteConfig);
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
