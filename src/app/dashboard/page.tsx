"use client";

import { CardContent } from "@/components/Card";
import React, { useState, useEffect } from "react";
import MobileNav from "@/components/MobileNav";
import { useGetUnRatedProjects } from "@/hooks/useProject";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const shuffleArray = (array: any[]) => {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
};

const Page = () => {
   const { user } = useAuthStore();
   const { data, isLoading, isError } = useGetUnRatedProjects(user.id);

   const [searchQuery, setSearchQuery] = useState<string>("");

   const [shuffledProjects, setShuffledProjects] = useState<any[]>([]);

   useEffect(() => {
      if (data?.data) {
         const shuffled = shuffleArray([...data.data]);
         setShuffledProjects(shuffled);
      }
   }, [data]);

   if (isLoading) {
      return <p className="text-center">Fetching projects...</p>;
   }

   if (isError) {
      return (
         <main className="flex flex-col justify-center">
            <p className="text-center text-red-500 mb-3">Failed to fetch projects</p>
            <Button variant={"secondary"} onClick={() => location.reload()}>
               Reload
            </Button>
         </main>
      );
   }

   const filteredProjects = shuffledProjects.filter((project: any) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
   );

   return (
      <main>
         <MobileNav />
         <div className="px-4 md:p-0 text-center md:flex justify-between items-center mb-6 md:mb-8">
            <h4>Projects Awaiting Your Rating</h4>
            <Input
               type="text"
               placeholder="Search by project name..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full md:w-1/3 px-3 py-5 bg-input mt-4 md:mt-0 rounded outline-none"
            />
         </div>

         {filteredProjects.length > 0 ? (
            <div className="rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 p-4 md:p-0">
               {filteredProjects.map((project: any) => (
                  <Link
                     href={`/dashboard/projects/${project.id}`}
                     className="bg-white shadow"
                     key={project.id}
                  >
                     <CardContent
                        key={project.id}
                        className="flex items-center bg-slate-50 justify-center h-32 md:h-40 cursor-pointer"
                     >
                        <img
                           src={project.logo}
                           alt={project.name}
                           className="max-h-28 md:max-h-32 max-w-[90%]"
                        />
                     </CardContent>
                     <p className="p-4 text-lg font-medium">{project.name}</p>
                  </Link>
               ))}
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center h-[40vh]">
               <h2 className="text-2xl font-bold text-gray-700">Not found</h2>
            </div>
         )}
         {
            data.data.length <= 0 && (
               <div className="flex flex-col items-center justify-center h-[40vh]">
                  <h2 className="text-2xl font-bold text-gray-700">All caught up! 🎉</h2>
                  <p className="text-gray-600 mb-4">You&apos;ve rated all the projects. Thanks!</p>
               </div>
            )
         }
      </main>
   );
};

export default Page;