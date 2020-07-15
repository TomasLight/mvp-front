import { IndexPage } from "../models/IndexPage";

export class WorkspaceStore {
    indexPage: IndexPage;
    indexPageIsLoading: boolean;

    constructor() {
        this.indexPage = new IndexPage();
        this.indexPageIsLoading = false;
    }
}
