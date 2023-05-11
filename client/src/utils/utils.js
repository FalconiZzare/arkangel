import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const base_url = 'http://localhost:5000/api';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

export const formatCurrency = (value, decimalPlaces) => {
  const currency = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });

  return currency.format(value);
};
