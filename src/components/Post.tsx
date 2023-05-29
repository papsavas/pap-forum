import { Post, getUser } from '../lib/api';
import User from './User';

export default async function Post({ title, userId, body }: Post) {
	const user = await getUser(userId);
	return (
		<article className="flex-flex-col h-full w-full flex-1 gap-8 rounded-xl bg-neutral-700 p-4 text-white">
			<User {...user} />
			<div className="ml-4 mt-2">
				<h1>{title}</h1>
				<p className="">{body}</p>
			</div>
		</article>
	);
}
