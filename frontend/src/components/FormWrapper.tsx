import { ReactNode } from "react";
import { Box, Heading } from "rebass";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export default function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <Heading textAlign={"center"} fontSize="3" fontFamily="sans-serif">
        {title}
      </Heading>
      <Box
        css={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {children}
      </Box>
    </>
  );
}
