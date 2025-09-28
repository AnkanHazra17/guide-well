"use client";
import { ColumnDef, getCoreRowModel } from "@tanstack/table-core";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { cn } from "@workspace/ui/lib/utils";
import { Loader } from "@workspace/ui/components/loader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  infiniteScroll?: boolean;
  isLoadingFirstPage?: boolean;
}

function CustomDataTable<TData, TValue>({
  columns,
  data,
  className,
  infiniteScroll,
  isLoadingFirstPage,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
        <TableHeader className="bg-muted sticky top-0 z-10 backdrop-blur-xs">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {(() => {
            if (infiniteScroll && isLoadingFirstPage) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <Loader />
                  </TableCell>
                </TableRow>
              );
            }
            if (!table.getRowModel().rows?.length) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              );
            }

            return table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ));
          })()}
          {/*{table.getRowModel().rows?.length ? (*/}
          {/*  table.getRowModel().rows.map((row) => (*/}
          {/*    <TableRow*/}
          {/*      key={row.id}*/}
          {/*      data-state={row.getIsSelected() && "selected"}*/}
          {/*    >*/}
          {/*      {row.getVisibleCells().map((cell) => (*/}
          {/*        <TableCell key={cell.id}>*/}
          {/*          {flexRender(cell.column.columnDef.cell, cell.getContext())}*/}
          {/*        </TableCell>*/}
          {/*      ))}*/}
          {/*    </TableRow>*/}
          {/*  ))*/}
          {/*) : (*/}
          {/*  <TableRow>*/}
          {/*    <TableCell colSpan={columns.length} className="h-24 text-center">*/}
          {/*      No results.*/}
          {/*    </TableCell>*/}
          {/*  </TableRow>*/}
          {/*)}*/}
        </TableBody>
      </Table>
    </div>
  );
}

export default CustomDataTable;
