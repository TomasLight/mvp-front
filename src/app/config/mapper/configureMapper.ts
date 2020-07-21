import { Mapper } from "@utils/mapping/Mapper";
import { UserMappingProfile, WorkspaceMappingProfile } from "./profiles";

export function configureMapper() {
    Mapper.addProfiles([
        new UserMappingProfile(),
        new WorkspaceMappingProfile(),
    ]);
}
