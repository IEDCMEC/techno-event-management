import { useRouter } from 'next/router';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
        <div className="px-6 py-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Organization 1</AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Event 1</AccordionTrigger>
                    <AccordionContent>Something</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Event 2</AccordionTrigger>
                    <AccordionContent>Something</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Organization 2</AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Event 1</AccordionTrigger>
                    <AccordionContent>Something</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Event 2</AccordionTrigger>
                    <AccordionContent>Something</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
