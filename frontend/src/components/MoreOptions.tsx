import styled from "@emotion/styled";
import { useRef } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Flex } from "rebass";

const OptionItem = styled.span`
  display: flex;
  gap: 5px;
  border-radius: 4px;
  padding: 5px;
  &:hover {
    background-color: var(--primary);
  }
`;
type action = "Edit" | "Delete" | "";
type optionListType = {
  name: action;
  icon: string;
};
const optionList: optionListType[] = [
  { name: "Edit", icon: "CiEdit" },
  { name: "Delete", icon: "CiEdit" },
];
type MoreOptionsProps = {
  song_id: string;
  handleToggleOptions: () => void;
  handleOverLayToggle: (action: action) => void;
};

export default function MoreOptions({
  handleToggleOptions,
  handleOverLayToggle,
}: MoreOptionsProps) {
  const optionRef = useRef(null);
  function handleOptionClick(
    event: React.MouseEvent<HTMLSpanElement>,
    action: action
  ) {
    if (action !== "") {
      handleOverLayToggle(action);
    }

    if (event.target == optionRef.current) {
      handleToggleOptions();
    }
  }
  return (
    <Flex
      css={{
        flexDirection: "column",
        gap: "10px",
        position: "absolute",
        top: "30px",
        right: "0",
        zIndex: "10",
        padding: "5px",
        backgroundColor: "var(--secondary)",
      }}
      ref={optionRef}
    >
      {optionList.map((option) => (
        <OptionItem
          key={option.name}
          onClick={(event) => handleOptionClick(event, option.name)}
        >
          {option.name === "Edit" ? (
            <CiEdit size={20} />
          ) : (
            <MdDeleteOutline size={20} />
          )}
          {option.name}
        </OptionItem>
      ))}
    </Flex>
  );
}
