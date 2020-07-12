import { IndexPage } from "@app/models/IndexPage";

export class PageStore {
    indexPage: IndexPage;
    pageIsLoading: boolean;

    constructor() {
        this.indexPage = new IndexPage();
        this.pageIsLoading = false;
    }
}
