import { Row, Table, flexRender } from '@tanstack/react-table';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';

type Props<T> = XOR<
	{ table: Table<T> },
	{
		layout: {
			headers?: string[];
			rows: number;
			cols: number;
		};
	}
> & {
	onRowClick?: (row: Row<T>) => unknown;
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

export default function Table<T>({
	table,
	layout,
	styles,
	onRowClick,
}: Props<T>) {
	const headerGroups = table ? table.getHeaderGroups() : [layout.headers];
	const rows = table
		? table.getRowModel().rows
		: Array<null>(layout.rows).fill(null);
	const id = useId();
	return (
		<table className={twMerge('table-auto text-center', styles?.table)}>
			<thead className={twMerge('', styles?.head)}>
				{headerGroups.map((headerGroup, hgi) =>
					headerGroup ? (
						<tr
							key={
								'length' in headerGroup
									? `${id}_head_group_${hgi}`
									: headerGroup.id
							}
							className={twMerge('', styles?.headRow)}
						>
							{('length' in headerGroup
								? headerGroup
								: headerGroup.headers
							).map((header, hi) => (
								<th
									key={
										typeof header === 'string' ? `${id}_head_${hi}` : header.id
									}
									className={twMerge('', styles?.headCell)}
								>
									{typeof header === 'string'
										? header
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					) : null
				)}
			</thead>

			<tbody className={twMerge('', styles?.body)}>
				{rows.map((row, ri) => (
					<tr
						key={row?.id ?? `${id}_body_row_${ri}`}
						className={twMerge('', styles?.bodyRow)}
						onClick={(e) => onRowClick && row && onRowClick(row)}
					>
						{(
							row?.getVisibleCells() ?? Array<null>(layout!.cols).fill(null)
						).map((cell, ci) => (
							<td
								key={cell?.id ?? `${id}_row_${ri}_cell_${ci}`}
								className={twMerge('', styles?.cell)}
							>
								{cell
									? flexRender(cell.column.columnDef.cell, cell.getContext())
									: null}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
