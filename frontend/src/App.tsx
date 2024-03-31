import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout.tsx";
import Songs from "./pages/Songs.tsx";
import Albums from "./pages/Albums.tsx";
import Artists from "./pages/Artists.tsx";
import Playlists from "./pages/Playlists.tsx";
import Home from "./pages/Home.tsx";
import AlbumSongs from "./pages/AlbumSongs.tsx";
import ArtistSong from "./pages/ArtistSongs.tsx";
import Genres from "./pages/Genres.tsx";
import GenreSongs from "./pages/GenreSongs.tsx";
import NotFound from "./pages/Not-Found.tsx";
import Landing from "./pages/Landing.tsx";
import AuthenticationGuard from "./pages/AuthenticationGuard.tsx";
import PlaylistSong from "./pages/PlaylistSongs.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "home",
      element: <AuthenticationGuard />,
      children: [
        {
          path: "",
          element: <RootLayout />,
          children: [
            { index: true, element: <Home /> },
            { path: "song", element: <Songs /> },
            {
              path: "album",
              element: <Albums />,
            },
            {
              path: "album/:albumName",
              element: <AlbumSongs />,
            },
            {
              path: "artist",
              element: <Artists />,
            },
            {
              path: "artist/:artistName",
              element: <ArtistSong />,
            },
            { path: "genre", element: <Genres /> },
            { path: "genre/:genre", element: <GenreSongs /> },
            { path: "playlist", element: <Playlists /> },
            {
              path: "playlist/:playlist/:playlistId",
              element: <PlaylistSong />,
            },
            { path: "*", element: <NotFound /> },
          ],
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
