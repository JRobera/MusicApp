import styled from "@emotion/styled";

export const SongItemContainerSkeleton = styled.div`
  display: flex;
  background-color: dimgrey;
  border-radius: 5px;
  margin-bottom: 3px;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;

export const SongItemInfoBoxSkeleton = styled.div`
  flex: 1;
`;

export const SongDetailSkeleton = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px;
`;

export const SongCoverBoxSkeleton = styled.div`
  display: flex;
  align-items: center;
`;

export const SongCoverSkeleton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4;
  background-color: #8a8989;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;

export const SongInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  animation: skeleton linear 2s infinite;
  & > span {
    display: inline-block;
    width: 60px;
    height: 15px;
    background-color: #8a8989;
    animation: skeleton linear 2s infinite;
    @keyframes skeleton {
      50% {
        opacity: 0.4;
      }
    }
  }
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;
