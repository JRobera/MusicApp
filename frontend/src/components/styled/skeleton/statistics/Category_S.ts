import styled from "@emotion/styled";

export const CategorySkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  justify-content: space-between;
  background-color: dimgrey;
  padding: 20px;
  border-radius: 4px;
  min-width: 10rem;
  max-width: 20rem;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;

export const CateGoryIcon = styled.div`
  width: 25px;
  height: 25px;
  background-color: #8a8989;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;
export const CateGoryName = styled.div`
  width: 45px;
  height: 20px;
  background-color: #8a8989;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;
export const CateGoryQuantity = styled.div`
  width: 60px;
  height: 20px;
  background-color: #8a8989;
  animation: skeleton linear 2s infinite;
  @keyframes skeleton {
    50% {
      opacity: 0.4;
    }
  }
`;
