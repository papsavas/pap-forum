import { getPosts } from '../lib/api';

export default async function Home() {
	const posts = await getPosts();
	return <h1 className="text-7xl">Home</h1>;
}
