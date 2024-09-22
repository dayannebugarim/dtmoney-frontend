import { List } from "@/components/List";
import { Search } from "@/components/Search";
import { Box } from "@chakra-ui/react";

interface MainSectionProps {}

const transactionsData = [
  {
    title: "Desenvolvimento de site",
    value: 12000,
    type: "income",
    category: "Venda",
    date: "2022-04-13",
  },
  {
    title: "Hamburguer",
    value: 12000,
    type: "expense",
    category: "Venda",
    date: "2022-04-13",
  },
  {
    title: "Desenvolvimento de site",
    value: 12000,
    type: "income",
    category: "Venda",
    date: "2022-04-13",
  },
  {
    title: "Desenvolvimento de site",
    value: 12000,
    type: "income",
    category: "Venda",
    date: "2022-04-13",
  },
  {
    title: "Desenvolvimento de site",
    value: 12000,
    type: "income",
    category: "Venda",
    date: "2022-04-13",
  },
  {
    title: "Hamburguer",
    value: 12000,
    type: "expense",
    category: "Venda",
    date: "2022-04-13",
  },
  {
    title: "Hamburguer",
    value: 12000,
    type: "expense",
    category: "Venda",
    date: "2022-04-13",
  },
];

export const MainSection = () => {
  return (
    <>
      <Box width="60vw">
        <Search />
        <List data={transactionsData} />
      </Box>
    </>
  );
};
