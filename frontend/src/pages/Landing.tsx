import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Box, Flex, Heading, Image, Text } from "rebass";

const PageWrapper = styled.div`
  display: flex;
  background-color: rgb(var(--primary));
  background-image: url("https://res.cloudinary.com/dbv6hao81/image/upload/v1711718902/player/public/musicappbg_sb3a1t.jpg"),
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
  @media (max-width: 620px) {
    flex-direction: column;
  }
`;
const ContentBox = styled.div`
  flex: 1;
  text-align: center;
  @media (max-width: 620px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const LinkWrapper = styled.div`
  color: black !important;
  background-color: white !important;
  border-radius: 6px;
  &:hover {
    box-shadow: 0 0 15px var(--bg-player);
  }
`;

const LinkStyle = {
  backgroundColor: "var(--primary)",
  display: "flex",
  borderRadius: "5px",
  padding: "10px",
  gap: "10px",
  justifyContent: "center",
  alignItems: "center",
};

export default function Landing() {
  return (
    <PageWrapper>
      <ContentBox>
        <Heading fontSize={"30px"} fontFamily={"sans-serif"}>
          MUSIC
        </Heading>
        <Text>
          Immerse yourself in the world of music with our sleek and intuitive
          web app. Discover, and create playlists effortlessly. Start your
          musical journey today!
        </Text>
      </ContentBox>
      <Box css={{ flex: "1" }}>
        <Flex
          css={{
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text fontSize={"20px"}>Sign in</Text>
          <LinkWrapper>
            <Link to={import.meta.env.VITE_LOGIN_URL} style={LinkStyle}>
              <Image
                src="https://res.cloudinary.com/dbv6hao81/image/upload/v1711718428/player/public/GoogleLogo_p0rwoh.png"
                alt="Google Sign In"
                css={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                }}
              />
              Sign in With Google
            </Link>
          </LinkWrapper>
        </Flex>
      </Box>
    </PageWrapper>
  );
}
