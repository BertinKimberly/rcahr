"use client"

import { CardContent } from "@/components/Card";
import React from "react";
import MobileNav from "@/components/MobileNav";
import { useGetRatedProjects } from "@/hooks/useProject";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const page = () => {
  const { user } = useAuthStore()
   const { data, isLoading, isError } = useGetRatedProjects(user.id)
   const router = useRouter()

   if (isLoading) {
      return <p className="text-center">Fetching projects...</p>
   }

   if (isError) {
      return (
         <main className="flex flex-col justify-center">
            <p className="text-center text-red-500 mb-3">Failed to fetch projects</p>
            <Button variant={'secondary'} onClick={() => location.reload()}>
               Reload
            </Button>
         </main>
      )
   }

   return (
      <>
         <MobileNav />
         <div>
            <h3>Projects</h3>
            <div className="rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
               {
                  data.data.map((project: any) => {
                     return (
                        <CardContent
                           className="flex items-center bg-input justify-center md:h-40 cursor-pointer"
                           onClick={() => router.push(`/dashboard/rated-projects/${project.id}`)}
                        >
                           <img
                              src={project.logo}
                              alt={project.name}
                              className="max-h-40"
                           />
                        </CardContent>
                     )
                  })
               }
            </div>
         </div>
      </>
   );
};

export default page;