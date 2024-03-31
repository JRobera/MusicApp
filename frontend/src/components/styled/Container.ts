import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: var(--secondary);
  padding: 20px;
  border-radius: 4px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  //   max-height: 90vh;
  @media (max-width: 576px) {
    width: 80%;
  }
`;
