import { useState } from 'react';

const useCurrencyFormat = () => {
  const [formattedValue, setFormattedValue] = useState<string>('');

  const formatCurrency = (value: number) => {
    const options: Intl.NumberFormatOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'ARS',
      currencyDisplay: 'symbol',
      useGrouping: true,
      notation: 'standard',
    };

    const formattedNumber = new Intl.NumberFormat('es-AR', options).format(value);
    setFormattedValue(formattedNumber);
  };

  return [formattedValue, formatCurrency] as const;
};

export default useCurrencyFormat;