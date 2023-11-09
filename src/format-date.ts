function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatOrdinalDay(date: Date): string {
  const dayOfMonth = date.getDate();
  let suffix = 'th';

  if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
    suffix = 'st';
  } else if (dayOfMonth === 2 || dayOfMonth === 22) {
    suffix = 'nd';
  } else if (dayOfMonth === 3 || dayOfMonth === 23) {
    suffix = 'rd';
  }

  return `${dayOfMonth}${suffix}`;
}

export function formatQuestion(question: { startDate: string; endDate: string }): string {
  const startDate = new Date(question.startDate);
  const endDate = new Date(question.endDate);

  const startDateFormatted = `${startDate.getFullYear()} ${startDate.toLocaleString('en-US', { month: 'long' })} ${formatOrdinalDay(startDate)}`;
  const endDateFormatted = `${endDate.getFullYear()} ${endDate.toLocaleString('en-US', { month: 'long' })} ${formatOrdinalDay(endDate)}`;

  return `${startDateFormatted} - ${endDateFormatted}`;
}
