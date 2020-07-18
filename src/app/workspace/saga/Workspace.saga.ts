import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";
import { push } from "connected-react-router";

import { PageApi, WorkspaceApi } from "@api";
import { Notification, NotifierActions } from "@app/Notifier";
import { SagaBase } from "@config/saga";
import { mainUrls } from "@main/routing";
import { UserWorkspace } from "@models";
import { Translate, ApiResponse, ApiResponseStatus } from "@utils";
import { Pages } from "../models";

import { WorkspaceActions, WorkspaceStore } from "../redux";

export class WorkspaceSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<WorkspaceStore>) {
        yield put(WorkspaceActions.updateStore(partialStore));
    }

    static* loadWorkspaces(action: AppAction) {
        yield WorkspaceSaga.updateStore({
            indexPageIsLoading: true,
        });

        const response: ApiResponse<UserWorkspace[]> = yield WorkspaceApi.getWorkspaces();
        // if (!response.hasError()) {
        //     yield WorkspaceSaga.updateStore({
        //         indexPageIsLoading: false,
        //     });
        //     yield put(WorkspaceActions.loadPage());
        //     return;
        // }
        //
        // action.stop();
        // if (response.statusCode === ApiResponseStatus.Forbidden) {
        //     yield put(push(mainUrls.siteSettings));
        //     return;
        // }
        // yield WorkspaceSaga.updateStore({
        //     indexPageIsLoading: false,
        // });
        // yield SagaBase.displayClientError(response);
        if (response.hasError()) {
            action.stop();
            yield WorkspaceSaga.updateStore({
                indexPageIsLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        if (response.data.length === 0) {
            yield put(push(mainUrls.siteSettings));
        }
    }

    static* loadPage(action: AppAction) {
        yield WorkspaceSaga.updateStore({
            indexPageIsLoading: true,
        });

        const response: ApiResponse<Pages> = yield PageApi.getPages();
        if (response.hasError()) {
            yield WorkspaceSaga.updateStore({
                indexPageIsLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        const pages = response.data;
        if (!pages.index) {
            const notification = new Notification(
                Translate.getString("Информация о текущей страница не получена"),
                { variant: "error" }
            );
            yield put(NotifierActions.enqueueSnackbar(notification));
        }

        yield WorkspaceSaga.updateStore({
            indexPageIsLoading: false,
            indexPage: pages.index,
        });

        const site = pages.index.blocks.site;
        WorkspaceSaga.updateSiteTitle(site.title);
        WorkspaceSaga.updateSiteFavicon(site.favicon);
    }

    private static updateSiteTitle(title: string) {
        document.title = title;
    }

    private static updateSiteFavicon(faviconUrl: string) {
        const link: HTMLLinkElement = document.getElementById("favicon") as HTMLLinkElement;
        link.href = faviconUrl;
    }
}
