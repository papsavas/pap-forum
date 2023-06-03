import Link from 'next/link';
import Post from '../../components/Post';
import { getPosts } from '../../lib/api';

export default async function PostsPage() {
	const posts = await getPosts();
	return (
		<main className="flex min-h-screen flex-col justify-between gap-16">
			{posts.map((p) => (
				<Link href={`posts/${p.id}`} key={p.id}>
					<Post
						{...p}
						key={p.id}
						root
						className="transition-colors duration-100 hover:bg-neutral-600"
					/>
				</Link>
			))}
		</main>
	);
}
