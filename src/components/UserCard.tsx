import { getUsers } from '../db/users';

//TODO: make skeleton
export default async function UserCard({ userId }: { userId: string }) {
	const [{ username, fullName, email, role }] = await getUsers({
		username: userId,
	});
	return (
		<div className="flex h-full w-full flex-1 flex-col bg-blue-900/40 p-3">
			<header className="flex items-center justify-start gap-14 bg-red-500/40 p-10">
				<div
					id="profile picture placeholder"
					className="h-40 w-40 rounded-full bg-green-500/40"
				></div>
				<div className="flex flex-col">
					<h1 className="text-5xl">{fullName}</h1>
					<h2>{`@${username}`}</h2>
				</div>
			</header>
			<nav className="flex justify-evenly bg-pink-500/40 p-3">
				<button className="rounded-lg bg-yellow-500/40 px-4 py-1">Posts</button>
				<button className="rounded-lg bg-yellow-500/40 px-4 py-1">
					Comments
				</button>
				<button className="rounded-lg bg-yellow-500/40 px-4 py-1">Liked</button>
			</nav>
			<div className="flex flex-1 overflow-auto bg-slate-500/40"></div>
		</div>
	);
}
