import { Suspense } from 'react';
import UserCard from '../../../components/UserCard';

export default async function UserPage({ params }: SegmentProps) {
	return (
		<section className="flex w-full flex-1 flex-col">
			<Suspense fallback={<>Loading User {params.id}</>}>
				<UserCard userId={params.id} />
			</Suspense>
		</section>
	);
}
