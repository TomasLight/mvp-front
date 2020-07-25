import { LandingConfigMappingProfile, UserMappingProfile, WorkspaceMappingProfile } from "@config/mapper/profiles";
import { Mapper } from "@utils/mapping/Mapper";
import { MenuMappingProfile } from "@ws/config/mapper/profiles";

export function configureMapper() {
    Mapper.addProfiles([
        new UserMappingProfile(),
        new LandingConfigMappingProfile(),
        new WorkspaceMappingProfile(),
        new MenuMappingProfile(),
    ]);
}
