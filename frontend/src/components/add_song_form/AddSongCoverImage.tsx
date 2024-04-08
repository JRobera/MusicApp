import FormWrapper from "../FormWrapper";
import { FormItemsContainer } from "../styled/FormItemsContainer";
import { Input } from "../styled/Input";

type CoverImage = {
  coverImage: File | "";
};
type SongCoverImageProps = CoverImage & {
  updateFields: (fields: Partial<CoverImage>) => void;
};

export default function AddSongCoverImage({
  coverImage,
  updateFields,
}: SongCoverImageProps) {
  function handleCoverImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (!event.target.files || event.target.files.length === 0) return;
    updateFields({ coverImage: event.target.files[0] });
  }
  // function handleCoverImageDrop(event: React.DragEvent<HTMLInputElement>) {
  //   event.preventDefault();
  //   if (!event.dataTransfer.files || event.dataTransfer.files.length === 0)
  //     return;
  //   updateFields({ coverImage: event.dataTransfer.files[0] });
  // }
  return (
    <FormWrapper title="Add song cover image">
      <FormItemsContainer
        border={"dashed 2px var(--bg-player)"}
        padding={"20px"}
        height="10rem"
        cursor={"pointer"}
        justifyContent={"center"}
        htmlFor="imageupload"
      >
        {coverImage ? coverImage.name : "Upload Image"}
        <Input
          // onDragOver={(event) => event.preventDefault()}
          // onDrop={handleCoverImageDrop}
          autoFocus
          id="imageupload"
          type="file"
          accept="image/*"
          width="0"
          opacity={0}
          padding="1px"
          required={!coverImage}
          onChange={handleCoverImageChange}
          name="coverImage"
        />
      </FormItemsContainer>
    </FormWrapper>
  );
}
