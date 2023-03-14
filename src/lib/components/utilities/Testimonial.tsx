// icons
import { Quotes } from '@carbon/icons-react';

interface Props {
	author: string;
	children: React.ReactNode;
}

const Testimonial: React.FC<Props> = ({ author, children }) => {
	return (
		<li className='relative transform border-2 border-t-4 border-zinc-200 bg-white p-3 text-white dark:border-zinc-700 dark:bg-zinc-900 md:p-5'>
			<Quotes
				className='absolute top-0 left-0 -translate-x-2 -translate-y-4 rotate-6 transform text-rose-600 md:-translate-y-3 md:-translate-x-2'
				size={32}
			/>
			<Quotes
				className='absolute top-0 left-0 -translate-y-3 -translate-x-1 rotate-3 transform text-cyan-400 md:-translate-x-3 md:-translate-y-4'
				size={32}
			/>
			<blockquote className='text-base text-zinc-700 dark:text-zinc-200'>
				{children}
			</blockquote>
			<p className='mt-3 text-xl'>
				- <cite>{author}</cite>
			</p>
			<Quotes
				className='absolute bottom-0 right-0 -translate-y-5 -translate-x-2 rotate-180 transform text-rose-600'
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
