import { ColumnDef } from '@tanstack/react-table';
import React from 'react'
import { DataTable } from './DataTable';

type Props = {};

type Rating = {
   projectName: string;
   relevance: number;
   impactToSociety: number;
   performance: number;
   progress: number;
};

const columns: ColumnDef<Rating>[] = [
  {
    accessorKey: "projectName",
    header: "Project"
  },
  {
    accessorKey: "relevance",
    header: "Relevance"
  },
  {
    accessorKey: "impactToSociety",
    header: "Impact to Society"
  },
  {
    accessorKey: "performance",
    header: "Performance"
  },
  {
    accessorKey: "progress",
    header: "Progress"
  }
];

const data: Rating[] = [
   {
      projectName: "Project Alpha",
      relevance: 8,
      impactToSociety: 9,
      performance: 7,
      progress: 6,
   },
   {
      projectName: "Project Beta",
      relevance: 9,
      impactToSociety: 8,
      performance: 9,
      progress: 7,
   },
   {
      projectName: "Project Gamma",
      relevance: 7,
      impactToSociety: 6,
      performance: 8,
      progress: 8,
   },
   {
      projectName: "Project Delta",
      relevance: 6,
      impactToSociety: 7,
      performance: 9,
      progress: 5,
   },
   {
      projectName: "Project Epsilon",
      relevance: 9,
      impactToSociety: 10,
      performance: 8,
      progress: 9,
   },
];
const RatingsTable = () => {
  return (
    <div>
       <DataTable
               columns={columns}
               data={data.map((item) => ({
                  ...item,
                  relevance: `${item.relevance} / 10`,
                  impactToSociety: `${item.impactToSociety} / 10`,
                  performance: `${item.performance} / 10`,
                  progress: `${item.progress} / 10`,
               }))}
            />
    </div>
  )
}

export default RatingsTable
