import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  accentColor: string;
  tooltip?: string;
  testId?: string;
}

export function MetricCard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  accentColor,
  tooltip,
  testId
}: MetricCardProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card 
          className="p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-default animate-fade-in"
          data-testid={testId}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2.5 rounded-md ${accentColor}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-foreground" data-testid={`${testId}-value`}>
                {value}
              </p>
              {unit && (
                <span className="text-lg font-medium text-muted-foreground">
                  {unit}
                </span>
              )}
            </div>
          </div>
        </Card>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
