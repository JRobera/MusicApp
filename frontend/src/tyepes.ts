export type song = {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImage: { imageUrl: string; public_id: string };
  song: { songUrl: string; public_id: string };
  createdAt: string;
  updatedAt: string;
};

export type PlaylistItem = {
  _id: string;
  name: string;
  song: string[];
};

export type genre = { genre: string; songCount: number };

export type album = { artist: string; albumTitle: string; songCount: number };

export type artist = {
  artist: string;
  coverImage: { imageUrl: string; public_id: string };
  songCount: number;
};

export type user = {
  _id: string;
  userName: string;
  profile: string;
  email: string;
};

export type playlist = song[];

export type response = { data: song[]; status?: number; message?: string };
