import styled from "@emotion/styled";
import { useState } from "react";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Box, Image, Text } from "rebass";
import DeletePlaylistConfirmation from "./DeletePlaylistConfirmation";

const PlaylistInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 4px 2px;
  flex: 1;

  & :nth-of-type(1) {
    font-size: 15px;
    font-weight: bold;
  }
  & :last-child {
    font-size: 12px;
  }
`;

const PlaylistItem = styled.div`
  background-color: var(--secondary);
  flex: 1;
  min-width: 10rem;
  max-width: 13rem;
  max-height: 6rem;
  border-radius: 4px;
  padding: 8px;
  position: relative;
  @media (max-width: 395px) {
    max-width: 100%;
  }
`;

type PlaylistProps = {
  list: { _id: string; name: string; songs?: string[] };
};
export default function Playlist({
  list: { _id, name, songs },
}: PlaylistProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <PlaylistItem>
        <Link to={`${name}/${_id}`} style={{ display: "flex", height: "100%" }}>
          <Image
            src={
              "https://res.cloudinary.com/dbv6hao81/image/upload/v1711718939/player/public/albmW_l4ugaw.jpg"
            }
            alt="artist image"
            css={{ flex: 1, borderRadius: 4, height: "100%" }}
          />
          <PlaylistInfo>
            <Text>{name}</Text>
            <Text>{songs?.length}</Text>
          </PlaylistInfo>
        </Link>
        <Box
          css={{
            position: "absolute",
            top: "5px",
            right: "5px",
            cursor: "pointer",
          }}
          title="Delete playlist"
          onClick={handleToggle}
        >
          <IoRemoveCircleOutline size={20} />
        </Box>
      </PlaylistItem>
      {isOpen && (
        <DeletePlaylistConfirmation
          playlistName={name}
          playlistId={_id}
          handleToggle={handleToggle}
        />
      )}
    </>
  );
}
