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
				<main>
					<Navbar
						endpoints={[
							{ name: 'Home', path: '/' },
							'Posts',
							'Profile',
							'Users',
						]}
					/>
					<div className="flex flex-col p-6 md:p-24 xl:mx-[20%]">
						<nav className="mb-16 text-start">
							<Navpath />
						</nav>
						<div className="flex flex-col items-center justify-between">
							{children}
						</div>
					</div>
				</main>
				<footer className="w-full bg-black p-3 text-sm">Footer</footer>
			</body>
		</html>
	);
}
