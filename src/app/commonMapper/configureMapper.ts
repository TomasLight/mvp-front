import { Mapper } from "@utils/mapping/Mapper";
import { UserMappingProfile, PageMappingProfile } from "./profiles";

export function configureMapper() {
    Mapper.addProfiles([
        new UserMappingProfile(),
        new PageMappingProfile(),
    ]);
}
