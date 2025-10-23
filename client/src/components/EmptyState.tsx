import { useTranslation } from 'react-i18next';
import { FileSearch } from 'lucide-react';

export function EmptyState() {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in" data-testid="empty-state">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
        <FileSearch className="w-10 h-10 text-muted-foreground" />
      </div>
      <p className="text-lg font-medium text-foreground mb-2">{t('selectDistrictPrompt')}</p>
      <p className="text-sm text-muted-foreground max-w-md text-center">
        {t('dataSource')}
      </p>
    </div>
  );
}
