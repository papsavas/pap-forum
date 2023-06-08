import Navbar from '../components/Navbar';
import Navpath from '../components/Navpath';
import './globals.css';

export const metadata = {
	title: 'Forum',
	description: 'A forum template',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`flex min-h-screen flex-col justify-between overflow-auto bg-neutral-950  text-white`}
			>
				<Navbar
					endpoints={[{ name: 'Home', path: '/' }, 'Posts', 'Profile', 'Users']}
				/>
				<main className="flex flex-1 flex-col px-6 py-3 md:px-24 md:py-12 xl:mx-[20%]">
					<nav className="mb-16 text-start">
						<Navpath />
					</nav>
					<div className="flex h-full flex-1 flex-col items-center justify-between">
						{children}
					</div>
				</main>
				<footer className="w-full bg-black p-3 text-sm">Footer</footer>
			</body>
		</html>
	);
}
