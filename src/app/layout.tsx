import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
			<body className={`${inter.className} bg-neutral-950`}>
				<Navbar endpoints={['Threads', 'Profile']} />
				{children}
			</body>
		</html>
	);
}
