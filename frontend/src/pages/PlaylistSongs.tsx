import { useParams } from "react-router-dom";
import { MainContainer } from "../components/styled/MainContainer";
import { Box, Flex, Heading } from "rebass";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchSongsInPlaylistRequest,
  getAllSongsInPlaylist,
  reOrderPlaylistRequest,
} from "../features/playlist/songsInPlaylistSlice";
import SongItem from "../components/SongItem";
import { Button } from "../components/styled/Button";
import AddSongToPlaylist from "../components/AddSongToPlaylist";
import { getSongStatus } from "../features/songs/songSlice";
import { FaEquals } from "react-icons/fa";
import { setCurrentPlaylist } from "../features/currentPlaylist/currentPlaylistSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Dragable = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  & > div {
    flex: 1;
  }
`;

export default function PlaylistSong() {
  const { playlist, playlistId } = useParams();
  const dispatch = useDispatch();
  const songsInPlaylist = useSelector(getAllSongsInPlaylist);
  const songsStatus = useSelector(getSongStatus);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSongsInPlaylistRequest(playlistId));
  }, [dispatch, songsStatus]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleDragEnd = (result: any) => {
    let newList = [...songsInPlaylist];
    let [draggedItem] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, draggedItem);
    dispatch(reOrderPlaylistRequest({ newList, playlistId }));
    dispatch(setCurrentPlaylist({ data: newList }));
  };

  return (
    <MainContainer>
      <Flex
        css={{
          backgroundColor: "var(--secondary)",
          marginBottom: "5px",
          justifyContent: "space-between",
          padding: "2px",
          borderRadius: "5px",
        }}
      >
        <Heading fontSize="3" fontFamily="sans-serif" marginY={2}>
          Playlist / {playlist}
        </Heading>
        <Button onClick={handleToggle}>Add/Remove</Button>
      </Flex>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {songsInPlaylist.map((song, idx) => (
                <Draggable key={song._id} draggableId={song._id} index={idx}>
                  {(provided) => (
                    <Dragable
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <FaEquals
                        size={20}
                        style={{ cursor: "pointer" }}
                        title="Reorder"
                      />
                      <SongItem song={song} key={song._id} />
                    </Dragable>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {isOpen && playlistId && (
        <AddSongToPlaylist
          songsInPlaylist={songsInPlaylist}
          playlistId={playlistId}
          handleToggle={handleToggle}
        />
      )}
    </MainContainer>
  );
}
