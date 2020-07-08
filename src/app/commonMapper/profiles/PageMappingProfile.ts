import { IPagesDto } from "@api/models/page/responses";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";
import { IContentBlock, IMenuBlock, IndexPage, ISiteBlock, MenuBlock, Pages, SiteBlock } from "../../models";
import { ContentBlock } from "../../models/IndexPage";

export class PageMappingProfile extends MappingProfileBase implements IMappingProfile {
    public get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<IPagesDto>(),
                nameof<Pages>(),
                PageMappingProfile.mapIPagesDtoToPages
            ),
        ];
    }

    private static mapIPagesDtoToPages(dto: IPagesDto): Pages {
        const pages = new Pages();
        const keys = Object.keys(dto);

        keys.forEach((appName: string) => {
            switch (appName) {
                case nameof<Pages>(o => o.index):
                    pages.index = MappingProfileBase.autoMap(
                        dto[appName],
                        new IndexPage()
                    );

                    pages.index = new IndexPage();
                    pages.index.alias = dto[appName].alias;
                    pages.index.layout = dto[appName].layout;

                    const site = dto[appName].blocks.find((block) => block.type === "site");
                    if (site) {
                        pages.index.blocks.site = new SiteBlock(site.props as ISiteBlock);
                        pages.index.blocks.site.openGraphImageTitle = site.props["opengraphImageTitle"];
                        pages.index.blocks.site.openGraphImageUrl = site.props["opengraphImageUrl"];
                    }

                    const menu = dto[appName].blocks.find((block) => block.type === "menu");
                    if (menu) {
                        pages.index.blocks.menu = new MenuBlock(menu.props as IMenuBlock);
                    }

                    const content = dto[appName].blocks.find((block) => block.type === "content");
                    if (content) {
                        pages.index.blocks.content = new ContentBlock(content.props as IContentBlock);
                    }

                    break;

                default:
                    throw new Error(`Invalid app name (${appName}) for Pages dto. Need to configure model mapping.`);
            }
        });

        return pages;
    }
}
