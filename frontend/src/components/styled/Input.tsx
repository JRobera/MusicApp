import styled from "@emotion/styled";
type InputPropsType = {
  width?: string;
  opacity?: number;
  padding?: string;
};

export const Input = styled.input`
  font-size: 16px;
  border: none;
  outline: none;
  border-radius: 4px;
  padding: ${(props: InputPropsType) =>
    props.padding ? props.padding : "0.8rem"};
  width: ${(props: InputPropsType) => (props.width ? props.width : "100%")};
  opacity: ${(props: InputPropsType) => props.opacity && props.opacity};
  background-color: var(--primary);
`;
