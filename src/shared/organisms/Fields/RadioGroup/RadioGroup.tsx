import React from "react";

import { Grid, makeStyles, Radio, RadioGroup as MuiRadioGroup, StyledComponentProps } from "@material-ui/core";
import { RadioGroupProps } from "@material-ui/core/RadioGroup/RadioGroup";
import { RadioGroupChild } from "./RadioGroupChild";

const useStyles = makeStyles({
    itemContainer: {
        display: "flex",
    },
    radio: {
        margin: "auto 0",
    },
});

type RadioButtonClassKey = "itemContainer" | "radio";

interface IRadioGroupProps extends RadioGroupProps {
    items: RadioGroupChild[];
    disabled?: boolean;
}

interface IRadioGroupCallProps {
    onChange: (value: any) => void;
}

type Props = IRadioGroupProps & IRadioGroupCallProps & StyledComponentProps<RadioButtonClassKey>;

const RadioGroup = (props: Props) => {
    const {
        classes,
        className,
        disabled,
        items,
        name,
        value,
        onChange,
        ...rest
    } = props;

    const _classes = {
        classes,
        ...useStyles({}),
    };

    const handleOnChange = (id: number) => () => {
        onChange(id);
    };

    return (
        <MuiRadioGroup {...rest} name={name} value={value} className={className}>
            {items.map((child: RadioGroupChild) => {
                return (
                    <Grid item className={_classes.itemContainer} key={`radio-item-${child.id}`}>
                        <Radio
                            id={`radio-item-${child.id}`}
                            color={"secondary"}
                            className={_classes.radio}
                            disabled={disabled}
                            checked={child.id === value}
                            onClick={handleOnChange(child.id)}
                            value={child.id}
                        />

                        {child.component}
                    </Grid>
                );
            })}
        </MuiRadioGroup>
    );
};

export { RadioGroup, IRadioGroupProps, RadioButtonClassKey };
