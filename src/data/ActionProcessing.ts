// export type ActionProcessing =
//     | "redirect"
//
//     | "display"
//     | "error"
//     | "warning"
//     ;

type ConstructorValue =
    | "redirect"
    | "display"
    ;

enum ActionFlag {
    none = 0,
    redirect = 1 << 0,
    display = 1 << 0,
    error = 1 << 1,
    warning = 1 << 2,
}

export class ActionProcessing {
    private _value: number = ActionFlag.none;

    constructor(value: ConstructorValue) {
        switch (value) {
            case "redirect":
                this._value = ActionFlag.redirect;
                break;

            case "display":
                this._value = ActionFlag.display;
                break;
        }
    }

    addWarning() {
        this._value |= ActionFlag.warning;
        return this;
    }

    addError() {
        this._value |= ActionFlag.error;
        return this;
    }

    shouldDisplay() {
        return this._value & ActionFlag.display;
    }

    isRedirect() {
        return this._value & ActionFlag.redirect;
    }

    isWarning() {
        return this._value & ActionFlag.warning;
    }

    isError() {
        return this._value & ActionFlag.error;
    }
}
