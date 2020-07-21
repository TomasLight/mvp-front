import { Guid } from "@utils";
import { INewWorkspaceRequestDto } from "@api/models/workspace/requests";
import { IUserWorkspaceResponseDto } from "@api/models/workspace/responses";

export class WorkspaceMockStorage {
    static workspaces: IUserWorkspaceResponseDto[] = [ {
        "role": "owner",
        "id": Guid.generate(),
        "domainName": "shaurma-zbs",
        "name": "Сеть шаурмяшен у дома",
    } ];

    static list() {
        return WorkspaceMockStorage.workspaces;
    }

    static create(workspace: INewWorkspaceRequestDto) {
        const newWorkspace: IUserWorkspaceResponseDto = {
            "role": "owner",
            "id": Guid.generate(),
            "domainName": workspace.domain,
            "name": workspace.name,
        };
        WorkspaceMockStorage.workspaces.push(newWorkspace);
        return newWorkspace.id;
    }
}
