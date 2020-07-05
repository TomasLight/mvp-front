import { ComponentType } from "react";
import { connect } from "react-redux";

import { State } from "@PosState";
import { Translate } from "@utils/translates";
import { Drawer, IDrawerProps } from "./Drawer";

const mapStateToProps = (state: State): Partial<IDrawerProps> => ({
    menuItems: [
        {
            title: Translate.getString("Каталог"),
            url: "#1",
        },
        {
            title: Translate.getString("Контент"),
            url: "#1",
        },
        {
            title: Translate.getString("Настройки"),
            url: "#1",
        },
    ],
});

const DrawerContainer: ComponentType<Partial<IDrawerProps>> = connect(
    mapStateToProps
)(Drawer);
export { DrawerContainer };
