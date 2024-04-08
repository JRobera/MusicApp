import { Input } from "../styled/Input";
import { FormItemsContainer } from "../styled/FormItemsContainer";
import FormWrapper from "../FormWrapper";

type Song = {
  newSong: File | "";
};

type SongProps = Song & {
  updateFields: (fields: Partial<Song>) => void;
};

export default function AddSong({ newSong, updateFields }: SongProps) {
  function handleSongChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    if (!event.target.files || event.target.files.length === 0) return;
    updateFields({ newSong: event.target.files[0] });
  }
  // function handleSongDrop(event: React.DragEvent<HTMLInputElement>): void {
  //   event.preventDefault();
  //   if (!event.dataTransfer.files || event.dataTransfer.files.length === 0)
  //     return;
  //   updateFields({ newSong: event.dataTransfer.files[0] });
  // }
  return (
    <FormWrapper title="Add song file">
      <FormItemsContainer
        border={"dashed 2px var(--bg-player)"}
        padding={"10px"}
        height="10rem"
        cursor={"pointer"}
        justifyContent={"center"}
        htmlFor="songupload"
      >
        {newSong ? newSong.name : "Upload Song"}
        <Input
          // onDragOver={(event) => event.preventDefault()}
          // onDrop={handleSongDrop}
          autoFocus
          id="songupload"
          type="file"
          accept="audio/*"
          width="0"
          opacity={0}
          padding="1px"
          required={!newSong}
          onChange={handleSongChange}
          name="newSong"
        />
      </FormItemsContainer>
    </FormWrapper>
  );
}
