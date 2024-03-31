import styled from "@emotion/styled";

type ButtonProps = {
  margin?: string;
  padding?: string;
  bgColor?: string;
  width?: number | string;
  position?: string;
};

export const Button = styled.button`
  position: ${(props) => props.position && "relative"};
  background-color: ${(props: ButtonProps) =>
    props.bgColor ? props.bgColor : "var(--primary)"};
  width: ${(props: ButtonProps) => (props.width ? props.width : "")};
  border: none;
  border-radius: 5px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: ${(props: ButtonProps) =>
    props?.margin ? props?.margin : "5px 5px 10px"};
  padding: ${(props: ButtonProps) =>
    props?.padding ? props?.padding : "10px 5px"};
  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;
