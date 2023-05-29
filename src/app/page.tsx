import Post from '../components/Post';
import { getPosts } from '../lib/api';

export default async function Home() {
	const posts = await getPosts();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-10 p-24">
			{posts.map((p) => (
				//@ts-expect-error server component
				<Post {...p} key={p.id} />
			))}
		</main>
	);
}
