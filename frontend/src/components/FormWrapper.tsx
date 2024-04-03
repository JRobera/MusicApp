import { ReactNode } from "react";
import { Box, Heading } from "rebass";

type FormWrapperProps = {
  title: string;
  alignItem?: string;
  children: ReactNode;
};

export default function FormWrapper({
  title,
  alignItem,
  children,
}: FormWrapperProps) {
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
          alignItems: `${alignItem && "center"}`,
          gap: "10px",
        }}
      >
        {children}
      </Box>
    </>
  );
}
