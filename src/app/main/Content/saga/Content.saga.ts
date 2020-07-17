import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { WorkspaceApi } from "@api";
import { MockStorage } from "@api/mock/MockStorage";
import { ICategoryDto, IMenuItemDto } from "@api/models/menu/responses";
import { LandingConfig, WorkspaceContentSettings } from "@app/models";

import { IContactSettingsFormValues } from "@main/Content/models";
import { MainSelectors, SetupSelectors } from "@selectors";
import { Cart, Category, Dish } from "@ws/Menu/models";
import { SagaBase } from "@config/saga";
import { ApiResponse, Mapper } from "@utils";

import {
    ISubmitData,
    IOnChangePhotoData,
    IOnChangePhoneData,
    IOnChangeFirstBlockTextData,
    IOnChangeDeliveryTimeData,
    IOnChangeDeliveryLocationLinkData,
    IOnChangeAddressData,
    ContentActions,
    ContentStore,
} from "../redux";

export class ContentSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<ContentStore>) {
        yield put(ContentActions.updateStore(partialStore));
    }

    static* loadData(action: AppAction) {
        const settingsMode: "create" | "update" = yield MainSelectors.getSettingsMode();
        if (settingsMode === "create") {
            return;
        }

        const landingConfig: LandingConfig = yield MainSelectors.getLandingConfig();
        const contentConfig = landingConfig.contentConfig;

        yield ContentSaga.updateStore({
            initialValues: {
                photo: null,
                firstBlockText: contentConfig.firstText,
                phone: contentConfig.phone,
                address: contentConfig.address,
                deliveryTime: contentConfig.deliveryTime,
                deliveryLocationLink: contentConfig.deliveryMapUrl,
            },
            photo: contentConfig.firstPhotoUrl,
            text: contentConfig.firstText,
            phone: contentConfig.phone,
            address: contentConfig.address,
            time: contentConfig.deliveryTime,
            link: contentConfig.deliveryMapUrl,
        });
    }

    static* loadFakeMenu(action: AppAction) {
        yield ContentSaga.updateStore({
            fakeMenuIsLoading: true,
        });

        const fakeCategories = MockStorage.menu.get().categories.map((dto: ICategoryDto) => Mapper.map<Category>(
            nameof<ICategoryDto>(),
            nameof<Category>(),
            dto
        ));

        const fakeDishes = MockStorage.menuItems.list().map((dto: IMenuItemDto) => Mapper.map<Dish>(
            nameof<IMenuItemDto>(),
            nameof<Dish>(),
            dto
        ));

        yield ContentSaga.updateStore({
            fakeMenu: {
                cart: new Cart(),
                categories: fakeCategories,
                dishes: fakeDishes,
                selectedCategory: fakeCategories[0],
            },
        });
    }

    static* onChangeAddress(action: AppAction<IOnChangeAddressData>) {
        yield ContentSaga.updateStore({
            address: action.payload.address,
        });
    }

    static* onChangeDeliveryLocationLink(action: AppAction<IOnChangeDeliveryLocationLinkData>) {
        yield ContentSaga.updateStore({
            link: action.payload.link,
        });
    }

    static* onChangeDeliveryTime(action: AppAction<IOnChangeDeliveryTimeData>) {
        yield ContentSaga.updateStore({
            time: action.payload.time,
        });
    }

    static* onChangeFirstBlockText(action: AppAction<IOnChangeFirstBlockTextData>) {
        yield ContentSaga.updateStore({
            text: action.payload.text,
        });
    }

    static* onChangePhone(action: AppAction<IOnChangePhoneData>) {
        yield ContentSaga.updateStore({
            phone: action.payload.phone,
        });
    }

    static* onChangePhoto(action: AppAction<IOnChangePhotoData>) {
        const { photoFile, dispatch } = action.payload;

        if (FileReader && photoFile) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                dispatch(ContentActions.updateStore({
                    photo: fileReader.result as string,
                }));
            };
            fileReader.readAsDataURL(photoFile);
        }
    }

    static* submitSettings(action: AppAction<ISubmitData>) {
        const { formValues } = action.payload;

        const settings = Mapper.map<WorkspaceContentSettings>(
            nameof<IContactSettingsFormValues>(),
            nameof<WorkspaceContentSettings>(),
            formValues
        );

        yield ContentSaga.updateStore({
            contentIsSaving: true,
        });

        const workspaceId: string = yield MainSelectors.getWorkspaceId();
        const landingConfigId: string = yield MainSelectors.getLandingConfigId();

        const response: ApiResponse = yield WorkspaceApi.updateContentSettings(
            workspaceId,
            landingConfigId,
            settings
        );
        if (response.hasError()) {
            yield ContentSaga.updateStore({
                contentIsSaving: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        const partialStore: Partial<ContentStore> = {
            contentIsSaving: false,
        };
        const settingsMode: "create" | "update" = yield MainSelectors.getSettingsMode();
        if (settingsMode === "create") {
            partialStore.showPublishDialog = true;
        }

        yield ContentSaga.updateStore(partialStore);
    }

    static* closePublishDialog(action: AppAction) {
        yield ContentSaga.updateStore({
            showPublishDialog: false,
        });
    }

    static* redirectToSite(action: AppAction) {
        const siteUrl: string = yield SetupSelectors.getSiteUrl();

        window.location.href = siteUrl;
    }
}
