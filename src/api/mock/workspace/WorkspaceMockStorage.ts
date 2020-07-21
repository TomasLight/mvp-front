import { Guid } from "@utils";
import { INewWorkspaceDto } from "@api/models/workspace/requests";
import { IUserWorkspaceDto } from "@api/models/workspace/responses";

export class WorkspaceMockStorage {
    static workspaces: IUserWorkspaceDto[] = [ {
        "role": "owner",
        "id": Guid.generate(),
        "domainName": "shaurma-zbs",
        "name": "Сеть шаурмяшен у дома",
    } ];

    static list() {
        return WorkspaceMockStorage.workspaces;
    }

    static create(workspace: INewWorkspaceDto) {
        const newWorkspace: IUserWorkspaceDto = {
            "role": "owner",
            "id": Guid.generate(),
            "domainName": workspace.domain,
            "name": workspace.name,
        };
        WorkspaceMockStorage.workspaces.push(newWorkspace);
        return newWorkspace.id;
    }
}
