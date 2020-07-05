import { ComponentType } from "react";
import { connect } from "react-redux";

import { State } from "@PosState";
import { Translate } from "@utils/translates";
import { AppBar, IAppBarProps, AppBarProps } from "./AppBar";

const mapStateToProps = (state: State): Partial<IAppBarProps> => ({
    title: Translate.getString("Кофейня Вкусник"),
});

const AppBarContainer: ComponentType<Partial<AppBarProps>> = connect(
    mapStateToProps
)(AppBar);
export { AppBarContainer };
