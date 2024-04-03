import styled from "@emotion/styled";

import { FormItemsContainer } from "../styled/FormItemsContainer";
import { Input } from "../styled/Input";
import FormWrapper from "../FormWrapper";

const Select = styled.select`
  font-size: 16px;
  background-color: var(--primary);
  padding: 0.4rem;
  width: 100%;
`;
const Option = styled.option`
  &:hover {
    background-color: var(--secondary);
  }
`;

const options = [
  "Classical",
  "Electronic",
  "Folk",
  "Heavy Metal",
  "Hip hop",
  "Jazz",
  "Pop",
  "Rock",
  "Other",
];

type SongDetail = {
  title: string;
  artist: string;
  album: string;
  genre: string;
};

type SongDetailProps = SongDetail & {
  updateFields: (fields: Partial<SongDetail>) => void;
};

export default function AddSongDetail({
  title,
  artist,
  album,
  genre,
  updateFields,
}: SongDetailProps) {
  return (
    <FormWrapper title="Add Song  Details">
      <FormItemsContainer>
        <Input
          autoComplete="off"
          name="title"
          type="text"
          placeholder="Enter song title"
          autoFocus
          required
          value={title}
          onChange={(event) => updateFields({ title: event.target.value })}
        />
      </FormItemsContainer>
      <FormItemsContainer>
        <Input
          autoComplete="off"
          name="artist"
          type="text"
          placeholder="Enter artist name"
          required
          value={artist}
          onChange={(event) => updateFields({ artist: event.target.value })}
        />
      </FormItemsContainer>
      <FormItemsContainer>
        <Input
          autoComplete="off"
          name="album"
          type="text"
          placeholder="Enter album name"
          required
          value={album}
          onChange={(event) => updateFields({ album: event.target.value })}
        />
      </FormItemsContainer>
      <FormItemsContainer>
        <Select
          name="genre"
          required
          value={genre}
          onChange={(event) => updateFields({ genre: event.target.value })}
        >
          <Option defaultValue="other">Choose Genre</Option>
          {options.map((opti) => (
            <Option key={opti} value={opti.toLowerCase()}>
              {opti}
            </Option>
          ))}
        </Select>
      </FormItemsContainer>
    </FormWrapper>
  );
}
