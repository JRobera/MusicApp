import {
  SongCoverBoxSkeleton,
  SongCoverSkeleton,
  SongDetailSkeleton,
  SongInfoSkeleton,
  SongItemContainerSkeleton,
  SongItemInfoBoxSkeleton,
} from "./SongItem_S";

export const SongItemSkeleton = () => (
  <>
    {[...Array(10).keys()].map((idx) => (
      <SongItemContainerSkeleton key={idx}>
        <SongItemInfoBoxSkeleton>
          <SongDetailSkeleton>
            <SongCoverBoxSkeleton>
              <SongCoverSkeleton />
            </SongCoverBoxSkeleton>
            <SongInfoSkeleton>
              <span></span>
              <span></span>
            </SongInfoSkeleton>
          </SongDetailSkeleton>
        </SongItemInfoBoxSkeleton>
      </SongItemContainerSkeleton>
    ))}
  </>
);
