import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { SagaBase } from "@utils/saga/SagaBase";

import {
    IGoToStepTwoData,
    IOnChangeColorData,
    IOnChangeDomainData,
    IOnChangeFaviconData,
    IOnChangeOpenGraphImageData,
    IOnChangeOpenGraphTitleData,
    IOnChangeSiteNameData,
    ISetUserNameData,
    SetupActions,
    SetupStore,
} from "../redux";

export class SetupSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<SetupStore>) {
        yield put(SetupActions.updateStore(partialStore));
    }

    static* setUserName(action: AppAction<ISetUserNameData>) {
        yield SetupSaga.updateStore({
            userName: action.payload.userName,
        });
    }

    static* onChangeSiteName(action: AppAction<IOnChangeSiteNameData>) {
        yield SetupSaga.updateStore({
            siteName: action.payload.siteName,
        });
    }

    static* onChangeDomain(action: AppAction<IOnChangeDomainData>) {
        const { domain } = action.payload;

        let url = "";
        if (domain) {
            url = `${domain}.bizarre.ru`;
        }

        yield SetupSaga.updateStore({
            siteUrl: url,
        });
    }

    static* onChangeFavicon(action: AppAction<IOnChangeFaviconData>) {
        yield SetupSaga.updateStore({
            faviconVariant: action.payload.faviconVariant,
        });
    }

    static* onChangeOpenGraphImage(action: AppAction<IOnChangeOpenGraphImageData>) {
        const { imageFile, dispatch } = action.payload;

        if (FileReader && imageFile) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                dispatch(SetupActions.updateStore({
                    openGraphImage: fileReader.result as string,
                }));
            };
            fileReader.readAsDataURL(imageFile);
        }
    }

    static* onChangeOpenGraphTitle(action: AppAction<IOnChangeOpenGraphTitleData>) {
        yield SetupSaga.updateStore({
            openGraphTitle: action.payload.title,
        });
    }

    static* onChangeColor(action: AppAction<IOnChangeColorData>) {
        yield SetupSaga.updateStore({
            color: action.payload.color,
        });
    }

    static* goToStepTwo(action: AppAction<IGoToStepTwoData>) {
        // yield SetupSaga.updateStore({
        //
        // });
    }
}
