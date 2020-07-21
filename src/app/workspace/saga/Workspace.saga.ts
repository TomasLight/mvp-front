import { call, put } from "@redux-saga/core/effects";
import { AppAction } from "app-redux-utils";
import { push } from "connected-react-router";

import { SagaBase } from "@config/saga";
import { DataFailed, DataService } from "@data";
import { mainUrls } from "@main/routing";
import { ContentConfig, SiteConfig } from "@models";
import { WorkspaceActions, WorkspaceStore } from "../redux";

export class WorkspaceSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<WorkspaceStore>) {
        yield put(WorkspaceActions.updateStore(partialStore));
    }

    static* loadWorkspace(action: AppAction) {
        yield WorkspaceSaga.updateStore({
            dataIsLoading: true,
        });

        const siteConfig: DataFailed | SiteConfig = yield call(DataService.workspace.siteConfigAsync);
        if (siteConfig instanceof DataFailed) {
            action.stop();

            yield WorkspaceSaga.updateStore({
                dataIsLoading: false,
            });

            if (siteConfig.actionProcessing.isRedirect()) {
                yield put(push(mainUrls.siteSettings));
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
