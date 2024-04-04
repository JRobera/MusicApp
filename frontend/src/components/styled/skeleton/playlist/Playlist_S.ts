import styled from "@emotion/styled";

export const PlaylistItemSkeleton = styled.div`
  background-color: dimgrey;
  flex: 1;
  min-width: 10rem;
  max-width: 13rem;
  height: 4rem;
  border-radius: 4px;
  padding: 8px;
  position: relative;
  @media (max-width: 395px) {
    max-width: 100%;
  }
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;

export const PlaylistItemBox = styled.div`
  display: flex;
  height: 100%;
`;
export const PlaylistItemImage = styled.div`
  flex: 1;
  border-radius: 4;
  width: 60px;
  height: 100%;
  background-color: #8a8989;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;
export const PlaylistItemInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 4px 2px;
  flex: 1;
  gap: 4px;

  & > span {
    display: inline-block;
    width: 50px;
    height: 20px;
    background-color: #8a8989;
    animation: skeleton linear 2s infinite;
    @keyframes skeleton {
      50% {
        opacity: 0.4;
      }
    }
  }
`;
