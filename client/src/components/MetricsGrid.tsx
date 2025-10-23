import { useTranslation } from 'react-i18next';
import { MetricCard } from './MetricCard';
import { Users, IndianRupee, Calendar, TrendingUp, Wallet } from 'lucide-react';
import type { MGNREGAMetrics } from '@shared/schema';

interface MetricsGridProps {
  metrics: MGNREGAMetrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const { t } = useTranslation();
  
  const formatNumber = (num: number): string => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2);
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2);
    }
    return num.toLocaleString('en-IN');
  };
  
  const getUnit = (num: number): string => {
    if (num >= 10000000) return t('crore');
    if (num >= 100000) return t('lakh');
    return '';
  };
  
  const metricsData = [
    {
      title: t('totalEmployed'),
      value: formatNumber(metrics.totalEmployed),
      unit: getUnit(metrics.totalEmployed),
      icon: Users,
      accentColor: 'bg-primary',
      tooltip: `${metrics.totalEmployed.toLocaleString('en-IN')} ${t('people')}`,
      testId: 'metric-employed'
    },
    {
      title: t('totalWages'),
      value: formatNumber(metrics.totalWagesPaid),
      unit: `${t('rupees')} ${getUnit(metrics.totalWagesPaid)}`,
      icon: IndianRupee,
      accentColor: 'bg-saffron',
      tooltip: `${t('rupees')} ${metrics.totalWagesPaid.toLocaleString('en-IN')}`,
      testId: 'metric-wages'
    },
    {
      title: t('personDays'),
      value: formatNumber(metrics.personDaysGenerated),
      unit: getUnit(metrics.personDaysGenerated),
      icon: Calendar,
      accentColor: 'bg-india-green',
      tooltip: `${metrics.personDaysGenerated.toLocaleString('en-IN')} ${t('days')}`,
      testId: 'metric-person-days'
    },
    {
      title: t('workCompleted'),
      value: metrics.workCompleted,
      unit: t('percent'),
      icon: TrendingUp,
      accentColor: 'bg-india-green',
      tooltip: `${metrics.workCompleted}% ${t('workCompleted')}`,
      testId: 'metric-work-completed'
    },
    {
      title: t('totalExpenditure'),
      value: formatNumber(metrics.totalExpenditure),
      unit: `${t('rupees')} ${getUnit(metrics.totalExpenditure)}`,
      icon: Wallet,
      accentColor: 'bg-primary/80',
      tooltip: `${t('rupees')} ${metrics.totalExpenditure.toLocaleString('en-IN')}`,
      testId: 'metric-expenditure'
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metricsData.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
