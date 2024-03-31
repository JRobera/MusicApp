import styled from "@emotion/styled";
import { Spinner } from "../components/styled/Spinner";
const MainContainer = styled.div`
  background-color: var(--primary);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Loading() {
  return (
    <MainContainer>
      <Spinner width="60px" height="60px" />
    </MainContainer>
  );
}
