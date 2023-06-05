'use client';
import {
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
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
			cell: (info) => {
				const username = info.getValue();
				return (
					<Link className="hover:underline" href={`users/${username}`}>
						{username}
					</Link>
				);
			},
		}),
		columnHelper.accessor('fullName', {
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('email', {
			cell: (info) => {
				const email = info.getValue();
				return (
					<address className="hover:underline">
						<a href={`mailto:${email}`}>{email}</a>
					</address>
				);
			},
		}),
		columnHelper.accessor('role', {
			cell: (info) => (
				<select
					defaultValue={info.getValue()}
					className="cursor-pointer appearance-none rounded-xl border-none bg-neutral-500 px-3 py-1 outline-none"
					onChange={async (e) => {
						const username = info.row.getValue(
							'username'
						) as DBUser['username'];
						const value = e.currentTarget.value as DBUser['role'];
						await onRoleChange(value, username);
					}}
				>
					{userRoles.map((role) => (
						<option
							className="cursor-pointer  bg-neutral-500 p-2"
							key={role}
							value={role}
						>
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
				bodyRow: 'border hover:bg-white/10 transition-all duration-100',
				cell: 'p-5',
			}}
		/>
	);
};

export default UsersTable;
