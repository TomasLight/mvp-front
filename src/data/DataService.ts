import { MenuDataService } from "./services/MenuDataService";
import { UserDataService } from "./services/UserDataService";
import { WorkspaceDataService } from "./services/WorkspaceDataService";

export class DataService {
    static workspace = new WorkspaceDataService();
    static menu = new MenuDataService();
    static user = new UserDataService();
}
