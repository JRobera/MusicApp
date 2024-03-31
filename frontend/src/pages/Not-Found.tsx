import { MainContainer } from "../components/styled/MainContainer";

export default function NotFound() {
  return (
    <MainContainer style={{ height: "100%" }}>
      <h1
        style={{
          transform: "translate(-50%,-50%)",
          position: "relative",
          left: "50%",
          top: "50%",
          textAlign: "center",
        }}
      >
        Page not-found 404 😞
      </h1>
    </MainContainer>
  );
}
