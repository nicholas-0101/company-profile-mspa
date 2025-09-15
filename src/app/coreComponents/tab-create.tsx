import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import createSection from "../create-blog/(sections)/create";
import manageSection from "../create-blog/(sections)/manage";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

function Tab() {
  return (
    <div className="w-full">
      <Tabs defaultValue="create">
        <div className="flex gap-2">
          <Link href={"/blog"}>
            <ChevronLeft size={33} color="#475569" />
          </Link>
          <TabsList className="rounded-full">
            <TabsTrigger value="create" className="rounded-full px-4 py-2">
              Buat Baru
            </TabsTrigger>
            <TabsTrigger value="manage" className="rounded-full px-4 py-2">
              Kelola
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="create">{createSection()}</TabsContent>
        <TabsContent value="manage">{manageSection()}</TabsContent>
      </Tabs>
    </div>
  );
}

export default Tab;
