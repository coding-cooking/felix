"use client"
import styled from "@emotion/styled";
import { useForm, ValidationError } from "@formspree/react";
import InputBase from "@mui/material/InputBase";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DoneIcon from "@mui/icons-material/Done";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";

const Container = styled.div`
    min-width: 300px;
    height: 44px;
    background-color: #ebedeb;
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
    background-color: #528b5a;
    border: none;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
`

export default function SubscriptionForm() {
    const [state, handleSubmit] = useForm("mzbnjkby");
    const [loading, setLoading] = useState<boolean>(false);
    const { theme } = useThemeContext();

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        await handleSubmit(event);
        setLoading(false);
    };
    return (
        <Container>
            {state.succeeded ? (
                <Congratulation>
                    <DoneIcon />
                    Thank you!
                </Congratulation>
            ) : (
                <StyledForm onSubmit={handleFormSubmit}>
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
                            backgroundColor: loading ? "#0000004d" : theme === "dark" ? "#000000" : "#ffffff",
                            fontSize: "14px",
                            color: theme === "dark" ? "#ffffff" : "#000000",
                        }}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                    </Button>
                </StyledForm>)
            }
        </Container >
    )
}