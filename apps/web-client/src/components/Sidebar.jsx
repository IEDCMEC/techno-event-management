import { useRouter } from 'next/router';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar = ({ className }) => {
  const router = useRouter();
  const { organizationId } = router.query;

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Quick Access</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Link href={`/dashboard/${organizationId}`}>Events</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Participants
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Attributes
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Extras
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          {/*<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Library</h2>*/}
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
