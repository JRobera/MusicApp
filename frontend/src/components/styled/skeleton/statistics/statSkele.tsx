import {
  ArtistWorkBoxSkeleton,
  ArtistWorkNameSkeleton,
  ArtistWorkQuantitySkeleton,
  ArtistWorkSkeleton,
} from "./ArtistsWork_S";
import {
  CateGoryIcon,
  CateGoryName,
  CateGoryQuantity,
  CategorySkeleton,
} from "./Category_S";
import {
  SongCInGenreName,
  SongCInGenreQuantity,
  SongCInGenreSkeleton,
} from "./SongCountInGenre_S";

export const CategorySkeleton_C = () => (
  <>
    {[...Array(4).keys()].map((idx) => (
      <CategorySkeleton key={idx}>
        <CateGoryIcon />
        <CateGoryName />
        <CateGoryQuantity />
      </CategorySkeleton>
    ))}
  </>
);

export const SongCountInGenreSkeleton_C = () => (
  <>
    {[...Array(3).keys()].map((idx) => (
      <SongCInGenreSkeleton key={idx}>
        <SongCInGenreQuantity />
        <SongCInGenreName />
      </SongCInGenreSkeleton>
    ))}
  </>
);

export const ArtistWorkSkeleton_C = () => (
  <>
    {[...Array(3).keys()].map((idx) => (
      <ArtistWorkSkeleton key={idx}>
        <ArtistWorkNameSkeleton />
        <ArtistWorkBoxSkeleton>
          <ArtistWorkNameSkeleton>
            <ArtistWorkQuantitySkeleton />
          </ArtistWorkNameSkeleton>
          <ArtistWorkNameSkeleton>
            <ArtistWorkQuantitySkeleton />
          </ArtistWorkNameSkeleton>
        </ArtistWorkBoxSkeleton>
      </ArtistWorkSkeleton>
    ))}
  </>
);
