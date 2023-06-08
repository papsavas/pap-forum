import { UsersTableSkeleton } from '../../components/UsersTable';

export default async function UsersLoading() {
	return <UsersTableSkeleton rows={18} />;
}
