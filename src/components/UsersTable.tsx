'use client';
import {
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { ComponentProps, FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { DBUser, userRoles } from '../db/schema';
import Table from './Table';

const styles = {
	table: 'bg-neutral-950 w-full',
	headRow: 'border border-white/40',
	headCell: 'py-1 font-light opacity-75 capitalize',
	cell: 'p-5',
} satisfies ComponentProps<typeof Table>['styles'];

export const UsersTableSkeleton: FC<{ rows: number }> = ({ rows }) => (
	<Table
		layout={{ rows, cols: 4 }}
		styles={{
			...styles,
			cell: twMerge(
				styles.cell,
				'animate-pulse bg-neutral-900 border border-white/10 p-7'
			),
		}}
	/>
);

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
				...styles,
				bodyRow: 'transition-all duration-100 border border-white/40',
			}}
		/>
	);
};

export default UsersTable;
