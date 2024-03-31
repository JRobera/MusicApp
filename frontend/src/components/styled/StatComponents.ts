import styled from "@emotion/styled";

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
  // align-items: center;
  background-color: var(--primary);
  padding: 20px;
  border-radius: 4px;
  min-width: 10rem;
  max-width: 20rem;
  flex: 1;
  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 0px 15px var(--bg-player);
  }
`;
export const StatItemName = styled.div`
  font-size: 12px;
  font-weight: bold;
`;
export const StatItemQuantity = styled.div`
  font-weight: bold;
  font-size: 21px;
`;

export const ArtistWork = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: var(--primary);
  padding: 10px;
  min-width: 20rem;
  &:hover {
    transform: scale(1.01);
    box-shadow: 3px 3px 15px var(--bg-player);
  }
`;
