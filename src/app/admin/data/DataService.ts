import { FakeMenuDataService } from "./fakeServices/FakeMenuDataService";
import { FakeUserDataService } from "./fakeServices/FakeUserDataService";
import { FakeWorkspaceDataService } from "./fakeServices/FakeWorkspaceDataService";
import { IMenuDataService } from "./IMenuDataService";
import { IUserDataService } from "./IUserDataService";
import { IWorkspaceDataService } from "./IWorkspaceDataService";
import { MenuDataService } from "./services/MenuDataService";
import { UserDataService } from "./services/UserDataService";
import { WorkspaceDataService } from "./services/WorkspaceDataService";

function make(service, fakeService) {
    if (process.env.FAKE_DATA === "true") {
        return fakeService;
    }

    return service;
}

export class DataService {
    static readonly user: IUserDataService = make(
        new UserDataService(),
        new FakeUserDataService()
    );
    static readonly workspace: IWorkspaceDataService = make(
        new WorkspaceDataService(),
        new FakeWorkspaceDataService()
    );
    static readonly menu: IMenuDataService = make(
        new MenuDataService(),
        new FakeMenuDataService()
    );
}
