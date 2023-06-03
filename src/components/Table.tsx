import { Table, flexRender } from '@tanstack/react-table';
import { twMerge } from 'tailwind-merge';

type Props<T> = {
	table: Table<T>;
	styles?: Partial<{
		table: string;
		head: string;
		headRow: string;
		headCell: string;
		body: string;
		bodyRow: string;
		cell: string;
	}>;
};

export default function Table<T>({ table, styles }: Props<T>) {
	return (
		<table className={twMerge('table-auto text-center', styles?.table)}>
			<thead className={twMerge('', styles?.head)}>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id} className={twMerge('', styles?.headRow)}>
						{headerGroup.headers.map((header) => (
							<th key={header.id} className={twMerge('', styles?.headCell)}>
								{flexRender(
									header.column.columnDef.header,
									header.getContext()
								)}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody className={twMerge('', styles?.body)}>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id} className={twMerge('', styles?.bodyRow)}>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id} className={twMerge('', styles?.cell)}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
