import {
    ContentConfig,
    LandingConfig,
    SiteConfig,
    UserWorkspace,
    WorkspaceContentSettings,
    WorkspaceDataSettings,
    WorkspaceSiteSettings
} from "@models";
import { Data } from "./Data";

export interface IWorkspaceDataService {
    siteConfigAsync(): Data<SiteConfig>;
    contentConfigAsync(): Data<ContentConfig>;
    menuIdAsync(): Data<string>;
    listAsync(): Data<UserWorkspace[]>;
    getByIdAsync(workspaceId: string): Data<UserWorkspace>;
    getByDomainAsync(domain: string): Data<UserWorkspace>;
    createAsync(settings: WorkspaceSiteSettings): Data<UserWorkspace>;
    updateSiteAsync(settings: WorkspaceSiteSettings): Data<SiteConfig>;
    updateDataAsync(settings: WorkspaceDataSettings): Data<null> ;
    updateContentAsync(settings: WorkspaceContentSettings): Data<ContentConfig>;
    landingConfigAsync(): Data<LandingConfig>;
}
