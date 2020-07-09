import { IndexPage } from "../../models/IndexPage";

export class PosStore {
    page: IndexPage;
    pageIsLoading: boolean;

    constructor() {
        this.page = new IndexPage();
        this.pageIsLoading = false;
    }
}
