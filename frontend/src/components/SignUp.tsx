import { zodResolver } from "@hookform/resolvers/zod";
import z, { ZodType } from "zod";
import { useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";
import { Button } from "./styled/Button";
import { Form } from "./styled/Form";
import { FormItemsContainer } from "./styled/FormItemsContainer";
import { Input } from "./styled/Input";
import { FormError } from "./styled/FormError";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUserError,
  currentUserStatus,
  signUpRequest,
} from "../features/user/userSlice";
import { Spinner } from "./styled/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { generateError } from "../util/toast";
import { resetStatus } from "../features/user/userSlice";

type FormDataType = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const dispatch = useDispatch();
  const userStatus = useSelector(currentUserStatus);
  const userError = useSelector(currentUserError);
  const navigate = useNavigate();

  const schema: ZodType<FormDataType> = z
    .object({
      userName: z
        .string()
        .min(2, "User name must contain at least 4 character(s)")
        .max(20),
      email: z.string().email(),
      password: z
        .string()
        .min(4, "Password must contain at least 4 character(s)"),
      confirmPassword: z
        .string()
        .min(4, "Password must contain at least 4 character(s)"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({ resolver: zodResolver(schema) });
  const submit = (data: FormDataType) => {
    dispatch(signUpRequest(data));
  };
  useEffect(() => {
    if (userStatus === "succeeded") {
      navigate("/home", { replace: true });
    }
  }, [userStatus]);
  useEffect(() => {
    if (userError !== null) {
      generateError(userError);
      dispatch(resetStatus());
    }
  }, [userError]);

  return (
    <FormWrapper title="Sign Up" alignItem="center">
      <Form width="100%" alignI="center" onSubmit={handleSubmit(submit)}>
        <FormItemsContainer width="90%">
          {errors.userName && <FormError>{errors.userName.message}</FormError>}
          <Input
            placeholder="Enter user name"
            type="text"
            {...register("userName")}
            autoFocus
          />
        </FormItemsContainer>
        <FormItemsContainer width="90%">
          {errors.email && <FormError>{errors.email.message}</FormError>}

          <Input
            placeholder="Enter email address"
            type="email"
            {...register("email")}
          />
        </FormItemsContainer>

        <FormItemsContainer width="90%">
          {errors.password && <FormError>{errors.password.message}</FormError>}

          <Input
            placeholder="Create a password"
            type="password"
            {...register("password")}
          />
        </FormItemsContainer>

        <FormItemsContainer width="90%">
          {errors.confirmPassword && (
            <FormError>{errors.confirmPassword.message}</FormError>
          )}

          <Input
            placeholder="Confirm your password"
            type="password"
            {...register("confirmPassword")}
          />
        </FormItemsContainer>
        <Button width="90%">
          Sign up
          {userStatus === "pending" && <Spinner />}
        </Button>
      </Form>
    </FormWrapper>
  );
}
