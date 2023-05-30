import Navbar from '../components/Navbar';
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
				<Navbar endpoints={['Posts', 'Profile']} />
				<div className="flex flex-col items-center justify-between p-8 md:p-24 xl:mx-[20%]">
					{children}
				</div>
				<footer className="w-full bg-black p-3 text-sm">Footer</footer>
			</body>
		</html>
	);
}
