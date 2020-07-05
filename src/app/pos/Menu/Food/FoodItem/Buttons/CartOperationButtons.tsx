import React, { FunctionComponent } from "react";

import { Button, ButtonGroup } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

interface ICartOperationButtonsProps {
    amount: number;
}

interface ICartOperationButtonsCallProps {
    increaseAmount: () => void;
    decreaseAmount: () => void;
}

type Props = ICartOperationButtonsProps & ICartOperationButtonsCallProps;

const CartOperationButtons: FunctionComponent<Props> = (props) => {
    const {
        amount,
        increaseAmount,
        decreaseAmount,
    } = props;

    return (
        <ButtonGroup variant="contained" color="primary" aria-label="cart operation buttons">
            <Button
                color="primary"
                size="small"
                // aria-controls={open ? "split-button-menu" : undefined}
                // aria-expanded={open ? "true" : undefined}
                aria-label="decrease dish amount"
                onClick={decreaseAmount}
            >
                <Remove/>
            </Button>
            <Button>{amount}</Button>
            <Button
                color="primary"
                size="small"
                // aria-controls={open ? "split-button-menu" : undefined}
                // aria-expanded={open ? "true" : undefined}
                aria-label="increase dish amount"
                onClick={increaseAmount}
            >
                <Add/>
            </Button>
        </ButtonGroup>
    );
};

export { CartOperationButtons };
