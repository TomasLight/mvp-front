import {
    ContentConfig,
    SiteConfig,
    Workspace,
    WorkspaceContentSettings,
    WorkspaceDataSettings,
    WorkspaceSiteSettings
} from "@models";
import { Data } from "@utils/data/Data";

export interface IWorkspaceDataService {
    siteConfigAsync(): Data<SiteConfig>;
    contentConfigAsync(): Data<ContentConfig>;
    currentWorkspaceAsync(): Data<Workspace>;
    hasWorkspaceAsync(): Data<boolean>;
    createConfigAsync(settings: WorkspaceSiteSettings): Data<Workspace>;
    updateSiteAsync(settings: WorkspaceSiteSettings): Data<SiteConfig>;
    updateDataAsync(settings?: WorkspaceDataSettings): Data<null>;
    updateContentAsync(settings: WorkspaceContentSettings): Data<ContentConfig>;
}
