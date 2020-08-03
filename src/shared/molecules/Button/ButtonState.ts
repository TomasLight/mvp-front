type State =
    | "active"
    | "loading"
    | "disabled"
    | "pristine"
    ;

type ButtonState = Partial<Record<State, boolean>>;

export { State, ButtonState };
