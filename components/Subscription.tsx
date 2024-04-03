"use client";
import { useForm, ValidationError } from "@formspree/react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import DoneIcon from "@mui/icons-material/Done";
import Divider from "@mui/material/Divider";
import { useOnClickOutside } from "@/utils/useOnClickOutside";

const Container = styled("div")(({ theme }) => ({
  position: "fixed",
  top: "300px",
  right: 0,
}));

const Congratulation = styled("div")(({ theme }) => ({}));

const FormWrapper = styled("div")(({ theme }) => ({
  width: "100%",
}));

const StyledIcon = styled("div")<{ isShow: boolean }>(({ theme, isShow }) => ({
  position: "absolute",
  right: 0,
  display: "flex",
  width: "40px",
  height: "40px",
  justifyContent: "center",
  alignItems: "center",
  color: "rgb(var(--header-bg))",
  borderRadius: "6px",
  boxShadow: "0 4px 16px 0 rgba(0,0,0,.15)",
  cursor: "pointer",
  transform: `${isShow ? "translateX(0)" : "translateX(100%)"}`,
  transition: "transform .3s ease",
}));

const StyledForm = styled("form")<{ isShow: boolean }>(({ theme, isShow }) => ({
  position: "absolute",
  right: 0,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  boxShadow: "0 4px 16px 0 rgba(0,0,0,.15)",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  transform: `${isShow ? "translateX(0)" : "translateX(100%)"}`,
  transition: "transform .3s ease",
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

  const handleShowForm = () => {
    setShowForm(true);
    setShowIcon(false);
  };

  const handleClickOutside = () => {
    setShowIcon(true);
    setShowForm(false);
  };

  useOnClickOutside(formRef, handleClickOutside);

  return (
    <Container>
      {state.succeeded ? (
        <Congratulation>
          <DoneIcon />
          Thank you!
        </Congratulation>
      ) : (
        <FormWrapper>
          <StyledIcon onClick={handleShowForm} isShow={showIcon}>
            <SubscriptionsIcon />
          </StyledIcon>
          <StyledForm onSubmit={handleSubmit} ref={formRef} isShow={showForm}>
            <StyledInputBase
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              style={{
                padding: "0 12px",
              }}
            />
            <Divider />
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
              }}
            >
              Subscribe
            </Button>
          </StyledForm>
        </FormWrapper>
      )}
    </Container>
  );
}
