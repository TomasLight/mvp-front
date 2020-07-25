import React from "react";

import { Add, Remove } from "@material-ui/icons";

import { ButtonGroup } from "@shared/molecules/ButtonGroup";
import { Button } from "@shared/molecules/Button";

interface ICartOperationButtonsProps {
    amount: number;
}

interface ICartOperationButtonsCallProps {
    increaseAmount: () => void;
    decreaseAmount: () => void;
}

type Props = ICartOperationButtonsProps & ICartOperationButtonsCallProps;

const CartOperationButtons = (props: Props) => {
    const {
        amount,
        increaseAmount,
        decreaseAmount,
    } = props;

    return (
        <ButtonGroup aria-label="cart operation buttons">
            <Button
                variant="group-item"
                aria-label="decrease dish amount"
                onClick={decreaseAmount}
            >
                <Remove/>
            </Button>

            <Button variant="default">
                {amount}
            </Button>

            <Button
                variant="group-item"
                aria-label="increase dish amount"
                onClick={increaseAmount}
            >
                <Add/>
            </Button>
        </ButtonGroup>
    );
};

export { CartOperationButtons };
