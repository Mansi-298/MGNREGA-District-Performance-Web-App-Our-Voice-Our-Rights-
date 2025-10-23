import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हि' },
    { code: 'mr', label: 'मर' },
  ];
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="flex items-center gap-2" data-testid="language-toggle">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex gap-1 bg-muted rounded-md p-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            size="sm"
            variant={i18n.language === lang.code ? "default" : "ghost"}
            onClick={() => changeLanguage(lang.code)}
            className="h-7 px-3 text-xs font-medium transition-all"
            data-testid={`button-language-${lang.code}`}
          >
            {lang.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
