import { WorkSpaceMappingProfile } from "@main/config/mapper/profiles/WorkspaceMappingProfile";
import { Mapper } from "@utils/mapping/Mapper";

export function configureMapper() {
    Mapper.addProfiles([
        new WorkSpaceMappingProfile()
    ]);
}
