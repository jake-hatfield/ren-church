'use client';

// react
import { useEffect, useRef } from 'react';

// types
import type { Dispatch, SetStateAction } from 'react';
import type { StripeCardElement, StripeElements } from '@stripe/stripe-js';
interface Props {
	card: StripeCardElement | null;
	classes: string;
	elements: StripeElements;
	firstName: string;
	inputErrors: {
		card: string;
		firstName: string;
		lastName: string;
	};
	lastName: string;
	setFirstName: Dispatch<SetStateAction<string>>;
	setLastName: Dispatch<SetStateAction<string>>;
}

const Elements: React.FC<Props> = ({
	card,
	classes,
	elements,
	firstName,
	inputErrors,
	lastName,
	setFirstName,
	setLastName,
}) => {
	const ref = useRef(null);

	// functions
	const createStripeCardElement = async () => {
		card = elements.create('card', {
			style: {
				base: {
					color: '#F4F4F5',
					fontSize: '14px',
					fontFamily: 'inherit',
					iconColor: '#F4F4F5',
				},
				invalid: {
					iconColor: '#ff154b',
					color: '#ff154b',
				},
				complete: {
					iconColor: '#EFAC87',
				},
			},
		});
	};

	useEffect(() => {
		if (!card) createStripeCardElement();

		card?.mount(ref);

		return () => {
			if (card) card.unmount();
		};
	});

	return (
		<>
			<div
				className={`mt-3 ${
					inputErrors.card ? 'border-red-300' : 'border-zinc-700'
				} border border-b-2 bg-zinc-800 py-2.5 px-3 text-zinc-300 ring-inset placeholder:text-zinc-500 focus:border-white focus:outline-none focus:ring-white sm:text-sm ${
					classes ? classes : ''
				}`}
				ref={ref}
			/>
			{inputErrors.card && (
				<div className='mt-1.5 text-left text-xs md:text-sm'>
					<p className='text-red-400' id='card-error'>
						{inputErrors.card}
					</p>
				</div>
			)}
		</>
	);
};

export default Elements;
