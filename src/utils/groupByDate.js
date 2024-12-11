export const groupByDate = (data) => {
  const grouped = data.reduce((result, item) => {
    const date = item.date;
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(item);
    return result;
  }, {});
  return Object.keys(grouped).map(date => ({
    date,
    data: grouped[date],
  }));
}