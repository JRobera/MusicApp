import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "./FormWrapper";
import { Button } from "./styled/Button";
import { Form } from "./styled/Form";
import { FormError } from "./styled/FormError";
import { FormItemsContainer } from "./styled/FormItemsContainer";
import { Input } from "./styled/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { ZodType } from "zod";
import {
  currentUserError,
  currentUserStatus,
  logInRequest,
} from "../features/user/userSlice";
import { Spinner } from "./styled/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { generateError } from "../util/toast";
import { resetStatus } from "../features/user/userSlice";

type FormDataType = {
  email: string;
  password: string;
};

export default function Login() {
  const dispatch = useDispatch();
  const userStatus = useSelector(currentUserStatus);
  const userError = useSelector(currentUserError);

  const navigate = useNavigate();
  const schema: ZodType<FormDataType> = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(1, "Password required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({ resolver: zodResolver(schema) });
  const submit = (data: FormDataType) => {
    dispatch(logInRequest(data));
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
    <FormWrapper title="Login" alignItem="center">
      <Form alignI="center" width="100%" onSubmit={handleSubmit(submit)}>
        <FormItemsContainer width="90%">
          {errors.email && <FormError>{errors.email.message}</FormError>}
          <Input
            placeholder="Enter email"
            type="email"
            {...register("email")}
            autoFocus
          />
        </FormItemsContainer>
        <FormItemsContainer width="90%">
          {errors.password && <FormError>{errors.password.message}</FormError>}

          <Input
            placeholder="Enter password"
            type="password"
            {...register("password")}
          />
        </FormItemsContainer>
        <Button width="90%">
          Login
          {userStatus === "pending" && <Spinner />}
        </Button>
      </Form>
    </FormWrapper>
  );
}
