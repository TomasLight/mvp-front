import { Notification, NotifierActions } from "@shared/templates";
import { Translate } from "@utils";
import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { PageApi } from "@api";
import { ApiResponse } from "@utils/api/ApiResponse";
import { SagaBase } from "@utils/saga/SagaBase";
import { Pages } from "../../models";

import { PosActions, PosStore } from "../redux";

export class PosSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<PosStore>) {
        yield put(PosActions.updateStore(partialStore));
    }

    static* loadPage(action: AppAction) {
        yield PosSaga.updateStore({
            pageIsLoading: true,
        });

        const response: ApiResponse<Pages> = yield PageApi.getPages();
        if (response.hasError()) {
            yield PosSaga.updateStore({
                pageIsLoading: false,
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

        yield PosSaga.updateStore({
            pageIsLoading: false,
            page: pages.index,
        });

        const site = pages.index.blocks.site;
        PosSaga.updateSiteTitle(site.title);
        PosSaga.updateSiteFavicon(site.favicon);
    }

    private static updateSiteTitle(title: string) {
        document.title = title;
    }

    private static updateSiteFavicon(faviconUrl: string) {
        const link: HTMLLinkElement = document.getElementById("favicon") as HTMLLinkElement;
        link.href = faviconUrl;
    }
}
