import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Loader2 } from 'lucide-react';
import type { StateInfo, DistrictInfo } from '@shared/schema';

interface DistrictSelectorProps {
  states: StateInfo[];
  districts: DistrictInfo[];
  selectedState: string;
  selectedDistrict: string;
  onStateChange: (state: string) => void;
  onDistrictChange: (district: string) => void;
  onAutoDetect: () => void;
  isDetecting: boolean;
  isLoadingDistricts: boolean;
}

export function DistrictSelector({
  states,
  districts,
  selectedState,
  selectedDistrict,
  onStateChange,
  onDistrictChange,
  onAutoDetect,
  isDetecting,
  isLoadingDistricts,
}: DistrictSelectorProps) {
  const { t, i18n } = useTranslation();
  
  const getLocalizedName = (item: StateInfo | DistrictInfo): string => {
    if (i18n.language === 'hi' && item.nameHindi) {
      return item.nameHindi;
    } else if (i18n.language === 'mr' && item.nameMarathi) {
      return item.nameMarathi;
    }
    return item.name;
  };
  
  return (
    <div className="w-full bg-card rounded-lg border border-card-border p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-foreground mb-2">
            {t('selectState')}
          </label>
          <Select value={selectedState} onValueChange={onStateChange}>
            <SelectTrigger 
              className="w-full h-11 bg-background"
              data-testid="select-state"
            >
              <SelectValue placeholder={t('selectState')} />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem 
                  key={state.code} 
                  value={state.code}
                  data-testid={`option-state-${state.code}`}
                >
                  {getLocalizedName(state)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-foreground mb-2">
            {t('selectDistrict')}
          </label>
          <Select 
            value={selectedDistrict} 
            onValueChange={onDistrictChange}
            disabled={!selectedState || isLoadingDistricts}
          >
            <SelectTrigger 
              className="w-full h-11 bg-background"
              data-testid="select-district"
            >
              <SelectValue placeholder={t('selectDistrict')} />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem 
                  key={district.code} 
                  value={district.code}
                  data-testid={`option-district-${district.code}`}
                >
                  {getLocalizedName(district)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={onAutoDetect}
          disabled={isDetecting}
          variant="outline"
          className="h-11 gap-2 whitespace-nowrap"
          data-testid="button-auto-detect"
        >
          {isDetecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('detecting')}
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4" />
              {t('autoDetect')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
