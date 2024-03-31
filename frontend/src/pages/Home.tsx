import { Flex, Heading } from "rebass";
import { MainContainer } from "../components/styled/MainContainer";
import SongCountInGenre from "../components/SongCountInGenre";
import CategoryCount from "../components/CategoryCount";
import ArtistsWork from "../components/ArtistsWork";

type Props = {};

export default function Home({}: Props) {
  return (
    <MainContainer>
      <Flex
        flexDirection="column"
        css={{ gap: "10px" }}
        backgroundColor={"var(--secondary)"}
      >
        <Heading fontSize="3" fontFamily="sans-serif" paddingLeft={2}>
          Home
        </Heading>
        {/* top  section */}
        <Flex flexWrap={"wrap"} css={{ gap: "5px", minHeight: "130px" }}>
          <Flex
            flexWrap={"wrap"}
            css={{ borderRadius: "4px", gap: "10px", width: "100%" }}
            backgroundColor={"var(--secondary)"}
            padding={"2"}
          >
            <CategoryCount />
          </Flex>
        </Flex>
        {/* top section end */}

        {/* number of songs in genre */}
        <Flex
          flexWrap={"wrap"}
          flexDirection={"column"}
          css={{ gap: "5px", overflowX: "auto" }}
          backgroundColor={"var(--secondary)"}
        >
          <Heading fontSize="3" fontFamily="sans-serif" paddingLeft={2}>
            Genres
          </Heading>
          <Flex
            css={{
              borderRadius: "4px",
              gap: "10px",
              overflowX: "auto",
              minHeight: "110px",
            }}
            padding={"2"}
          >
            <SongCountInGenre />
          </Flex>
        </Flex>
        {/* number of songs in genre end */}

        {/* Aritst's works  */}
        <Flex
          flexWrap={"wrap"}
          flexDirection={"column"}
          css={{ gap: "5px", overflowX: "auto" }}
          backgroundColor={"var(--secondary)"}
        >
          <Heading fontSize="3" fontFamily="sans-serif" paddingLeft={2}>
            Artist's Work
          </Heading>
          <Flex
            css={{
              borderRadius: "4px",
              gap: "10px",
              overflowX: "auto",
              minHeight: "135px",
            }}
            padding={"2"}
          >
            <ArtistsWork />
          </Flex>
        </Flex>

        {/*  Artist's Works End*/}
      </Flex>
    </MainContainer>
  );
}
