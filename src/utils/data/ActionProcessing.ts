type ConstructorValue =
    | "redirect"
    | "display"
    | "create"
    ;

enum ActionFlag {
    none = 0,
    redirect = 1 << 0,
    display = 1 << 1,
    create = 1 << 2,
    error = 1 << 3,
    warning = 1 << 4,
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

            case "create":
                this._value = ActionFlag.create;
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

    isCreate() {
        return this._value & ActionFlag.create;
    }

    isWarning() {
        return this._value & ActionFlag.warning;
    }

    isError() {
        return this._value & ActionFlag.error;
    }
}
