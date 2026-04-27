"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import createSection from "../create-blog/(sections)/create";
import manageSection from "../create-blog/(sections)/manage";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Tab() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "create";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "create" || tab === "manage") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex gap-2">
          <Link href={"/blog"}>
            <ChevronLeft size={33} color="#475569" />
          </Link>
          <TabsList className="rounded-full">
            <TabsTrigger value="create" className="rounded-full px-4 py-2">
              Tulis
            </TabsTrigger>
            <TabsTrigger value="manage" className="rounded-full px-4 py-2">
              Kelola
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="create">
          <div className="mt-6">
            {createSection({ setActiveTab })}
          </div>
        </TabsContent>
        <TabsContent value="manage">
          <div className="mt-6">
            {manageSection({ setActiveTab })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Tab;
