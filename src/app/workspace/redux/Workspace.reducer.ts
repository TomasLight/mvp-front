import { Reducer } from "app-redux-utils";

import { WorkspaceActions } from "./Workspace.actions";
import { WorkspaceStore } from "./Workspace.store";

export const WorkspaceReducer = Reducer(new WorkspaceStore(), WorkspaceActions.UPDATE_STORE);
