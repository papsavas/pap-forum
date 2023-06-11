import Post from '../../../components/Post';
import { getPost, getPostComments } from '../../../lib/api';

export default async function PostPage({ params }: SegmentProps) {
	const comments = await getPostComments(params.id);
	const post = await getPost(params.id);
	return (
		<article className="flex h-full w-full flex-1 flex-col">
			<Post {...post} root comments={comments} showComments />
		</article>
	);
}
