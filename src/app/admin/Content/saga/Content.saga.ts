import { AppAction } from "app-redux-utils";
import { call, put } from "@redux-saga/core/effects";

import { ContentConfig, WorkspaceContentSettings } from "@app/models";
import { DataFailed, DataServiceResult as Data } from "@utils/data";
import { DataService } from "@admin/data";
import { IContactSettingsFormValues } from "@admin/Content/models";
import { MainSelectors } from "@admin/redux/Main.selectors";
import { SiteSelectors } from "@admin/Site/redux/Site.selectors";
import { Cart, Category, Dish } from "@ws/Menu/models";
import { SagaBase } from "@config/saga";
import { Mapper } from "@utils";
import { FakeMenuDataService } from "../../data/fakeServices/FakeMenuDataService";

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

function * updateStore(partialStore: Partial<ContentStore>) {
    yield put(ContentActions.updateStore(partialStore));
}

export class ContentSaga extends SagaBase {
    * loadData(action: AppAction) {
        const settingsMode: "create" | "update" = yield MainSelectors.getSettingsMode();
        if (settingsMode === "create") {
            return;
        }

        const contentConfig: Data<ContentConfig> = yield call(DataService.workspace.contentConfigAsync);
        if (contentConfig instanceof DataFailed) {
            yield this.displayClientError(contentConfig);
            return;
        }

        yield updateStore({
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

    * loadFakeMenu(action: AppAction) {
        yield updateStore({
            fakeMenuIsLoading: true,
        });

        let categories: Category[];
        let dishes: Dish[];

        const hasWorkspace: boolean = yield MainSelectors.getHasWorkspace();
        const dataCategories: Data<Category[]> = yield call(DataService.menu.categoriesAsync);
        if (dataCategories instanceof DataFailed) {
            if (hasWorkspace) {
                yield this.displayClientError(dataCategories);
            }
            const fakeDataService = new FakeMenuDataService();
            categories = yield call(fakeDataService.categoriesAsync);
            dishes = yield call(fakeDataService.dishesAsync);
        }
        else {
            categories = dataCategories;
            dishes = yield call(DataService.menu.dishesAsync);
        }

        yield updateStore({
            fakeMenu: {
                cart: new Cart(),
                categories,
                dishes,
                selectedCategory: categories[0],
            },
        });
    }

    * onChangeAddress(action: AppAction<IOnChangeAddressData>) {
        yield updateStore({
            address: action.payload.address,
        });
    }

    * onChangeDeliveryLocationLink(action: AppAction<IOnChangeDeliveryLocationLinkData>) {
        yield updateStore({
            link: action.payload.link,
        });
    }

    * onChangeDeliveryTime(action: AppAction<IOnChangeDeliveryTimeData>) {
        yield updateStore({
            time: action.payload.time,
        });
    }

    * onChangeFirstBlockText(action: AppAction<IOnChangeFirstBlockTextData>) {
        yield updateStore({
            text: action.payload.text,
        });
    }

    * onChangePhone(action: AppAction<IOnChangePhoneData>) {
        yield updateStore({
            phone: action.payload.phone,
        });
    }

    * onChangePhoto(action: AppAction<IOnChangePhotoData>) {
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

    * submitSettings(action: AppAction<ISubmitData>) {
        const { formValues } = action.payload;

        const settings = Mapper.map<WorkspaceContentSettings>(
            nameof<IContactSettingsFormValues>(),
            nameof<WorkspaceContentSettings>(),
            formValues
        );

        yield updateStore({
            contentIsSaving: true,
        });

        const contentConfig: Data<ContentConfig> = yield call(DataService.workspace.updateContentAsync, settings);
        if (contentConfig instanceof DataFailed) {
            yield updateStore({
                contentIsSaving: false,
            });
            yield this.displayClientError(contentConfig);
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

        yield updateStore(partialStore);
    }

    * closePublishDialog(action: AppAction) {
        yield updateStore({
            showPublishDialog: false,
        });
    }

    * redirectToSite(action: AppAction) {
        const siteUrl: string = yield SiteSelectors.getSiteUrl();

        window.location.href = siteUrl;
    }
}
