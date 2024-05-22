export const formatDate = (date: string | undefined): string => {
  if (!date) return '';
  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return '';
  }

  const month = `0${d.getUTCMonth() + 1}`.slice(-2);
  const day = `0${d.getUTCDate()}`.slice(-2);
  const year = d.getUTCFullYear();
  return `${year}-${month}-${day}`;
};