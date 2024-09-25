import { Box, Image, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface TypeRadioProps {
  setType: Dispatch<SetStateAction<string>>;
  value?: string
}

function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box width="50%" as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        bg="#29292E"
        border="1px"
        borderColor="transparent"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _checked={{
          bg: props.color,
          borderColor: props.border,
        }}
        _focus={{
          border: "1px",
          borderColor: props.border,
        }}
        px={5}
        py={3}
      >
        <Image src={props.icon} boxSize="24px" marginRight="8px" alt="Transaction type icon" />
        {props.children}
      </Box>
    </Box>
  );
}
export const TypeRadio = ({ setType, value }: TypeRadioProps) => {
  const options = [
    {
      text: "Entrada",
      value: "Income",
      icon: "icons/income-icon.svg",
      color: "rgba(0, 179, 126, 0.1)",
      border: "#00B37E",
    },
    {
      text: "Saída",
      value: "Expense",
      icon: "icons/expense-icon.svg",
      color: "rgba(247, 90, 104, 0.1)",
      border: "#F75A68",
    },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "transactionType",
    value: value,
    onChange: setType,
  });

  const group = getRootProps();

  return (
    <HStack w="100%" {...group}>
      {options.map((option) => {
        const radio = getRadioProps({ value: option.value });
        return (
          <RadioCard
            key={option.value}
            {...radio}
            icon={option.icon}
            color={option.color}
            border={option.border}
          >
            {option.text}
          </RadioCard>
        );
      })}
    </HStack>
  );
};
