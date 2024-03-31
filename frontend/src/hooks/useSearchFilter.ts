import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { PlaylistItem, album, artist, playlist, song } from "../tyepes";

type FilterPropsType = any[];

export function useSearchFilter(lists: FilterPropsType, tab: string) {
  const [currentList, setCurrentList] = useState(lists);

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  // Filter songs by query parameter 'q
  useEffect(() => {
    if (q) {
      const filterdSongs = lists.filter((item) => {
        if (tab === "song") {
          return item.title.toLowerCase().includes(q.toLowerCase());
        } else if (tab === "album") {
          return item.albumTitle.toLowerCase().includes(q.toLowerCase());
        } else if (tab === "artist") {
          return item.artist.toLowerCase().includes(q.toLowerCase());
        } else if (tab === "genre") {
          return item.genre.toLowerCase().includes(q.toLowerCase());
        } else if (tab === "playlist") {
          return item.name.toLowerCase().includes(q.toLowerCase());
        }
      });
      setCurrentList(filterdSongs);
    } else {
      setCurrentList(lists);
    }
  }, [q, lists]);

  return { currentList };
}
