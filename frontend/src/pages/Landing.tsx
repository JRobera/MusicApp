import styled from "@emotion/styled";
import { Flex, Heading, Text } from "rebass";
import { useMultistepForm } from "../hooks/useMultistepForm";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

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
  height: 100dvh;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  flex-wrap: wrap;
  gap: 60px;
  @media (max-width: 620px) {
    flex-direction: column;
    gap: 15px;
  }
`;
const ContentBox = styled.div`
  flex: 1;
  text-align: center;
  @media (max-width: 620px) {
    flex: none;
    width: 100%;
  }
`;

const LinkStyle = styled.p`
  font-size: 14px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default function Landing() {
  const { step, isFirst, nextStep, previousStep } = useMultistepForm([
    <Login />,
    <SignUp />,
  ]);

  return (
    <PageWrapper>
      <ContentBox>
        <Heading
          fontSize={"30px"}
          fontFamily={"sans-serif"}
          css={{ color: "#fff !important" }}
        >
          MUSIC
        </Heading>
        <Text css={{ color: "#fff !important" }}>
          Immerse yourself in the world of music with our sleek and intuitive
          web app. Discover, and create playlists effortlessly. Start your
          musical journey today!
        </Text>
      </ContentBox>
      <ContentBox>
        <Flex
          css={{
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--secondary)",
            padding: "15px 0 0",
            borderRadius: "4px",
          }}
        >
          {step}
          <LinkStyle onClick={() => (!isFirst ? nextStep() : previousStep())}>
            {isFirst ? "Already have An account?" : "Don't have an Account?"}
          </LinkStyle>
        </Flex>
      </ContentBox>
    </PageWrapper>
  );
}
