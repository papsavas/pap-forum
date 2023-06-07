import { twMerge } from 'tailwind-merge';
import { Comment, getUser } from '../lib/api';
import PostUser from './PostUser';

type Props = {
	id: string | number;
	userId: number | string;
	title: string;
	body: string;
	comments?: Comment[];
	className?: string;
} & XOR<{ root: boolean }, { parentId: string }>;

export default async function Post({
	title,
	userId,
	body,
	className = '',
	comments,
	root,
	parentId,
}: Props) {
	const user = await getUser(userId);
	const hasComments = comments && comments.length > 0;
	return (
		<section
			className={twMerge(
				`flex-flex-col h-full w-full flex-1 
				justify-evenly gap-8 overflow-auto rounded-xl
				bg-neutral-700 text-white`,
				className
			)}
		>
			<div className={`p-4 ${parentId ? 'border-t border-opacity-60' : ''}`}>
				<div className={`${root ? 'mb-12' : 'mb-2'} flex flex-col gap-4`}>
					<PostUser {...user} size={root ? 50 : 35} />
					<article className={`flex flex-col gap-2`}>
						<h1 className="text-lg">{title}</h1>
						<p className="">{body}</p>
					</article>
				</div>
				<div className="">
					<div className="ml-3 flex flex-col text-sm">
						{hasComments
							? comments.map((c) => (
									<Post
										id={c.id}
										parentId={c.postId.toString()}
										body={c.body}
										title={c.name}
										key={c.id}
										userId={c.email}
									/>
							  ))
							: null}
					</div>
				</div>
			</div>
		</section>
	);
}
