import Link from 'next/link';
import { FC } from 'react';

const Navbar: FC<{
	endpoints: (string | { name: string; path: string })[];
}> = ({ endpoints }) => {
	return (
		<nav className="bg-black px-8 py-3">
			<div className="flex justify-start gap-10 ">
				{endpoints.map((e) => {
					const [path, name] =
						typeof e === 'object'
							? [e.path, e.name]
							: [e[0].toLowerCase() + e.slice(1), e];

					return (
						<Link
							className="text-neutral-200 transition-colors duration-500 hover:text-white"
							key={path}
							href={path}
						>
							{name}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default Navbar;
