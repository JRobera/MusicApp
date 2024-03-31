import { NavLink } from "react-router-dom";
import { Flex } from "rebass";
import { LinkItem } from "./styled/LinkItem";
import { CiHome } from "react-icons/ci";
import { CiMusicNote1 } from "react-icons/ci";
import { CgMenuGridR } from "react-icons/cg";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { SlPlaylist } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";

import styled from "@emotion/styled";
import { Button } from "./styled/Button";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { currentUser } from "../features/user/userSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 12rem;
  background-color: var(--secondary);
  @media (max-width: 576px) {
    width: 50px;
  }
`;
const LogoComponent = styled.h2`
  margin-top: 2px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  @media (max-width: 576px) {
    font-size: 15px;
  }
`;
const IconsOnlyButton = styled.span`
  @media (max-width: 576px) {
    display: none;
  }
`;

type SideBarLinks = {
  linkName: "Song" | "Album" | "Artist" | "Genre" | "Home" | "Playlist";
  link: "song" | "album" | "artist" | "genre" | "" | "playlist";
};

const linkList: SideBarLinks[] = [
  { linkName: "Home", link: "" },
  { linkName: "Song", link: "song" },
  { linkName: "Album", link: "album" },
  { linkName: "Artist", link: "artist" },
  { linkName: "Genre", link: "genre" },
  { linkName: "Playlist", link: "playlist" },
];

export default function SideBar() {
  const currUser = useSelector(currentUser);
  const handleLogOut = () => {
    window.open(import.meta.env.VITE_LOGOUT_REDIRECT_URL, "_self");
  };

  return (
    <Container>
      <LogoComponent>Music</LogoComponent>
      <Flex flexDirection={"column"} flex={1} mt={4}>
        {linkList.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.link}
            end
            style={({ isActive }) => ({
              backgroundColor: isActive ? `var(--bg-player)` : "",
            })}
          >
            <LinkItem>
              {link.linkName === "Album" ? (
                <MdOutlineLibraryMusic size={20} title="Album" />
              ) : link.linkName === "Artist" ? (
                <IoPersonOutline size={20} title="Artist" />
              ) : link.linkName === "Home" ? (
                <CiHome size={20} title="Home" />
              ) : link.linkName === "Genre" ? (
                <CgMenuGridR size={20} title="Genre" />
              ) : link.linkName === "Song" ? (
                <CiMusicNote1 size={20} title="Songs" />
              ) : link.linkName === "Playlist" ? (
                <SlPlaylist size={20} title="Playlist" />
              ) : null}
              <IconsOnlyButton>{link.linkName}</IconsOnlyButton>
            </LinkItem>
          </NavLink>
        ))}
      </Flex>
      <Avatar
        src={currUser ? currUser.profile : ""}
        userName={currUser ? currUser.userName : ""}
      />
      <Button onClick={handleLogOut}>
        <CiLogout size={20} title="Log out" />
        <IconsOnlyButton>Logout</IconsOnlyButton>
      </Button>
    </Container>
  );
}
