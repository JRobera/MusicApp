import styled from "@emotion/styled";

type SpinnerType = {
  width?: string;
  height?: string;
};

export const Spinner = styled.span`
  width: ${(props: SpinnerType) => (props.width ? props.width : "10px")};
  height: ${(props: SpinnerType) => (props.height ? props.height : "10px")};
  border: 2px solid var(--bg-player);
  border-left: 2px solid transparent;
  border-buttom: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
      border: 2px solid var(--bg-player);
      border-left: 0.2rem solid transparent;
      border-buttom: 0.2rem solid transparent;
    }
    50% {
      transform: rotate(90deg);
      border: 2px solid var(--bg-player);
      border-left: 0.2rem solid transparent;
      border-top: 0.2rem solid transparent;
    }
    75% {
      transform: rotate(180deg);
      border: 2px solid var(--bg-player);
      border-right: 0.2rem solid transparent;
      border-top: 0.2rem solid transparent;
    }
    100% {
      transform: rotate(1turn);
      border: 2px solid var(--bg-player);
      border-right: 0.2rem solid transparent;
      border-bottom: 0.2rem solid transparent;
    }
  }
`;
