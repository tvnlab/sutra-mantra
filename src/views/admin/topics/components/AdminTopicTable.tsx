import React, { useEffect } from "react";
import CardMenu from "@app/components/card/CardMenu";
import Checkbox from "@app/components/checkbox";
import Card from "@app/components/card";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import useAdminTopic from "@app/hooks/stores/useAdminTopic";
import { ITopic } from "@library/api/dto/topic.dto";
import Image from "next/image";
import { Tooltip } from "@chakra-ui/react";
import tailwindConfig from "../../../../../tailwind.config";

const getColors = tailwindConfig.theme.colors as any;
const colors = getColors();

interface RowObj extends ITopic {
  checked?: boolean;
}

function CheckTable() {
  const { topics: tableData, getTopics } = useAdminTopic();
  let data = tableData as RowObj[];
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = [
    columnHelper.accessor("_id", {
      id: "_id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ID</p>
      ),
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="flex items-center">
            <Checkbox defaultChecked={false} />
            <Tooltip label={value} color={colors.primary}>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                {value.slice(0, 10) + "..."}
              </p>
            </Tooltip>
          </div>
        );
      },
    }),
    columnHelper.accessor("title", {
      id: "title",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Title</p>
      ),
      cell: (info) => (
        <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("image", {
      id: "image",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Poster
        </p>
      ),
      cell: (info) => (
        <div className="max-w-52">
          <Image
            className="rounded"
            src={info.getValue()}
            alt=""
            width={200}
            height={(200 / 16) * 9}
            layout="responsive" // Use responsive layout
            sizes="(max-width: 320px) 280px, (max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px" // Define sizes for responsive images
          />
        </div>
      ),
    }),
    columnHelper.accessor("content", {
      id: "content",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Content
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("count", {
      id: "count",
      size: 50,
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Amount
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white max-w-8">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("category", {
      id: "category",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Category
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("author", {
      id: "author",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Author
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Created At
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue().toString()}
        </p>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    if (!getTopics) return;
    getTopics("");
  }, [getTopics]);

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          The Sutra Mantra System&apos;s Topics
        </div>

        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="min-w-[100px] border-white/0 py-3  pr-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default CheckTable;
const columnHelper = createColumnHelper<RowObj>();
