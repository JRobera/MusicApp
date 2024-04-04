import styled from "@emotion/styled";

export const AlbumItemSkeleton = styled.div`
  position: relative;
  background-color: dimgrey;
  flex: 1;
  min-width: 10rem;
  max-width: 12rem;
  height: 6.5rem;
  border-radius: 4px;
  overflow: hidden;
  padding: 8px;
  animation: skeleton linear 2s infinite;
  @media (max-width: 390px) {
    max-width: 100%;
  }
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;
