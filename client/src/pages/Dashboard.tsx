import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { HeroBanner } from '@/components/HeroBanner';
import { Navbar } from '@/components/Navbar';
import { DistrictSelector } from '@/components/DistrictSelector';
import { MetricsGrid } from '@/components/MetricsGrid';
import { ChartView } from '@/components/ChartView';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { SkeletonGrid } from '@/components/SkeletonCard';
import { useToast } from '@/hooks/use-toast';
import type { StateInfo, DistrictInfo, MGNREGAMetrics } from '@shared/schema';

export default function Dashboard() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  
  // Fetch states
  const { data: states = [], isLoading: isLoadingStates } = useQuery<StateInfo[]>({
    queryKey: ['/api/states'],
  });
  
  // Fetch districts for selected state
  const { data: districts = [], isLoading: isLoadingDistricts } = useQuery<DistrictInfo[]>({
    queryKey: ['/api/districts', selectedState],
    enabled: !!selectedState,
  });
  
  // Fetch performance data for selected district
  const { 
    data: performanceData, 
    isLoading: isLoadingPerformance,
    error: performanceError,
    refetch
  } = useQuery<MGNREGAMetrics>({
    queryKey: ['/api/performance', selectedDistrict],
    enabled: !!selectedDistrict,
  });
  
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict('');
  };
  
  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
  };
  
  const handleAutoDetect = async () => {
    setIsDetecting(true);
    
    if (!navigator.geolocation) {
      toast({
        title: t('error'),
        description: t('locationError'),
        variant: 'destructive',
      });
      setIsDetecting(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `/api/location/reverse-geocode?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          
          if (!response.ok) throw new Error('Geocoding failed');
          
          const data = await response.json();
          
          // Find matching state
          const matchedState = states.find(
            s => s.name.toLowerCase().includes(data.state.toLowerCase())
          );
          
          if (matchedState) {
            setSelectedState(matchedState.code);
            
            // Wait a bit for districts to load
            setTimeout(() => {
              const matchedDistrict = districts.find(
                d => d.name.toLowerCase().includes(data.district.toLowerCase())
              );
              if (matchedDistrict) {
                setSelectedDistrict(matchedDistrict.code);
              }
            }, 500);
          }
          
          toast({
            title: t('autoDetect'),
            description: `${data.district}, ${data.state}`,
          });
        } catch (error) {
          toast({
            title: t('error'),
            description: t('locationError'),
            variant: 'destructive',
          });
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        toast({
          title: t('error'),
          description: error.code === 1 ? t('locationDenied') : t('locationError'),
          variant: 'destructive',
        });
        setIsDetecting(false);
      }
    );
  };
  
  // Generate mock chart data based on performance metrics
  const chartData = performanceData ? [
    {
      month: 'Jan',
      employed: Math.floor(performanceData.totalEmployed * 0.8),
      expenditure: Math.floor(performanceData.totalExpenditure * 0.75),
      personDays: Math.floor(performanceData.personDaysGenerated * 0.8),
    },
    {
      month: 'Feb',
      employed: Math.floor(performanceData.totalEmployed * 0.85),
      expenditure: Math.floor(performanceData.totalExpenditure * 0.82),
      personDays: Math.floor(performanceData.personDaysGenerated * 0.85),
    },
    {
      month: 'Mar',
      employed: Math.floor(performanceData.totalEmployed * 0.9),
      expenditure: Math.floor(performanceData.totalExpenditure * 0.88),
      personDays: Math.floor(performanceData.personDaysGenerated * 0.9),
    },
    {
      month: 'Apr',
      employed: Math.floor(performanceData.totalEmployed * 0.95),
      expenditure: Math.floor(performanceData.totalExpenditure * 0.93),
      personDays: Math.floor(performanceData.personDaysGenerated * 0.95),
    },
    {
      month: 'May',
      employed: performanceData.totalEmployed,
      expenditure: performanceData.totalExpenditure,
      personDays: performanceData.personDaysGenerated,
    },
  ] : [];
  
  return (
    <div className="min-h-screen bg-background">
      <HeroBanner />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <DistrictSelector
          states={states}
          districts={districts}
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
          onStateChange={handleStateChange}
          onDistrictChange={handleDistrictChange}
          onAutoDetect={handleAutoDetect}
          isDetecting={isDetecting}
          isLoadingDistricts={isLoadingDistricts}
        />
        
        <div className="mt-8">
          {!selectedDistrict ? (
            <EmptyState />
          ) : isLoadingPerformance ? (
            <SkeletonGrid />
          ) : performanceError ? (
            <ErrorState 
              message={(performanceError as Error).message} 
              onRetry={() => refetch()}
            />
          ) : performanceData ? (
            <>
              <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {performanceData.districtName}, {performanceData.stateName}
                  </h2>
                  {performanceData.lastUpdated && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('lastUpdated')}: {new Date(performanceData.lastUpdated).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              
              <MetricsGrid metrics={performanceData} />
              
              {chartData.length > 0 && (
                <ChartView data={chartData} />
              )}
              
              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                  {t('dataSource')}
                </p>
              </div>
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}
