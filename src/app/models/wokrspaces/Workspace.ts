interface IWorkspace {
    role: string;
    id: string;
    domain: string;
    name: string;
}

export class Workspace implements IWorkspace {
    role: string;
    id: string;
    domain: string;
    name: string;

    constructor(workspace: IWorkspace = null) {
        if (!workspace) {
            this.role = "";
            this.id = "";
            this.domain = "";
            this.name = "";
        }
        else {
            this.role = workspace.role;
            this.id = workspace.id;
            this.domain = workspace.domain;
            this.name = workspace.name;
        }
    }
}
