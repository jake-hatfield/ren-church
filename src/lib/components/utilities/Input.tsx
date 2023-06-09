'use client';

// react
import { useCallback, useEffect, useState } from 'react';

// packages
import { callingCountries, countries } from 'country-data';

// components
import Button from '@components/utilities/Button';

// icons
import {
	Add,
	ChevronDown,
	ErrorFilled,
	Subtract,
	ViewFilled,
	ViewOffFilled,
} from '@carbon/icons-react';

// types
import type { Country } from 'country-data';
import type { Dispatch, SetStateAction } from 'react';
type HTMLInputTypes =
	| 'button'
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'password'
	| 'range'
	| 'reset'
	| 'search'
	| 'submit'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week';
interface Props {
	button?: React.ReactNode;
	classes?: string;
	defaultSelectedCountry?: Country | null;
	defaultType: HTMLInputTypes;
	error?: string;
	hasInlineButton?: boolean;
	hasIncrementDecrement?: boolean;
	helperText?: string;
	id: string;
	isPassword?: boolean;
	isRequired?: boolean;
	isReadOnly?: boolean;
	label?: string;
	max?: number;
	min?: number;
	onChange?: (e: any) => {};
	onInput?: (e: any) => {};
	placeholder: string;
	setValue: Dispatch<SetStateAction<string>>;
	units?: string;
	value: string;
}

