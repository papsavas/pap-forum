'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Navpath: FC<{
	styles?: Partial<{
		paths: string;
		lastPath: string;
		separator: string;
	}>;
}> = ({ styles }) => {
	const pathname = usePathname();
	return (
		<div className="flex gap-2">
			{pathname
				.split('/')
				.filter((r) => r)
				.map((route, i, arr) => {
					const fullPath = `/${arr.slice(0, i + 1).join('/')}`;
					const isNested = arr.length > 1;
					const isLast = i === arr.length - 1;
					return isNested ? (
						<div className="flex items-center gap-2">
							{isLast ? (
								<span className={twMerge('cursor-default', styles?.lastPath)}>
									{route}
								</span>
							) : (
								<Link
									className={twMerge(
										'text-neutral-400 hover:text-blue-400 hover:underline',
										styles?.paths
									)}
									href={fullPath}
									key={fullPath}
								>
									{route}
								</Link>
							)}
							{!isLast ? (
								<span
									className={twMerge(
										'cursor-default text-xs text-neutral-200',
										styles?.separator
									)}
								>
									{'>'}
								</span>
							) : null}
						</div>
					) : null;
				})}
		</div>
	);
};

export default Navpath;
