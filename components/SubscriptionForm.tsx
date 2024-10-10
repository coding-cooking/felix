"use client"
import styled from "@emotion/styled";
import { useForm, ValidationError } from "@formspree/react";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";

const Container = styled.div`
    width: 300px;
    height: 44px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px;
`

const StyledInputBase = styled(InputBase)`
    background-color: transparent;
    width: 100%;
    `

const Congratulation = styled.div`
    height: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
`

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
                        ✓
                    </Button>

                </StyledForm>)
            }

        </Container >
    )
}