export interface IMenuBlock {
    menuId: string;
}

export class MenuBlock {
    menuId: string;

    constructor(block: IMenuBlock = null) {
        if (!block) {
            this.menuId = "";
        }
        else {
            this.menuId = block.menuId;
        }
    }
}
