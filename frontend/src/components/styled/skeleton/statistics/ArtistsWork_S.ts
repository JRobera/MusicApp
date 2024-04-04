import styled from "@emotion/styled";
export const ArtistWorkSkeleton = styled.div`
  background-color: dimgrey;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px;
  min-width: 20rem;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;

export const ArtistWorkBoxSkeleton = styled.div`
  border-left: 1px var(--bg-player) solid;
  flex: 1;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
export const ArtistWorkNameSkeleton = styled.div`
  width: 70px;
  height: 20px;
  background-color: #8a8989;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;
export const ArtistWorkQuantitySkeleton = styled.div`
  width: 50px;
  height: 20px;
  background-color: #8a8989;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;
