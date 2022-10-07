import { useTranslation } from 'react-i18next';

export default function useFormatCurrency(): (value: number) => string {
  const { i18n, t } = useTranslation();
  const { language } = i18n;

  return (value: number) => {
    return Intl.NumberFormat(language, {
      style: 'currency',
      currency: t('currencyCode')
    }).format(value);
  };
}
