import { IPage } from "../IPage";
import { ContentBlock } from "./ContentBlock";
import { MenuBlock } from "./MenuBlock";
import { SiteBlock } from "./SiteBlock";

export class IndexPage implements IPage {
    alias: string;
    layout: string;
    blocks: {
        site: SiteBlock,
        menu: MenuBlock,
        content: ContentBlock,
    };

    constructor() {
        this.alias = "";
        this.layout = "";
        this.blocks = {
            site: new SiteBlock(),
            menu: new MenuBlock(),
            content: new ContentBlock(),
        };
    }
}
