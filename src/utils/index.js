export const formatCurrency = (value, lng) => {
  const number = Number(value);
  switch(lng) {
    case 'pl':
      return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(number);
    case 'en':
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'GBP' }).format(number);
    default:
      return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(number);
  }
}


export const formatDate = dateString => {
  const date = new Date(dateString);

  return Intl.DateTimeFormat('pl-PL').format(date);
}