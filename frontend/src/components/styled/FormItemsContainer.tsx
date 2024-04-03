import styled from "@emotion/styled";

type LabelProps = {
  border?: string;
  padding?: string;
  cursor?: string;
  maxWidth?: string;
  width?: string;
  height?: string;
  justifyContent?: string;
};

export const FormItemsContainer = styled.label`
  position: relative;
  display: flex;
  width: ${(props: LabelProps) => (props.width ? props.width : "")};
  display: flex;
  align-items: center;
  overflow-wrap: anywhere;
  max-width: ${(props: LabelProps) => (props.maxWidth ? props.maxWidth : "")};
  height: ${(props: LabelProps) => (props.height ? props.height : "")};
  border: ${(props: LabelProps) => (props.border ? props.border : "")};
  padding: ${(props: LabelProps) => (props.padding ? props.padding : "")};
  cursor: ${(props: LabelProps) => (props.cursor ? props.cursor : "")};
  justify-content: ${(props: LabelProps) =>
    props.justifyContent ? props.justifyContent : ""};
`;
