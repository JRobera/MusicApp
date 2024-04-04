import styled from "@emotion/styled";

export const ArtistItemSkeleton = styled.div`
  background-color: dimgrey;
  flex: 1;
  min-width: 10rem;
  max-width: 13rem;
  height: 6rem;
  border-radius: 4px;
  padding: 8px;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;

export const ArtistBoxSkeleton = styled.div`
  display: flex;
  height: 100%;
`;

export const ArtistImageSkeleton = styled.div`
  flex: 1;
  border-radius: 4;
  height: 100%;
  background-color: #8a8989;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;
export const ArtistInfoSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 4px 2px;
  flex: 1;

  & > span {
    width: 60px;
    height: 15px;
    margin-bottom: 4px;
    background-color: #8a8989;
    animation: skeleton linear 2s infinite;
    @keyframes skeleton {
      50% {
        opacity: 0.4;
      }
    }
  }
`;
