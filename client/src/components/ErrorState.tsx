import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in" data-testid="error-state">
      <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <p className="text-lg font-medium text-foreground mb-2">{t('error')}</p>
      <p className="text-sm text-muted-foreground mb-6" data-testid="text-error-message">
        {message || t('apiError')}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" data-testid="button-retry">
          {t('apiError').includes('again') ? 'Try Again' : 'Retry'}
        </Button>
      )}
    </div>
  );
}
