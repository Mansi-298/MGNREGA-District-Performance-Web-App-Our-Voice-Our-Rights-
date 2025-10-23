import { useTranslation } from 'react-i18next';
import { Flag } from 'lucide-react';

export function HeroBanner() {
  const { t } = useTranslation();
  
  return (
    <div className="w-full bg-gradient-to-r from-primary via-primary to-[hsl(220_50%_30%)] py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center">
              <Flag className="w-7 h-7 md:w-9 md:h-9 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-1">
              {t('title')}
            </h1>
            <div className="h-1 w-32 md:w-48 bg-gradient-to-r from-saffron via-white to-india-green rounded-full"></div>
          </div>
        </div>
        <p className="text-primary-foreground/90 text-sm md:text-base mt-3 ml-[4.5rem] md:ml-20">
          {t('subtitle')}
        </p>
      </div>
    </div>
  );
}
