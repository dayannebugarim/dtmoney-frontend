import { useAuthContext } from "@/contexts/AuthContext";
import { transactionsYearSummaryRequest } from "@/services/http/transaction";
import { TransactionsYearSummaryResponse } from "@/services/http/transaction/types";
import { Box, Divider, Heading, HStack } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import {
  format,
  isWithinInterval,
  parseISO,
  startOfMonth,
  subDays,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { Select, SingleValue } from "chakra-react-select";
import { chakraSelectStyles } from "@/styles/selectTheme";
import { useTransactionContext } from "@/contexts/TransactionsContext";
import { theme } from "./styles";
import { ChartSkeleton } from "./ChartSkeleton";

const FilterOptions = {
  LAST_SEVEN_DAYS: "lastSevenDays",
  MONTH: "month",
  YEAR: "year",
};

type OptionType = {
  label: string;
  value: string;
};

export const LinearChart = () => {
  const { user } = useAuthContext();
  const { hasUpdated } = useTransactionContext();
  const [data, setData] = useState<TransactionsYearSummaryResponse[]>([]);
  const [filter, setFilter] = useState<string | undefined>(
    FilterOptions.LAST_SEVEN_DAYS
  );
  const [isSelectLoading, setSelectIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSelectIsLoading(true);
    async function getData() {
      if (!user?.id) return;

      const response = await transactionsYearSummaryRequest(user?.id);
      setData(response);
      setSelectIsLoading(false);
      setIsLoaded(true);
    }
    getData();
  }, [user?.id, hasUpdated]);

  const today = new Date();

  const getFilteredData = () => {
    if (filter === FilterOptions.LAST_SEVEN_DAYS) {
      const sevenDaysAgo = subDays(today, 6);
      return data
        .filter((d) => {
          const date = parseISO(d.date);
          return isWithinInterval(date, { start: sevenDaysAgo, end: today });
        })
        .map((d) => ({
          ...d,
          date: format(parseISO(d.date), "EEE", { locale: ptBR }).slice(0, 3),
        }));
    } else if (filter === FilterOptions.MONTH) {
      const monthStart = startOfMonth(today);
      return data
        .filter((d) =>
          isWithinInterval(parseISO(d.date), { start: monthStart, end: today })
        )
        .map((d, index) => ({
          ...d,
          date: format(parseISO(d.date), "dd"),
          showLabel: data.length > 20 ? index % 2 === 0 : true,
        }));
    } else if (filter === FilterOptions.YEAR) {
      const months = {
        jan: { totalIncome: 0, totalExpense: 0, total: 0 },
        fev: { totalIncome: 0, totalExpense: 0, total: 0 },
        mar: { totalIncome: 0, totalExpense: 0, total: 0 },
        abr: { totalIncome: 0, totalExpense: 0, total: 0 },
        mai: { totalIncome: 0, totalExpense: 0, total: 0 },
        jun: { totalIncome: 0, totalExpense: 0, total: 0 },
        jul: { totalIncome: 0, totalExpense: 0, total: 0 },
        ago: { totalIncome: 0, totalExpense: 0, total: 0 },
        set: { totalIncome: 0, totalExpense: 0, total: 0 },
        out: { totalIncome: 0, totalExpense: 0, total: 0 },
        nov: { totalIncome: 0, totalExpense: 0, total: 0 },
        dez: { totalIncome: 0, totalExpense: 0, total: 0 },
      };

      const monthOrder = [
        "jan",
        "fev",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez",
      ];

      data.forEach((d) => {
        const monthAbbreviation = format(parseISO(d.date), "MMM", {
          locale: ptBR,
        }).toLowerCase();

        if (monthAbbreviation in months) {
          months[monthAbbreviation as keyof typeof months].totalIncome +=
            d.totalIncome;
          months[monthAbbreviation as keyof typeof months].totalExpense +=
            d.totalExpense;
          months[monthAbbreviation as keyof typeof months].total += d.total;
        }
      });

      const currentMonthIndex = monthOrder.indexOf(
        format(today, "MMM", { locale: ptBR }).toLowerCase()
      );

      const filteredMonths = Object.entries(months).filter(
        ([month]) => monthOrder.indexOf(month) <= currentMonthIndex
      );

      return filteredMonths.map(([month, values]) => ({
        date: month,
        ...values,
      }));
    }

    return data;
  };

  const chartData = [
    {
      id: "Entrada",
      data: getFilteredData().map((d) => ({
        x: d.date,
        y: d.totalIncome,
      })),
    },
    {
      id: "Saída",
      data: getFilteredData().map((d) => ({
        x: d.date,
        y: d.totalExpense,
      })),
    },
  ];

  const options = [
    {
      value: FilterOptions.LAST_SEVEN_DAYS,
      label: "Últimos 7 dias",
    },
    {
      value: FilterOptions.MONTH,
      label: "Este mês",
    },
    {
      value: FilterOptions.YEAR,
      label: "Este ano",
    },
  ];

  const handleChange = (newValue: unknown) => {
    if (newValue && typeof newValue === "object" && "value" in newValue) {
      const selectedOption = newValue as SingleValue<OptionType>;
      setFilter(selectedOption?.value);
    }
  };

  return (
    <Box width="100%" 
    // border="1px" borderColor="red"
    >
      <HStack display="flex" justifyContent="space-between" paddingBottom={3}>
        <Heading size="sm">Progresso</Heading>
        <Select
          size="lg"
          variant="filled"
          isSearchable={false}
          defaultValue={options[0]}
          isDisabled={isSelectLoading}
          onChange={handleChange}
          isLoading={isSelectLoading}
          selectedOptionStyle="check"
          options={options}
          chakraStyles={chakraSelectStyles}
        />
      </HStack>
      <Divider borderColor="#323238" />
      <Box
        rounded="md"
        height={300}
        width="100%"
        backgroundColor="#29292E"
        border="1px"
        borderColor="#2e2e35"
        marginTop={2.5}
      >
        {data && isLoaded ? (
          <ResponsiveLine
            data={chartData}
            curve="monotoneX"
            margin={{ top: 30, right: 30, bottom: 40, left: 55 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            enableSlices="x"
            colors={["#00875F", "#F75A68"]}
            theme={theme}
            enableArea={true}
            areaBlendMode="soft-light"
            areaOpacity={0.15}
            areaBaselineValue={0}
            pointSize={0}
            pointBorderWidth={0}
            pointLabelYOffset={-12}
            useMesh={true}
            motionConfig="slow"
            axisBottom={{
              tickValues: getFilteredData().map((d, index) => {
                if (
                  filter === FilterOptions.MONTH &&
                  getFilteredData().length > 20
                ) {
                  return index % 2 === 0 ? d.date : "";
                }
                return d.date;
              }),
            }}
          />
        ) : (
          <ChartSkeleton isLoaded={isLoaded} />
        )}
      </Box>
    </Box>
  );
};
