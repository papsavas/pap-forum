export default function PostsLoading() {
	return (
		<div className="flex w-full flex-1 flex-col gap-16">
			{Array(5)
				.fill(null)
				.map((_, i) => (
					<article
						className="flex-1 animate-pulse rounded-xl bg-neutral-900 py-32"
						key={i}
					></article>
				))}
		</div>
	);
}
