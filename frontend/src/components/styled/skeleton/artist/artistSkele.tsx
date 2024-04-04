import {
  ArtistBoxSkeleton,
  ArtistImageSkeleton,
  ArtistInfoSkeleton,
  ArtistItemSkeleton,
} from "./Artist_S";

export const ArtistSkeleton = () => (
  <>
    {[...Array(5).keys()].map((idx) => (
      <ArtistItemSkeleton key={idx}>
        <ArtistBoxSkeleton>
          <ArtistImageSkeleton />
          <ArtistInfoSkeleton>
            <span></span>
            <span></span>
          </ArtistInfoSkeleton>
        </ArtistBoxSkeleton>
      </ArtistItemSkeleton>
    ))}
  </>
);
