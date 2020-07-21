import { AppAction } from "app-redux-utils";

export interface IGetAuthorizedUserData {
    callbackAction?: () => AppAction;
}
