import {
  PlaylistItemBox,
  PlaylistItemImage,
  PlaylistItemInfo,
  PlaylistItemSkeleton,
} from "./Playlist_S";

export const PlaylistSkeleton = () => (
  <>
    {[...Array(5).keys()].map((idx) => (
      <PlaylistItemSkeleton key={idx}>
        <PlaylistItemBox>
          <PlaylistItemImage />
          <PlaylistItemInfo>
            <span></span>
            <span></span>
          </PlaylistItemInfo>
        </PlaylistItemBox>
      </PlaylistItemSkeleton>
    ))}
  </>
);
