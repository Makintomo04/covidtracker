export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export function CommaFormatted(amount) {
  return amount.toLocaleString("en-US");
}
