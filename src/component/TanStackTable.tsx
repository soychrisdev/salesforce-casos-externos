import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useRef } from 'react';
import { useDebounce } from 'usehooks-ts';




interface TanStackTableProps {
    data: [][] | undefined;
    isLoading: boolean;
    isSuccess: boolean;
}
export default function TanStackTable({ data, isSuccess }: TanStackTableProps) {
    const tableRef = useRef();

    const columnHelper = createColumnHelper();
    const columnDefWithCheckBox = React.useMemo(() => [
        //@ts-ignore
        columnHelper.accessor(row => row.caseNumber, {
            id: "caseNumber",
            cell: row => row.getValue(),
            header: "Num. Caso",
        }),
        {
            accessorKey: "ambito",
            header: "Ambito",
        },
        {
            accessorKey: "tematica",
            header: "Tematica",
        },
        {
            accessorKey: "submotivo",
            header: "SubMotivo",
        },
        {
            accessorKey: "status",
            header: "Estado",
        },
        {
            accessorKey: "dateCreated",
            header: "Fecha Creacion",
        },
        {
            accessorKey: "dateLastModif",
            header: "Última modificación",
        },
        {
            accessorKey: "priority",
            header: "Prioridad",
        },
        {
            accessorKey: "slaExitDate",
            header: "Fecha de salida",
        }

    ], []);

    //@ts-ignore
    const debouncedValue = useDebounce<{}>(data, 500)

    const tableInstance = useReactTable({
        columns: columnDefWithCheckBox,
        //@ts-ignore
        data: data,
        getCoreRowModel: getCoreRowModel(),
        debugTable: false,
    });



    useEffect(() => {
        //@ts-ignore
        let dataTableInstanceRef: DataTables.Api | null = null;

        if (data) {

            const initializeDataTable = () => {
                if (tableRef.current) {
                    //@ts-ignore
                    dataTableInstanceRef = $(tableRef.current).DataTable({
                        dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
                        scrollY: "60vh",
                        scrollX: true,
                        lengthMenu: [
                            [20, 30, 40, -1],
                            [20, 30, 40, "Todas"],
                        ],
                        aaSorting: [],
                        destroy: true,
                    });
                }

            };
            initializeDataTable();
        }

        return () => {
            // Clean up by destroying the DataTable instance
            if (dataTableInstanceRef) {
                dataTableInstanceRef.destroy();
            }
        };

    }, [debouncedValue]);


    if (!isSuccess || !data) return <span>{'Error en la consulta, por favor intente otros valores.'}</span>

    return (
        <div>
            {/* //@ts-ignore */}
            <table
                //@ts-ignore
                ref={isSuccess ? tableRef : null} className="datatables table table-hover table-striped table-bordered m-0">
                <thead>
                    {tableInstance.getHeaderGroups().map((headerEl) => {
                        return (
                            <tr key={headerEl.id}>
                                {headerEl.headers.map((columnEl) => {
                                    return (
                                        <th key={columnEl.id} colSpan={columnEl.colSpan}>
                                            {columnEl.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    columnEl.column.columnDef.header,
                                                    columnEl.getContext()
                                                )}
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>
                <tbody>
                    {tableInstance.getRowModel().rows.map((rowEl) => {
                        return (
                            <tr key={rowEl.id}>
                                {rowEl.getVisibleCells().map((cellEl) => {
                                    return (
                                        <td className="text-nowrap" key={cellEl.id}>
                                            {flexRender(
                                                cellEl.column.columnDef.cell,
                                                cellEl.getContext()
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
    )
}
