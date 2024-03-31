import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  //   max-height: 90vh;
  @media (max-width: 576px) {
    width: 80%;
  }
`;
