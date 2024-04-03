import styled from "@emotion/styled";
type FormProps = { width?: string; alignI?: string };
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: ${(props: FormProps) => (props.alignI ? props.alignI : "")};
  width: ${(props: FormProps) => (props.width ? props.width : "60%")};
  //   max-height: 90vh;
  @media (max-width: 576px) {
    width: 80%;
  }
  @media (max-width: 376px) {
    width: 100%;
  }
`;
