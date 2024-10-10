"use client"
import { useForm, ValidationError } from "@formspree/react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";

const Container = styled("div")(({ theme }) => ({
    width: "300px",
    height: "44px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "10px",
}));

const StyledForm = styled("form")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "4px",
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
const Congratulation = styled("div")(({ theme }) => ({
    height: "100%",
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center"
}));

export default function SubscriptionForm() {
    const [state, handleSubmit] = useForm("mzbnjkby");

    return (
        <Container>
            {state.succeeded ? (
                <Congratulation>
                    <DoneIcon />
                    Thank you!
                </Congratulation>
            ) : (
                <StyledForm onSubmit={handleSubmit}>
                    <StyledInputBase
                        id="email"
                        type="email"
                        name="email"
                        placeholder="example@example.com"
                        style={{
                            fontSize: "14px",
                            padding: "0 12px",
                        }}
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={state.submitting}
                        style={{
                            width: "36px",
                            height: "36px",
                            backgroundColor: "rgba(0,0,0,1)",
                            fontSize: "14px",
                        }}
                    >
                        sub
                    </Button>

                </StyledForm>)
            }

        </Container >
    )
}