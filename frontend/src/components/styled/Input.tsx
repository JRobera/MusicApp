import styled from "@emotion/styled";
type InputPropsType = {
  width?: string;
  height?: string;
  opacity?: number;
  padding?: string;
  position?: string;
};

export const Input = styled.input`
  position: ${(props: InputPropsType) => props.position && props.position};
  font-size: 16px;
  border: none;
  outline: none;
  border-radius: 4px;
  padding: ${(props: InputPropsType) =>
    props.padding ? props.padding : "0.8rem"};
  width: ${(props: InputPropsType) => (props.width ? props.width : "100%")};
  height: ${(props: InputPropsType) => props.height && props.height};
  opacity: ${(props: InputPropsType) => props.opacity && props.opacity};
  background-color: var(--primary);
`;
