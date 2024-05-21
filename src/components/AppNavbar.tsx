import Logo from "/public/logo.gif";
import SearchIcon from "../assets/svg/search.svg";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
//import SearchByAi from "./gpt/SearchByAi";

interface ISearchData {
  searchText: string;
}
interface AppNavbarProps {
  searchText: (data: string) => void;
}
export default function AppNavbar({ searchText }: AppNavbarProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchData>();

  const handleSearchText = handleSubmit((data) => {
    console.log("SearchTextInNavbar:-", data);

    searchText(data.searchText);
  });

  console.log(errors);
  return (
    <Navbar disableAnimation maxWidth="full" className="bg-transparent">
      <NavbarContent className="mt-10" justify="center">
        <NavbarBrand>
          <img
            src={Logo}
            width={100}
            height={100}
            alt="Commune AI BooksSearchEngine logo"></img>
          <p className="text-4xl text-white">Commune AI BooksSearchEngine</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="mt-10">
        <form
          onSubmit={handleSearchText}
          className="flex items-center rounded-none">
          <Input
            {...register("searchText", { required: true })}
            autoComplete="off"
            classNames={{
              base: "w-full h-10 ",
              mainWrapper: "h-full w-[30vw] ",
              input: "text-small px-2",
              inputWrapper:
                "h-full font-normal text-default-500 bg-white dark:bg-default-500/20 rounded-l-full",
            }}
            placeholder={`Search with AI, for example: "Suggest JavaScript books?"`}
            size="sm"
            type="search"
            fullWidth={true}
          />
          <Button
            type="submit"
            // fullWidth
            className="rounded-r-full bg-white border border-l-1 px border-gray-50 "
            isIconOnly>
            <img src={SearchIcon} alt="ai logo" className="w-4" />
          </Button>
        </form>
        {/* <SearchByAi /> */}
      </NavbarContent>
    </Navbar>
  );
}
