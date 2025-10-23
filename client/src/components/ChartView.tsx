import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface ChartData {
  month: string;
  employed: number;
  expenditure: number;
  personDays: number;
}

interface ChartViewProps {
  data: ChartData[];
}

export function ChartView({ data }: ChartViewProps) {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <Card className="p-6 animate-fade-in" data-testid="card-employment-chart">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          {t('employmentTrend')}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="employed" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name={t('totalEmployed')}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
            <Line 
              type="monotone" 
              dataKey="personDays" 
              stroke="hsl(var(--india-green))" 
              strokeWidth={2}
              name={t('personDays')}
              dot={{ fill: 'hsl(var(--india-green))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      
      <Card className="p-6 animate-fade-in" data-testid="card-expenditure-chart">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          {t('expenditureBreakdown')}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="expenditure" 
              fill="hsl(var(--saffron))" 
              name={t('totalExpenditure')}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
