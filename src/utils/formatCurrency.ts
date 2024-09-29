const formatCurrency = (value: string) => {
  let formattedValue = value.replace(/[^0-9.,]/g, "");
  formattedValue = formattedValue.replace(/\./g, ",");

  const parts = formattedValue.split(",");
  if (parts.length > 2) {
    formattedValue = parts[0] + "," + parts[1].slice(0, 2);
  }

  if (parts.length === 2) {
    formattedValue = parts[0] + "," + parts[1].slice(0, 2);
  }

  return formattedValue;
};

export { formatCurrency };
