import { ICategoryDto, IMenuItemDto } from "@api/models/menu/responses";
import { IContactSettingsFormValues, WorkspaceContentSettings } from "@main/Content/models";
import { SetupSelectors } from "@selectors";
import { Cart, Category, Dish } from "@ws/Menu/models";
import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { WorkspaceApi } from "@api/WorkspaceApi";
import { ApiResponse, Mapper } from "@utils";
import { SagaBase } from "@utils/saga/SagaBase";

import { categories } from "@api/mock/menu/categories";
import { menuItems } from "@api/mock/menu/menuItems";
import { push } from "connected-react-router";

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

    static* loadFakeMenu(action: AppAction) {
        yield ContentSaga.updateStore({
            fakeMenuIsLoading: true,
        });

        const fakeCategories = categories.map((dto: ICategoryDto) => Mapper.map<Category>(
            nameof<ICategoryDto>(),
            nameof<Category>(),
            dto
        ));

        const fakeDishes = menuItems.map((dto: IMenuItemDto) => Mapper.map<Dish>(
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

    static* submit(action: AppAction<ISubmitData>) {
        const { formValues } = action.payload;

        const settings = Mapper.map<WorkspaceContentSettings>(
            nameof<IContactSettingsFormValues>(),
            nameof<WorkspaceContentSettings>(),
            formValues
        );

        yield ContentSaga.updateStore({
            contentIsSaving: true,
        });

        const response: ApiResponse = yield WorkspaceApi.sendContentSettings(settings);
        if (response.hasError()) {
            yield ContentSaga.updateStore({
                contentIsSaving: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield ContentSaga.updateStore({
            contentIsSaving: false,
            showPublishDialog: true,
        });
    }

    static* closePublishDialog(action: AppAction) {
        yield ContentSaga.updateStore({
            showPublishDialog: false,
        });
    }

    static* redirectToSite(action: AppAction) {
        const siteUrl = yield SetupSelectors.getSiteUrl();

        window.location.href = siteUrl;
        // yield put(push(siteUrl));
    }
}
