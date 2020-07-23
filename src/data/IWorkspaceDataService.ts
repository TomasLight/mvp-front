import {
    ContentConfig,
    LandingConfig,
    SiteConfig,
    Workspace,
    WorkspaceContentSettings,
    WorkspaceDataSettings,
    WorkspaceSiteSettings
} from "@models";
import { Data } from "./Data";

export interface IWorkspaceDataService {
    siteConfigAsync(): Data<SiteConfig>;
    contentConfigAsync(): Data<ContentConfig>;
    menuIdAsync(): Data<string>;
    listAsync(): Data<Workspace[]>;
    currentWorkspaceAsync(): Data<Workspace>;
    hasWorkspaceAsync(): Data<boolean>;
    getByIdAsync(workspaceId: string): Data<Workspace>;
    getByDomainAsync(domain: string): Data<Workspace>;
    // createAsync(settings: WorkspaceSiteSettings): Data<UserWorkspace>;
    createConfigAsync(settings: WorkspaceSiteSettings): Data<Workspace>;
    updateSiteAsync(settings: WorkspaceSiteSettings): Data<SiteConfig>;
    updateDataAsync(settings: WorkspaceDataSettings): Data<null> ;
    updateContentAsync(settings: WorkspaceContentSettings): Data<ContentConfig>;
    landingConfigAsync(): Data<LandingConfig>;
}
