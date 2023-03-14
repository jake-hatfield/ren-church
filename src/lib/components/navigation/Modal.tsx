// components
import Button from '@components/utilities/Button';

// icons
import { Close } from '@carbon/icons-react';

// types
interface Props {
	isActive: boolean;
	handleClose: () => {};
	hasAction: boolean;
	title: string;
}

const Modal: React.FC<Props> = ({
	isActive,
	hasAction,
	handleClose,
	title,
}) => {
	return (
		<div aria-expanded={isActive}>
			<div
				aria-hidden='true'
				className='fixed inset-0 -top-20 z-40 h-[10000px] bg-zinc-700 opacity-75 lg:-top-12'
				onClick={handleClose}
			/>
			<aside className='shadow-stack minimal-scrollbar fixed left-2 right-2 top-0 z-40 max-h-screen max-w-lg transform overflow-y-auto border-2 border-zinc-700 bg-zinc-900 md:top-1/2 md:left-1/2 md:max-h-screen md:w-full md:-translate-x-1/2 md:-translate-y-1/2'>
				<div className='flex items-center justify-between border-b-2 border-zinc-700 px-3 pt-3 pb-1.5 md:px-5'>
					<header className='w-5/6 whitespace-normal'>
						<h5 className='text-base font-semibold md:text-lg'>{title}</h5>
					</header>
					{/* <!-- close button --> */}
					<Button
						icon={<Close />}
						kind='ghost'
						onClick={handleClose}
						title='Close'
						tooltipAlignment='end'
						type='icon'
					/>
				</div>
				<div className='minimal-scrollbar max-h-96 break-words px-3 text-white md:px-5'>
					<slot name='description' />
				</div>
				{hasAction && (
					<div className='flex justify-end border-t-2 border-zinc-700 bg-zinc-900 px-3 pt-2 pb-3 md:px-5'>
						<slot name='action' />
					</div>
				)}
			</aside>
		</div>
	);
};

export default Modal;
