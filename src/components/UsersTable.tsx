'use client';
import {
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC } from 'react';
import { DBUser, userRoles } from '../db/schema';
import Table from './Table';

const UsersTable: FC<{
	users: DBUser[];
	onRoleChange: (
		value: DBUser['role'],
		username: DBUser['username']
	) => Promise<unknown>;
}> = ({ users, onRoleChange }) => {
	const columnHelper = createColumnHelper<DBUser>();
	const columns = [
		columnHelper.accessor('username', {
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('fullName', {
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('email', {
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('role', {
			cell: (info) => (
				<select
					defaultValue={info.getValue()}
					className="bg-neutral-500"
					onChange={async (e) => {
						const username = info.row.getValue(
							'username'
						) as DBUser['username'];
						const value = e.currentTarget.value as DBUser['role'];
						await onRoleChange(value, username);
					}}
				>
					{userRoles.map((role) => (
						<option key={role} value={role}>
							{role}
						</option>
					))}
				</select>
			),
			enableColumnFilter: true,
			enableSorting: true,
		}),
	];
	const table = useReactTable({
		data: users,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		enableRowSelection: true,
	});
	return (
		<Table
			table={table}
			styles={{
				table: 'border bg-neutral-950',
				headCell: 'py-1 font-light opacity-75 capitalize',
				bodyRow: 'border hover:bg-neutral-900 transition-all duration-100',
				cell: 'p-5',
			}}
		/>
	);
};

export default UsersTable;
