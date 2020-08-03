type State =
    | "active"
    | "loading"
    | "disabled"
    | "alternative"
    | "pristine"
    ;

type ButtonState = Partial<Record<State, boolean>>;

export { State, ButtonState };
