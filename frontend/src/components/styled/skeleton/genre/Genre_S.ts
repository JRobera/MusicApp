import styled from "@emotion/styled";

export const GenreItemSkeleton = styled.div`
  background-color: dimgrey;
  flex: 1;
  min-width: 10rem;
  max-width: 15rem;
  height: 4rem;
  border-radius: 4px;
  padding: 8px;
  @media (max-width: 390px) {
    max-width: 100%;
  }
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;

export const GenreItemInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const GenreItemInfo = styled.div`
  width: 50px;
  height: 20px;
  background-color: #8a8989;
  margin-bottom: 5px;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;
