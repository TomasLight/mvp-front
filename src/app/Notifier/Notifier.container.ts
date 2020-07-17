import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ICommonState } from "@CommonState";
import { NotifierActions } from "./redux";
import { INotifierCallProps, INotifierProps, Notifier } from "./Notifier";

const mapStateToProps = (state: ICommonState): INotifierProps => {
    return {
        notifications: state.notifier.notifications,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<INotifierCallProps> => {
    return {
        removeSnackbar: (key: string) =>
            dispatch(NotifierActions.removeSnackbar(key)),
    };
};

const NotifierContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Notifier);

export { NotifierContainer };
