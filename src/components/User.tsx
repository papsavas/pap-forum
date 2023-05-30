import Image from 'next/image';
import userIcon from 'public/user.svg';
import { FC } from 'react';
import { User } from '../lib/api';

const User: FC<User & { size: number; icon?: string }> = ({
	name,
	size,
	icon = userIcon,
}) => {
	return (
		<div className="flex items-center gap-4">
			<Image
				className="rounded-full"
				src={icon}
				width={size}
				height={size}
				alt={`${name} profile picture`}
			/>
			{name}
		</div>
	);
};

export default User;
