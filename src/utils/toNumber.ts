const toNumber = (value: string) => {
  const numericValue = parseFloat(value.replace(",", "."));
  return isNaN(numericValue) ? 0 : numericValue;
};

export { toNumber };
