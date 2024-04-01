"use client"
import { useForm, ValidationError } from '@formspree/react';
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import { useOnClickOutside } from '@/utils/useOnClickOutside';

const Container = styled("div")(({ theme }) => ({
    position: "fixed",
    maxWidth: "220px",
    top: "300px",
    right: "20px",
}))

const Congratulation = styled("div")(({ theme }) => ({
    
}))

const FormWrapper = styled("div")(({ theme }) => ({
    width: "100%",
}))

const StyledIcon = styled("div")(({ theme }) => ({
    width: "40px",
    height: "40px",
    backgroundColor: alpha(theme.palette.common.white, 1),
    borderRadius: "50%",
    border: "1px solid rgb(var(--header-bg))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(var(--header-bg))",
}))

const StyledForm = styled("form")(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    // "&:hover": {
    //     backgroundColor: alpha(theme.palette.common.black, 0.25),
    // },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        width: "auto",
    },
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
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export default function Subscription() {
    const [state, handleSubmit] = useForm("mzbnjkby");
    const [showForm, setShowForm] = useState(false);
    const [showIcon, setShowIcon] = useState(true);
    const formRef = useRef(null);

    const handleToggleForm = () => {
        setShowForm((prevState) => !prevState);
        setShowIcon((prevState) => !prevState);
    };

    useOnClickOutside(formRef, handleToggleForm)

    return (
        <Container>
            {state.succeeded ? <Congratulation>Thanks!</Congratulation>
                : <FormWrapper>
                    <StyledIcon onClick={handleToggleForm} style={{ display: showIcon ? 'flex' : 'none' }}>
                        <TouchAppOutlinedIcon />
                    </StyledIcon>
                    <StyledForm onSubmit={handleSubmit} ref={formRef} style={{ display: showForm ? 'block' : 'none' }}>
                        {/* <label htmlFor="email">
                Email Address
            </label> */}
                        <StyledInputBase
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                        />
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                        />
                        <Button variant="text" type="submit" disabled={state.submitting}>
                            Subscribe
                        </Button>
                    </StyledForm>
                </FormWrapper>}


        </Container>

    )
}