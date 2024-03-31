import styled from "@emotion/styled";

const AvatarI = styled.img`
  border-radius: 50%;
  border: solid 1px var(--primary);
  width: 30px;
  height: 30px;
  text-align: center;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const IconsOnlyButton = styled.span`
  @media (max-width: 576px) {
    display: none;
  }
`;
type AvatarProps = {
  src: string;
  userName?: string;
};

export default function Avatar({ src, userName }: AvatarProps) {
  return (
    <AvatarWrapper title="Profile">
      <AvatarI src={src} alt="User profile" />
      <IconsOnlyButton>{userName}</IconsOnlyButton>
    </AvatarWrapper>
  );
}
