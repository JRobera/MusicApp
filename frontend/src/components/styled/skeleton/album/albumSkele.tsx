import { AlbumItemSkeleton } from "./Album_S";

export const AlbumSkeleton = () => (
  <>
    {[...Array(5).keys()].map((idx) => (
      <AlbumItemSkeleton key={idx} />
    ))}
  </>
);
