'use client';

// react
import { useState } from 'react';

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
	defaultSelectedCountry = null,
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
	const [selectedCountry, setSelectedCountry] = useState(
		defaultSelectedCountry
	);
	const [showPasswordText, setShowPasswordText] = useState(false);
	const [type, setType] = useState(defaultType);

	// error handling logic
	if (type === 'tel' && !selectedCountry)
		throw new Error('Selected country must be included');

	if (type === 'number' && !min && !max)
		throw new Error('Min and max values must be included');

	// functions
	const handleChange = (e: any) => {
		onChange && onChange(e);
	};

	const handleInput = (e: any) => {
		const target = e.target as HTMLInputElement;

		if (!validateInput(target)) return;

		// update the value
		setValue(target.value);
		onInput && onInput(e);
	};

	const validateInput = (target: HTMLInputElement) => {
		if (type === 'number' && !validateNumberInput(target)) return false;

		return true;
	};

	const validateNumberInput = (target: HTMLInputElement) => {
		if (+target.value < min) {
			const minToString = min.toString();
			target.value = minToString;
			setValue(minToString);
			return false;
		}

		if (+target.value > max) {
			const maxToString = max.toString();
			target.value = maxToString;
			setValue(maxToString);
			return false;
		}

		return true;
	};

	const toggleShowPasswordText = () => {
		setShowPasswordText((prev) => !prev);
		setType(showPasswordText ? 'text' : 'password');
	};

	return (
		<div>
			{label && (
				<label
					htmlFor={id}
					className={`block font-medium text-zinc-700 dark:text-zinc-300 ${
						isReadOnly ? 'cursor-not-allowed text-zinc-500' : 'cursor-text'
					}`}
				>
					{label}
					{isRequired ? '*' : ''}
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
							<ol className='minimal-scrollbar absolute top-12 z-40 h-72 overflow-y-auto border-2 border-t-4 border-zinc-700 bg-zinc-900'>
								<li className='border-b-2 border-zinc-700'>
									<ol>
										{preferredCountries.map((country, i) => (
											<li key={i}>
												<button
													className='flex w-full items-center justify-between py-2.5 px-3 hover:bg-zinc-800'
													onClick={() => {
														setSelectedCountry(country);
														setIsCountryActive(false);
													}}
												>
													<span>
														<span className='inline-block w-8 text-sm'>
															{country.emoji || country.alpha2}
														</span>
														<span className='ml-3'>{country.name}</span>
													</span>
													<span className='text-zinc-300'>
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
											className='flex w-full items-center justify-between py-2.5 px-3 hover:bg-zinc-800'
											onClick={() => {
												setSelectedCountry(country);
												setIsCountryActive(false);
											}}
										>
											<span>
												<span className='inline-block w-8 text-sm'>
													{country.emoji || country.alpha2}
												</span>
												<span className='ml-3'>{country.name}</span>
											</span>
											<span className='text-zinc-300'>
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
								error ? 'right-10' : 'right-0'
							} top-1 flex items-center`}
						>
							<Button
								icon={<Subtract />}
								isDisabled={+value <= min}
								kind='ghost'
								onClick={() => setValue((+value - 1).toString())}
								size='sm'
								title='Subtract'
								type='icon'
							/>
							<Button
								classes='ml-0.5'
								icon={<Add />}
								isDisabled={+value >= max}
								kind='ghost'
								onClick={() => setValue((+value + 1).toString())}
								size='sm'
								title='Add'
								tooltipAlignment='end'
								type='icon'
							/>
						</div>
					)
				)}
				{units && (
					<span className='flex w-10 flex-none items-center justify-center bg-zinc-700 px-3 pt-[8px] pb-[7px]'>
						{units}
					</span>
				)}
				<input
					className={`block w-full border-b-2 bg-zinc-800 py-1.5 pr-3 pl-3 md:py-2 ${
						type === 'number' && !hasIncrementDecrement ? '' : 'md:pr-10'
					} ${
						error
							? 'placeholder:red-300 border-red-300 text-red-400 focus:border-red-500 focus:ring-red-500'
							: isReadOnly
							? 'cursor-not-allowed border-zinc-700 text-zinc-500'
							: 'cursor-text border-zinc-700 text-zinc-300 focus:border-white focus:ring-white'
					} mono placeholder:zinc-500 placeholder:text-xs focus:outline-none sm:text-sm md:placeholder:text-sm`}
					disabled={isReadOnly}
					id={id}
					onChange={(e) => handleChange(e)}
					onInput={(e) => handleInput(e)}
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
							toggleShowPasswordText();
						}}
						className={`absolute inset-y-0 ${
							error ? 'right-10' : 'right-2.5'
						} text-zinc-300 transition duration-150`}
						data-testId={
							showPasswordText ? 'hide-password-text' : 'show-password-text'
						}
					>
						{showPasswordText ? (
							<ViewOffFilled size={24} />
						) : (
							<ViewFilled size={24} />
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
						<p className='text-zinc-500' id={`${id}-read-only`}>
							This field is not editable
						</p>
					) : helperText ? (
						<p className='text-zinc-300' id={`${id}-helper-text`}>
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
