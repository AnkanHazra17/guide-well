import React from "react";
import { PublicFileType } from "@workspace/backend/private/files";
import DataTable from "@/components/custom/data-table";
import { ColumnDef } from "@tanstack/table-core";
import InfiniteScrollTrigger from "@workspace/ui/components/infinite-scroll-trigger";
import { FileIcon } from "lucide-react";

function DocumentsTable({
  files,
  isLoadingFirstPage,
  canLoadMore,
  isLoadingMore,
  onLoadMore,
  ref,
}: {
  files: PublicFileType[];
  isLoadingFirstPage: boolean;
  canLoadMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const columns: ColumnDef<PublicFileType>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          <FileIcon size={15} />
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: ({ row }) => <div>{row.getValue("size")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
    {
      id: "action",
      enableHiding: false,
    },
  ];
  return (
    <div className="">
      <DataTable
        columns={columns}
        data={files}
        infiniteScroll
        isLoadingFirstPage={isLoadingFirstPage}
        className="border-none"
      />
      {!isLoadingFirstPage && files.length > 0 && (
        <div className="border-t">
          <InfiniteScrollTrigger
            canLoadMore={canLoadMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={onLoadMore}
            ref={ref}
          />
        </div>
      )}
    </div>
  );
}

export default DocumentsTable;
