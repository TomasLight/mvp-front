import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";

import { IAppState } from "@utils/redux/IAppState";
import { NotifierActions } from "./redux";
import { INotifierCallProps, INotifierProps, Notifier } from "./Notifier";

const mapStateToProps = (state: IAppState): INotifierProps => {
    return {
        notifications: state.notifierStore.notifications,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): Partial<INotifierCallProps> => {
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
