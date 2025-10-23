import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in" data-testid="loading-state">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-lg font-medium text-foreground">{t('loading')}</p>
      <p className="text-sm text-muted-foreground mt-2">{t('dataSource')}</p>
    </div>
  );
}
