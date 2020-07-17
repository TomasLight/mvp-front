import { Mapper } from "@utils/mapping/Mapper";
import { UserMappingProfile, PageMappingProfile, WorkspaceMappingProfile } from "./profiles";

export function configureMapper() {
    Mapper.addProfiles([
        new UserMappingProfile(),
        new PageMappingProfile(),
        new WorkspaceMappingProfile(),
    ]);
}
