import { IContactSettingsFormValues } from "@main/Content/models";
import { Cart, Category, Dish } from "@ws/Menu/models";

export class ContentStore {
    initialValues: IContactSettingsFormValues;

    address: string;
    link: string;
    time: string;
    text: string;
    phone: string;
    photo: string;

    fakeMenuIsLoading: boolean;
    fakeMenu: {
        dishes: Dish[],
        categories: Category[],
        selectedCategory: Category,
        cart: Cart,
    };

    contentIsSaving: boolean;
    showPublishDialog: boolean;

    constructor() {
        this.initialValues = {} as any;

        this.address = "";
        this.link = "";
        this.time = "";
        this.text = "";
        this.phone = "";
        this.photo = "";

        this.fakeMenuIsLoading = true;
        this.fakeMenu = {
            cart: new Cart(),
            categories: [],
            dishes: [],
            selectedCategory: null,
        };

        this.contentIsSaving = false;
        this.showPublishDialog = false;
    }
}
