import { mainUrls } from "@main/routing";
import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { WorkspaceApi } from "@api/WorkspaceApi";
import { setupSteps } from "@main/Setup/models";
import { ISiteSettingsFormValues } from "@main/Setup/models/ISiteSettingsFormValues";
import { WorkspaceSiteSettings } from "@app/models/wokrspaces/WorkspaceSiteSettings";
import { ApiResponse, Mapper } from "@utils";
import { SagaBase } from "@utils/saga/SagaBase";
import { push } from "connected-react-router";

import {
    IGoToStepThreeData,
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
            url = `${domain}.${process.env.MAIN_DOMAIN}`;
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
        const { formValues } = action.payload;

        const settings = Mapper.map<WorkspaceSiteSettings>(
            nameof<ISiteSettingsFormValues>(),
            nameof<WorkspaceSiteSettings>(),
            formValues
        );

        yield SetupSaga.updateStore({
            settingsAreSending: true,
        });

        const response: ApiResponse = yield WorkspaceApi.create(settings);
        if (response.hasError()) {
            yield SetupSaga.updateStore({
                settingsAreSending: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield SetupSaga.updateStore({
            landingConfigId: response.data,
            settingsAreSending: false,
            setupStep: setupSteps.dataSettings,
        });
    }

    static* goToStepThree(action: AppAction<IGoToStepThreeData>) {
        yield SetupSaga.updateStore({
            setupStep: setupSteps.contactSettings,
        });

        yield put(push(mainUrls.content));
    }
}
