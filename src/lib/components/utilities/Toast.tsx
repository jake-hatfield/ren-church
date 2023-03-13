// components
import Button from '@components/utilities/Button';

// icons
import {
	CheckmarkFilled,
	Close,
	ErrorFilled,
	InformationFilled,
} from '@carbon/icons-react';

// types
import type { DateTime } from 'luxon';
interface Props {
	id: string;
	createdAt: DateTime;
	description: string;
	kind: 'success' | 'error' | 'info';
	title: string;
}

const Toast: React.FC<Props> = ({
	id,
	createdAt,
	description,
	kind,
	title,
}) => {
	return (
		<>
			<li className='shadow-stack flex w-80 max-w-full items-start justify-between border-2 border-t-4 border-zinc-700 bg-zinc-900 p-3'>
				<div className='flex w-4/5 items-start'>
					{kind === 'error' ? (
						<ErrorFilled className='mt-1 flex-none text-red-500' size={20} />
					) : kind === 'info' ? (
						<InformationFilled
							className='mt-1 flex-none text-yellow-500'
							size={20}
						/>
					) : (
						<CheckmarkFilled
							className='mt-1 flex-none text-green-300'
							size={20}
						/>
					)}

					<div className='ml-3'>
						<header>
							<h3 className='mono text-sm font-semibold'>{title}</h3>
							<p className='mt-1.5 break-words text-zinc-300'>{description}</p>
						</header>
						<div className='mt-3'>
							<slot name='action' />
						</div>
						<p className='mt-1.5 text-sm text-zinc-300'>
							<time dateTime={createdAt.toString()}>
								{createdAt.toFormat('tt')}
							</time>
						</p>
					</div>
				</div>
				<div className='flex w-1/5 justify-end'>
					<Button
						kind='ghost'
						// onClick={() => toastStore.deleteNotification(id)}
						size='sm'
						title='Close'
						tooltipAlignment='end'
						type='icon'
					>
						<Close />
					</Button>
				</div>
			</li>
		</>
	);
};

export default Toast;
