import {
    ContentConfig,
    SiteConfig,
} from "@models";
import { Data } from "@utils/data";

export interface ILandingConfigDataService {
    siteConfigAsync(): Data<SiteConfig>;
    contentConfigAsync(): Data<ContentConfig>;
}
