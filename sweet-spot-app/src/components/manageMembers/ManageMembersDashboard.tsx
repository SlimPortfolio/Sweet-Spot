"use client";
import { useEffect, useState } from "react";
// import {
//   guitarFriendlySuggestionUp,
//   guitarFriendlySuggestionDown,
//   octaveDictionary,
//   valueToOctaveDictionary,
//   octaveArray,
// } from "@/utils/key-calculation";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ArrowUpDown, ChevronDown, Icon, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteVocalist } from "@/utils/deleteVocalist";
import { Trash2, Pencil } from "lucide-react";

export default function ManageMembersDashboard() {
  //   const [songs, setSongs] = useState<SelectionObject[]>([]);
  const [vocalists, setVocalists] = useState<SelectionObject[]>([]);
  const [vocalistRefresh, setVocalistRefresh] = useState(false);
  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    },
  ];

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  // interface SelectionObject {
  //   label: string;
  //   id: string;
  //   artist?: string;
  //   songLowNote?: string;
  //   songHighNote?: string;
  //   songOriginalKey?: string;
  //   vocalistLowNote?: string;
  //   vocalistHighNote?: string;
  // }

  type SelectionObject = {
    label: string;
    artist?: string;
    songLowNote?: string;
    songHighNote?: string;
    songOriginalKey?: string;
    vocalistLowNote?: string;
    vocalistHighNote?: string;
    _id?: string;
  };
  const columns: ColumnDef<SelectionObject>[] = [
    {
      accessorKey: "label",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("label")}</div>,
    },
    {
      accessorKey: "vocalistLowNote",
      header: "Low Note",
      cell: ({ row }) => <div>{row.getValue("vocalistLowNote")}</div>,
    },
    {
      accessorKey: "vocalistHighNote",
      header: "High Note",
      cell: ({ row }) => <div>{row.getValue("vocalistHighNote")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const element = row.original;
        const id = element["_id"];
        return (
          <div>
            <Dialog>
              <DialogTrigger className=" hover:opacity-70 duration-200">
                <Pencil />
              </DialogTrigger>
              <DialogContent className="flex flex-col w-screen max-h-[70vh]">
                <DialogTitle>Edit User</DialogTitle>
                <div>
                  <p>
                    Here is where we will put the form for {row.original.label}
                  </p>
                  <Button variant={"default"}>Save</Button>
                  <DialogClose className="font-bold rounded-md hover:bg-slate-50 py-1 px-2">
                    <div>Close</div>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className=" hover:opacity-70 duration-200">
                <Trash2 />
              </DialogTrigger>
              <DialogContent className="flex flex-col w-screen max-h-[70vh]">
                <DialogTitle>Delete User</DialogTitle>
                <div>
                  <p>Are you sure you want to delete {row.original.label}?</p>
                  <DialogClose asChild>
                    <Button
                      variant={"destructive"}
                      onClick={() => {
                        if (id) {
                          deleteVocalist(id);
                          setVocalistRefresh(true);
                          alert(
                            `${element.label} has been deleted successfully.`
                          );
                        } else {
                          console.log("missing _id");
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </DialogClose>
                  <DialogClose className="font-bold rounded-md hover:bg-slate-50 py-1 px-2">
                    <div>Close</div>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    // const fetchSongs = async () => {
    //   const res = await fetch("/api/songs");
    //   const data: SelectionObject[] = await res.json();
    //   data.sort((a, b) => a.label.localeCompare(b.label));
    //   setSongs(data);
    // };
    const fetchVocalists = async () => {
      const res = await fetch("/api/vocalists");
      const data: SelectionObject[] = await res.json();
      data.sort((a, b) => a.label.localeCompare(b.label));
      setVocalists(data);
    };
    // fetchSongs();
    fetchVocalists();
    setVocalistRefresh(false);
  }, [vocalistRefresh]);
  console.log(vocalists);

  //   return (
  //     <div className="flex">
  //       <h1>Here is where the table will go</h1>
  //     </div>
  //   );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: vocalists,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteVocalist(id);
      setVocalistRefresh(true);
      //   refreshVocalists();
    } catch (err) {
      alert("Failed to delete vocalist.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full">
      <h1>hello</h1>
      <Dialog>
        <DialogTrigger className="bg-white outline outline-slate-400 p-1 rounded-full outline-[0.5px] hover:bg-slate-100 duration-500">
          <h1>Delete User</h1>
        </DialogTrigger>
        <DialogContent className="flex flex-col w-screen max-h-[70vh]">
          <DialogTitle>Delete User</DialogTitle>
          <div>
            <Button className="bg-red-500">Delete</Button>
            <DialogClose className="font-bold rounded-md hover:bg-slate-50 py-1 px-2">
              <div>Close</div>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
