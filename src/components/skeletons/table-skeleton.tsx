import { Skeleton } from '@/components/ui/skeleton'
export function SkeletonTable() {
  return (
    <div className="flex w-full min-w-[1300px] flex-col space-y-2 shadow-sm">
      <Skeleton className="h-20 w-full bg-muted-foreground/20" />

      <div className="flex flex-col space-y-2">
        <Skeleton className="h-12 w-full bg-muted-foreground/20" />
        <Skeleton className="h-12 w-full bg-muted-foreground/20" />
        <Skeleton className="h-12 w-full bg-muted-foreground/20" />
        <Skeleton className="h-12 w-full bg-muted-foreground/20" />
        <Skeleton className="h-12 w-full bg-muted-foreground/20" />
        <Skeleton className="h-12 w-full bg-muted-foreground/20" />
        <Skeleton className="h-12 w-full bg-muted-foreground/20" />
        <Skeleton className="h-12 w-full bg-muted-foreground/20" />
        <Skeleton className="h-12 w-full bg-muted-foreground/20" />
        <Skeleton className="h-12 w-full bg-muted-foreground/20" />
      </div>
    </div>
  )
}
