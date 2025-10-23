import { Card } from '@/components/ui/card';

export function SkeletonCard() {
  return (
    <Card className="p-6 border-l-4 border-l-muted animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-muted rounded-md"></div>
      </div>
      
      <div className="space-y-2">
        <div className="h-4 w-32 bg-muted rounded"></div>
        <div className="h-8 w-24 bg-muted rounded"></div>
      </div>
    </Card>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(5)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
