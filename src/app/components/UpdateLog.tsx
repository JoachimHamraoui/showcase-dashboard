import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion } from "@radix-ui/react-accordion";

export function UpdateLog() {
  return (
    <div className="flex flex-row gap-x-4">
      <Card className="w-full rounded-2xl">
        <CardHeader className="text-2xl font-bold -mb-2">
          <div className="flex flex-col items-start">
            <CardTitle>Update Log</CardTitle>
            <CardDescription>Keep track of the latest updates</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="Alpha V1.0.0">
              <AccordionTrigger>
                Alpha V1.0.0 - Initial Release
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground text-left">
                  Alpha release of DSHBRD. The first version of the easy Portfolio project management tool for starting developers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <Card className="w-full rounded-2xl">
        <CardHeader className="text-2xl font-bold">
          <div className="flex flex-col items-start">
            <CardTitle>Upcoming Updates & Features</CardTitle>
            <CardDescription>Keep track of the latest updates</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="API Integration - Coming Soon">
              <AccordionTrigger>
                API Integration - Coming Soon
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground text-left">
                  API integration feature is coming soon. This feature will allow users to connect their DSHBRD. data and retrieve their projects to use in their own portfolio without having to keep track of projects using another database or a local JSON file.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Highlight Projects - Coming Soon">
              <AccordionTrigger>
                Highlight Projects - Coming Soon
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground text-left">
                  We are planning to add a feature to &quot;highlight&quot; the projects. This will allow users to pick and choose which projects to display on their portfolio. In the back-end, this will be a simple boolean deciding whether to highlight the project or not, but in the front-end, this will be a simple toggle that users can use to decide which projects to display on their portfolio. 
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Text Editor - Coming Soon">
              <AccordionTrigger>
                Text Editor - Coming Soon
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground text-left">
                  Adding a text editor to the project description field. This will allow users to add formatting to their project descriptions, such as bold, italic, lists, and more. This will provide extra customization to the project descriptions, allowing users to make their portfolio more visually appealing and easier to read.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
