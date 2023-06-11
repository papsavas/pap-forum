import Image from 'next/image';
import rightCommentIcon from 'public/round-comment-right.svg';
import { twMerge } from 'tailwind-merge';
import { User as APIUser, Comment, getUser } from '../lib/api';
import PostUser from './PostUser';

type Props = {
	id: string | number;
	userId: APIUser['id'];
	title: string;
	body: string;
	comments?: Comment[];
	className?: string;
	showComments?: boolean;
} & XOR<{ root: boolean }, { parentId: string }>;

export default async function Post({
	title,
	userId,
	body,
	className = '',
	comments,
	showComments = false,
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
			<div
				className={`px-8 py-6 ${parentId ? 'border-t border-opacity-60' : ''}`}
			>
				<div
					className={`${
						hasComments && showComments ? 'mb-12' : ''
					} flex flex-col gap-6`}
				>
					<PostUser {...user} size={root ? 50 : 35} />
					<article
						className={`flex flex-col justify-evenly gap-6 ${
							root ? 'px-6' : ''
						}`}
					>
						<div className="flex flex-col gap-2">
							<h1 className="text-lg">{title}</h1>
							<p className="">{body}</p>
						</div>
						{hasComments && !showComments ? (
							<footer className="flex items-center gap-1 text-sm">
								{comments?.length}
								<Image
									src={rightCommentIcon}
									alt="comment icon"
									height={13}
									width={13}
								></Image>
							</footer>
						) : null}
					</article>
				</div>
				<div className="">
					<div className="flex flex-col text-sm">
						{hasComments && showComments
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