const Input: React.FC<Props> = ({
	button,
	classes,
	defaultType,
	error,
	hasInlineButton = false,
	hasIncrementDecrement = false,
	helperText = '',
	id,
	isPassword = false,
	isRequired = false,
	isReadOnly = false,
	label,
	max = 0,
	min = 0,
	onChange,
	onInput,
	placeholder,
	setValue,
	units,
	value,
}) => {
	// state
	const [isCountryActive, setIsCountryActive] = useState(false);
	const [preferredCountries] = useState([countries.US]);
	const [selectedCountry, setSelectedCountry] = useState(preferredCountries[0]);
	const [showPasswordText, setShowPasswordText] = useState(false);
	const [type, setType] = useState(defaultType);

	// error handling logic
	if (type === 'number' && !min && !max)
		throw new Error('Min and max values must be included');

	// functions
	const handleInput = (e: any) => {
		const target = e.target as HTMLInputElement;

		// update the value
		setValue(target.value);

		onInput && onInput(e);
	};

	const validateNumberInput = useCallback(
		(value: string) => {
			if (+value <= min) return setValue(min.toString());

			if (+value >= max) return setValue(max.toString());
		},
		[max, min, setValue]
	);

	const validateInput = useCallback(
		(value: string) => {
			if (type === 'number') return validateNumberInput(value);
		},
		[type, validateNumberInput]
	);

	useEffect(() => {
		if (!value) return;

		validateInput(value);
	}, [type, validateInput, value]);

	return (
		<div className={classes}>
			{label && (
				<label
					htmlFor={id}
					className={`block font-medium text-neutral-700 dark:text-neutral-300 ${
						isReadOnly ? 'cursor-not-allowed text-neutral-500' : 'cursor-text'
					}`}
				>
					{label}
					{isRequired ? ' *' : ''}
				</label>
			)}
			<div className={`${label ? 'mt-1.5' : ''} relative flex`}>
				{type === 'tel' && selectedCountry ? (
					<div>
						<Button
							classes='mr-0.5'
							kind='tertiary'
							icon={<ChevronDown />}
							onClick={() => setIsCountryActive((prev) => !prev)}
							title={
								selectedCountry?.emoji || selectedCountry?.alpha2 || 'Country'
							}
						/>
						{isCountryActive && (
							<ol className='minimal-scrollbar absolute top-12 z-40 h-72 overflow-y-auto border-2 border-t-4 border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900'>
								<li className='border-b-2 border-neutral-200 dark:border-neutral-700'>
									<ol>
										{preferredCountries.map((country, i) => (
											<li key={i}>
												<button
													className='flex w-full items-start justify-between py-2.5 pl-3 pr-5 hover:bg-neutral-100 dark:hover:bg-neutral-800'
													onClick={() => {
														setSelectedCountry(country);
														setIsCountryActive(false);
													}}
												>
													<span className='flex items-start'>
														<span className='inline-block w-8 text-sm'>
															{country.emoji || country.alpha2}
														</span>
														<span className='ml-3 text-left text-sm'>
															{country.name}
														</span>
													</span>
													<span className='ml-3 min-w-fit text-neutral-700 dark:text-neutral-300'>
														{country.countryCallingCodes[0]}
													</span>
												</button>
											</li>
										))}
									</ol>
								</li>
								{callingCountries.all.map((country, i) => (
									<li key={i}>
										<button
											className='flex w-full items-start justify-between py-2.5 pl-3 pr-5 hover:bg-neutral-100 dark:hover:bg-neutral-800'
											onClick={() => {
												setSelectedCountry(country);
												setIsCountryActive(false);
											}}
										>
											<span className='flex items-start'>
												<span
													className={`inline-block w-8 ${
														country.emoji ? 'text-base' : 'text-xs'
													}`}
												>
													{country.emoji || country.alpha2}
												</span>
												<span className='ml-3 text-left text-sm'>
													{country.name}
												</span>
											</span>
											<span className='ml-3 min-w-fit text-neutral-700 dark:text-neutral-300'>
												{country.countryCallingCodes[0]}
											</span>
										</button>
									</li>
								))}
							</ol>
						)}
					</div>
				) : (
					type === 'number' &&
					hasIncrementDecrement && (
						<div
							className={`absolute ${
								error ? 'right-10' : 'right-0.5'
							} top-1.5 flex items-center`}
						>
							<Button
								icon={<Subtract />}
								kind='ghost'
								onClick={() => setValue((+value - 1).toString())}
								size='sm'
								title='Decrement'
								type='icon'
							/>
							<Button
								classes='ml-0.5'
								icon={<Add />}
								kind='ghost'
								onClick={() => setValue((+value + 1).toString())}
								size='sm'
								title='Increment'
								tooltipAlignment='end'
								type='icon'
							/>
						</div>
					)
				)}
				{units && (
					<span className='mr-0.5 flex w-10 flex-none items-center justify-center bg-neutral-200 px-3 pb-[7px] pt-[8px] text-sm font-semibold dark:bg-neutral-700'>
						{units}
					</span>
				)}
				<input
					className={`block w-full border-b-2 bg-neutral-100 py-1.5 pl-3 pr-3 dark:bg-neutral-800 md:py-2 ${
						type === 'number' && !hasIncrementDecrement ? '' : 'md:pr-10'
					} ${
						error
							? 'placeholder:red-300 border-red-300 text-red-400 focus:border-red-500'
							: isReadOnly
							? 'cursor-not-allowed border-neutral-700 text-neutral-500'
							: 'cursor-text border-neutral-300 text-neutral-800 focus:border-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:focus:border-white'
					} placeholder:neutral-500 placeholder:text-xs focus:outline-none focus:ring-0 sm:text-sm md:placeholder:text-sm`}
					disabled={isReadOnly}
					id={id}
					onChange={(e) => handleInput(e)}
					// onInput={(e) => handleInput(e)}
					min={type === 'number' ? min : ''}
					max={type === 'number' ? max : ''}
					name={id}
					placeholder={placeholder}
					required={isRequired}
					type={type}
					value={value}
				/>
				{error && (
					<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-red-300'>
						<ErrorFilled />
					</div>
				)}
				{isPassword && value && (
					<button
						onClick={(e) => {
							e.preventDefault();
							setShowPasswordText((prev) => !prev);
							setType((prev) => (prev === 'password' ? 'text' : 'password'));
						}}
						className={`absolute inset-y-0 ${
							error ? 'right-10' : 'right-2.5'
						} text-neutral-500 transition duration-150`}
						data-testid={
							showPasswordText ? 'hide-password-text' : 'show-password-text'
						}
					>
						{showPasswordText ? (
							<ViewOffFilled size={20} />
						) : (
							<ViewFilled size={20} />
						)}
					</button>
				)}
				{hasInlineButton && button}
			</div>
			{(error || isReadOnly || helperText) && (
				<div className='mt-1.5 text-left text-xs md:text-sm'>
					{error ? (
						<p className='text-red-400' id={`${id}-error`}>
							{error}
						</p>
					) : isReadOnly ? (
						<p className='text-neutral-500' id={`${id}-read-only`}>
							This field is not editable
						</p>
					) : helperText ? (
						<p
							className='text-neutral-500 dark:text-neutral-300'
							id={`${id}-helper-text`}
						>
							{helperText}
						</p>
					) : (
						<></>
					)}
				</div>
			)}
		</div>
	);
};

export default Input;
