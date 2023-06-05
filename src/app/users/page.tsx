import UsersTable from '../../components/UsersTable';
import { assignRoleToUser, getUsers } from '../../db/users';

export default async function UsersPage() {
	//TODO: protect page
	const users = await getUsers();

	return (
		<UsersTable
			users={users}
			onRoleChange={async (role, username) => {
				'use server';
				await assignRoleToUser(username, role).then((r) =>
					console.log(`assigned role ${role} to user ${username}`)
				);
			}}
		/>
	);
}
