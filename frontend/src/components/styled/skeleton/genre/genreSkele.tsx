import { GenreItemInfo, GenreItemInfoBox, GenreItemSkeleton } from "./Genre_S";

export const GenreSkeleton = () => (
  <>
    {[...Array(5).keys()].map((idx) => (
      <GenreItemSkeleton key={idx}>
        <GenreItemInfoBox>
          <GenreItemInfo />
          <GenreItemInfo />
        </GenreItemInfoBox>
      </GenreItemSkeleton>
    ))}
  </>
);
