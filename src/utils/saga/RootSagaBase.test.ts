import { expect, test } from "@jest/globals";
import { SagaMiddleware } from "redux-saga";

import { IWatcher } from "./IWatcher";
import { WatchFunction } from "./WatchFunction";
import { RootSagaBase } from "./RootSagaBase";

class MockRootSaga extends RootSagaBase {
    watchFunctions: WatchFunction[];

    addWatcher(baseWatcher: IWatcher) {
        super.addWatcher(baseWatcher);
    }

    addWatchers(baseWatchers: IWatcher[]) {
        super.addWatchers(baseWatchers);
    }
}

test("RootSagaBase init", () => {
    const rootSaga = new MockRootSaga();
    expect(typeof rootSaga.watchFunctions).toBe("object");
});

test("RootSagaBase add watcher", () => {
    const rootSaga = new MockRootSaga();

    const mockWatcher: IWatcher = {
        watchFunctions: [ () => undefined ],
    };

    rootSaga.addWatcher(mockWatcher);
    expect(rootSaga.watchFunctions.length).toBe(1);
});

test("RootSagaBase add watchers", () => {
    const rootSaga = new MockRootSaga();

    const mockWatcher: IWatcher = {
        watchFunctions: [ () => undefined ],
    };

    rootSaga.addWatchers([ mockWatcher, mockWatcher ]);
    expect(rootSaga.watchFunctions.length).toBe(2);
});

test("RootSagaBase run", () => {
    const rootSaga = new MockRootSaga();

    const mockSagaRun = jest.fn(watchFunction => undefined);
    const mockSaga: SagaMiddleware<any> | any = {
        run: mockSagaRun,
        setContext: jest.fn(),
    };

    const mockWatcher: IWatcher = {
        watchFunctions: [
            () => undefined,
            () => undefined,
        ],
    };

    rootSaga.addWatchers([ mockWatcher, mockWatcher ]);
    rootSaga.run(mockSaga);
    expect(mockSagaRun.mock.calls.length).toBe(4);
});
