type State =
    | "active"
    | "loading"
    | "disabled"
    ;

type ButtonState = Partial<Record<State, boolean>>;

export { State, ButtonState };
