import { IndexPage } from "../../models/IndexPage";

export class PosStore {
    public page: IndexPage;
    public pageIsLoading: boolean;

    constructor() {
        this.page = new IndexPage();
        this.pageIsLoading = false;
    }
}
