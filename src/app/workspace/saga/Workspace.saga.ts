import { call, put } from "@redux-saga/core/effects";
import { AppAction } from "app-redux-utils";

import { SagaBase } from "@config/saga";
import { Data, DataFailed, DataService } from "@data";
import { mainUrls } from "@main/routing";
import { ContentConfig, SiteConfig } from "@models";
import { WorkspaceActions, WorkspaceStore } from "../redux";

export class WorkspaceSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<WorkspaceStore>) {
        yield put(WorkspaceActions.updateStore(partialStore));
    }

    static* loadSettings(action: AppAction) {
        yield WorkspaceSaga.updateStore({
            dataIsLoading: true,
        });

        const siteConfig: Data<SiteConfig> = yield call(DataService.workspace.siteConfigAsync);
        if (siteConfig instanceof DataFailed) {
            action.stop();

            yield WorkspaceSaga.updateStore({
                dataIsLoading: false,
            });

            if (siteConfig.actionProcessing.isRedirect()) {
                const url = `${window.location.protocol}//${process.env.MAIN_DOMAIN}/${mainUrls.siteSettings}`;
                window.location.href = url;
                return;
            }

            yield SagaBase.displayClientError(siteConfig);
            return;
        }

        const contentConfig: ContentConfig = yield call(DataService.workspace.contentConfigAsync);
        const menuId: string = yield call(DataService.workspace.menuIdAsync);

        yield WorkspaceSaga.updateStore({
            dataIsLoading: false,
            site: siteConfig,
            content: contentConfig,
            menuId,
        });
        WorkspaceSaga.updateSiteTitle(siteConfig.name);
        WorkspaceSaga.updateSiteFavicon(siteConfig.faviconUrl);
    }

    private static updateSiteTitle(title: string) {
        document.title = title;
    }

    private static updateSiteFavicon(faviconUrl: string) {
        const link: HTMLLinkElement = document.getElementById("favicon") as HTMLLinkElement;
        link.href = faviconUrl;
    }
}
