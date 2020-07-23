import { AppAction } from "app-redux-utils";
import { call, put } from "@redux-saga/core/effects";

import { ContentConfig, LandingConfig, WorkspaceContentSettings } from "@app/models";
import { Data, DataFailed, DataService } from "@data";
import { IContactSettingsFormValues } from "@main/Content/models";
import { MainSelectors, SiteSelectors } from "@selectors";
import { Cart, Category, Dish } from "@ws/Menu/models";
import { SagaBase } from "@config/saga";
import { Mapper } from "@utils";
import { FakeMenuDataService } from "../../../../data/fakeServices/FakeMenuDataService";

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

        const contentConfig: Data<ContentConfig> = yield call(DataService.workspace.contentConfigAsync);
        if (contentConfig instanceof DataFailed) {
            yield SagaBase.displayClientError(contentConfig);
            return;
        }

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

        let categories: Category[];
        let dishes: Dish[];

        const hasWorkspace: boolean = yield MainSelectors.getHasWorkspace();
        const dataCategories: Data<Category[]> = yield call(DataService.menu.categoriesAsync);
        if (dataCategories instanceof DataFailed) {
            if (hasWorkspace) {
                yield SagaBase.displayClientError(dataCategories);
            }
            const fakeDataService = new FakeMenuDataService();
            categories = yield call(fakeDataService.categoriesAsync);
            dishes = yield call(fakeDataService.dishesAsync);
        }
        else {
            categories = dataCategories;
            dishes = yield call(DataService.menu.dishesAsync);
        }

        yield ContentSaga.updateStore({
            fakeMenu: {
                cart: new Cart(),
                categories,
                dishes,
                selectedCategory: categories[0],
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

        const contentConfig: Data<ContentConfig> = yield call(DataService.workspace.updateContentAsync, settings);
        if (contentConfig instanceof DataFailed) {
            yield ContentSaga.updateStore({
                contentIsSaving: false,
            });
            yield SagaBase.displayClientError(contentConfig);
            return;
        }

        const partialStore: Partial<ContentStore> = {
            contentIsSaving: false,
            initialValues: {
                photo: null,
                firstBlockText: contentConfig.firstText,
                phone: contentConfig.phone,
                address: contentConfig.address,
                deliveryTime: contentConfig.deliveryTime,
                deliveryLocationLink: contentConfig.deliveryMapUrl,
            },
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
        const siteUrl: string = yield SiteSelectors.getSiteUrl();

        window.location.href = siteUrl;
    }
}
