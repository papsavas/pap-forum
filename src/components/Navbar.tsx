import Link from 'next/link';
import { FC } from 'react';

const Navbar: FC<{ endpoints: string[] }> = ({ endpoints }) => {
	return (
		<nav className="bg-black px-8 py-3">
			<div className="flex justify-start gap-10 ">
				{endpoints.map((e) => (
					<Link
						className="text-neutral-200 transition-colors duration-500 hover:text-white"
						key={e}
						href={e[0].toLowerCase() + e.slice(1)}
					>
						{e}
					</Link>
				))}
			</div>
		</nav>
	);
};

export default Navbar;
