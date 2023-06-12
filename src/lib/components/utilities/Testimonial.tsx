// icons
import { Quotes } from '@carbon/icons-react';

interface Props {
	author: string;
	children: React.ReactNode;
}

const Testimonial: React.FC<Props> = ({ author, children }) => {
	return (
		<li className='relative transform border-2 border-t-4 border-gray-300 bg-white p-3 text-white dark:border-gray-700 dark:bg-gray-900 md:p-5'>
			<Quotes
				className='absolute left-0 top-0 -translate-x-2 -translate-y-4 rotate-6 transform text-rose-800 md:-translate-x-2 md:-translate-y-3'
				size={32}
			/>
			<Quotes
				className='absolute left-0 top-0 -translate-x-1 -translate-y-3 rotate-3 transform text-cyan-400 md:-translate-x-3 md:-translate-y-4'
				size={32}
			/>
			<blockquote className='text-base text-gray-700 dark:text-gray-200'>
				{children}
			</blockquote>
			<p className='mt-3 text-xl'>
				- <cite>{author}</cite>
			</p>
			<Quotes
				className='absolute bottom-0 right-0 -translate-x-2 -translate-y-5 rotate-180 transform text-rose-800'
				size={32}
			/>
			<Quotes
				className='absolute bottom-0 right-0 -translate-x-3 -translate-y-6 rotate-180 transform text-cyan-400'
				size={32}
			/>
		</li>
	);
};

export default Testimonial;
