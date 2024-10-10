"use client"
import { useForm, ValidationError } from "@formspree/react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";

const Container = styled("div")(({ theme }) => ({
    width: "300px",
    height: "40px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "10px",
}));

const StyledForm = styled("form")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    inputHiddenLabel: true,
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create("width"),
        // width: "12ch",
        // "&:focus": {
        //     width: "20ch",
        // },
        "&:-webkit-autofill": {
            boxShadow: `${alpha(theme.palette.common.white, 1)} !important`,
            backgroundColor: `${alpha(theme.palette.common.white, 1)} !important`,
        },
    },
}));

export default function SubscriptionForm() {
    const [state, handleSubmit] = useForm("mzbnjkby");

    return (
        <Container>
            <StyledForm>
                <StyledInputBase />
                <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                />
                <Button
                    variant="text"
                    type="submit"
                    disabled={state.submitting}
                    style={{
                        width: "100%",
                        fontSize: "20px",
                    }}
                >
                    →
                </Button>

            </StyledForm>

        </Container >
    )
}