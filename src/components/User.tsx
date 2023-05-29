import Image from 'next/image';
import { FC } from 'react';
import { User } from '../lib/api';

const User: FC<User> = ({ name }) => {
	return (
		<div className="flex items-center gap-4">
			<Image
				className="rounded-full"
				src={
					'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'
				}
				width={50}
				height={50}
				alt={`${name} profile picture`}
			/>
			{name}
		</div>
	);
};

export default User;
