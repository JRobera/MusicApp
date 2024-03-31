import styled from "@emotion/styled";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchInput = styled.input`
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 10px 5px;
  font-size: 16px;
  width: 100%;
  background-color: var(--primary);
  margin: 3px;

  @media (min-width: 720px) {
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: 40%;
  }
`;

interface SearchProps extends React.HTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export default function Search({ placeholder, ...props }: SearchProps) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    navigate(`${location.pathname}?${params}`);
  };

  return (
    <SearchInput
      type="search"
      {...props}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
}
