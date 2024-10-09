"use client";

import PageTitle from "@/components/PageTitle";
import Card, { CardContent } from "@/components/Card";
import RatingsTable from "@/components/RatingsTable";
import { RatingsChart } from "@/components/RatingsChart";
import ProjectsChart from "@/components/ProjectsChart";
import { useGetAllProjects } from "@/hooks/useProject";
import { Button } from "@/components/ui/button";
import { Box, Shield, Star, Users } from "lucide-react";
import { useGetAllUsers } from "@/hooks/useAuth";

export default function Home() {
   const { data, isLoading, isError } = useGetAllProjects();
   const { data: totalUsers, isPending } = useGetAllUsers()

   if (isLoading || isPending) {
      return <p className="text-center">Fetching projects...</p>;
   }

   const projects = data.projects.map((project: any) => ({
      id: project.id,
      name: project.name,
      team_leader: project.team_leader,
      fields: project.fields,
      rating:
         project.Rating?.length > 0
            ? {
                 relevance: project.Rating[0].relevance,
                 impact_to_society: project.Rating[0].impact_to_society,
                 performance: project.Rating[0].performance,
                 progress: project.Rating[0].progress,
                 feedback: project.Rating[0].feedback,
              }
            : null,
   }));

   if (isError) {
      return (
         <main className="flex flex-col justify-center">
            <p className="text-center text-red-500 mb-3">
               Failed to fetch projects
            </p>
            <Button
               variant={"secondary"}
               onClick={() => location.reload()}
            >
               Reload
            </Button>
         </main>
      );
   }

   const userCount = totalUsers?.data?.length || 0;

   const totalProjects = data?.projects?.length || 0;
   const totalRatings = data?.projects?.reduce(
      (acc: any, project: { Rating: string | any[] }) =>
         acc + (project.Rating?.length || 0),
      0
   );
   const totalFeedbacks = data?.projects?.reduce(
      (
         acc: any,
         project: {
            Rating: {
               filter: (arg0: (rating: any) => boolean) => {
                  (): any;
                  new (): any;
                  length: any;
               };
            };
         }
      ) =>
         acc +
         project.Rating?.filter(
            (rating: { feedback: null }) => rating.feedback !== null
         ).length,
      0
   );

   const cardData = [
      {
         icon: Box,
         desc: "Total Projects in Hackathon",
         title: `${totalProjects} Projects`,
         color: "#979205",
      },
      {
         icon: Star,
         desc: "Overall Projects Rating",
         title: `${totalRatings} Ratings`,
         color: "#FEB185",
      },
      {
         icon: Shield,
         desc: "Overall Project Feedback",
         title: `${totalFeedbacks} Feedbacks`,
         color: "#8495B2",
      },
      {
         icon: Users,
         desc: "All users",
         title: `${userCount} Users`,
         color: "#311D4A",
      },
   ];

   return (
      <div className="flex flex-col gap-5 w-full">
         <PageTitle title="Overview" />
         <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 mb-6">
            {cardData.map((d, i) => (
               <Card
                  key={i}
                  icon={d.icon}
                  desc={d.desc}
                  title={d.title}
                  color={d.color}
               />
            ))}
         </section>

         <section className="flex gap-6 flex-col md:flex-row">
            <div className="mb-2 font-medium border-[0.5px] p-4 rounded-lg space-y-3">
               <small className="">Ratings</small>
               <RatingsTable projects={projects} />
            </div>
            <div className="border-[0.5px] w-full md:w-[30%] xl:w-[35%] p-2 rounded-lg">
               <small>Overall Ratings</small>
               <RatingsChart />
            </div>
         </section>
      </div>
   );
}
