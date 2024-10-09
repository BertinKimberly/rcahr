"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import RateUsDialog from '@/components/rating/RateUsDialog';
import { useGetProjectById } from '@/hooks/useProject';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import InvalidRequest from '@/components/IsValidUUID';
import { isValidUUID } from '@/utils/constants';

const ProjectPage: React.FC = () => {
   const router = useRouter();
   const params = useParams();


   const isValid = isValidUUID(params.slug[0]);

 
   const { data, isLoading, isError } = useGetProjectById(isValid ? params.slug[0] : '');


   if (!isValid) {
      return <InvalidRequest />;
   }

   if (isLoading) {
      return <p className="text-center">Fetching project...</p>;
   }

   if (isError) {
      return (
         <main className="flex flex-col justify-center">
            <p className="text-center text-red-500 mb-3">Failed to fetch project</p>
            <Button variant={"secondary"} onClick={() => location.reload()}>
               Reload
            </Button>
         </main>
      );
   }

   if (!data || !data.project) {
      router.push('/not-found');  
      return null;
   }

   return (
      <>
         <div
            className="fixed bg-background rounded-full top-4 left-4 z-30 p-2 md:hidden cursor-pointer"
            onClick={() => router.push('/dashboard')}
         >
            <ArrowLeft size={21} />
         </div>
         <div className="w-full">
            <h3 className='mb-3 text-right md:text-start mt-4 md:mt-0 mr-4 md:mr-0'>{data.project.name}</h3>
            <div className="mb-3 relative">
               <img src={data.project.cover_image} alt={data.project.cover_image} className="w-full h-[30vh] sm:h-[40vh] object-cover mt-8 md:mt-0 brightness-50" />
               <div className='absolute flex items-center justify-center h-full w-full top-0'>
                  <img src={data.project.logo} alt={data.project.logo} className="object-cover max-h-[10rem] max-w-[90%]" />
               </div>
            </div>
            <div className="p-4 md:p-4">
               <h3 className="text-main">Description</h3>
               <p className="mt-3">
                  {data.project.description}
               </p>
               <div className="mt-4">
                  <p>For more visit: <Link href={data.project.link} className="text-main ml-2 hover:text-blue-500 hover:underline" target='_blank'>{data.project.name}</Link></p>
                  <div className="flex items-center justify-center mt-4">
                     <RateUsDialog projectName={data.project.name} />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ProjectPage;
