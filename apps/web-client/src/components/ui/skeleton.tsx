import { cn } from '@/lib/utils';
export type ClassNameProps = {
  className: string;
  props?: any;
};
const Skeleton = ({ className, ...props }: ClassNameProps) => {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
};

export { Skeleton };
