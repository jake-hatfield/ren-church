'use client';

// react
import { useEffect, useState } from 'react';

// packages
import Skeleton from 'react-loading-skeleton';

// components
import Badge from '@components/utilities/Badge';
import Button from '@components/utilities/Button';
import Card from '@components/utilities/Card';
import Checkbox from '@components/utilities/Checkbox';
import Divider from '@components/utilities/Divider';
import Input from '@components/utilities/Input';
import Link from '@components/utilities/Link';
import SearchInput from '@components/utilities/SearchInput';
import Spinner from '@components/utilities/Spinner';
import TextArea from '@components/utilities/TextArea';
import Toggle from '@components/utilities/Toggle';

// lib
import { searchArray } from '@utils/array';
import placeholders from '@lib/metadata/placeholders';

// icons
import { ArrowRight, Hashtag } from '@carbon/icons-react';
import HighlightableText from '@components/utilities/HighlightableText';

const Page = () => {
	// state
	const [inputEmailValue, setInputEmailValue] = useState('');
	const [inputPasswordValue, setInputPasswordValue] = useState('');
	const [inputNumberValue, setInputNumberValue] = useState('');
	const [inputTelephoneValue, setInputTelephoneValue] = useState('');
	const [isCheckboxChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [textAreaValue, setTextAreaValue] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [searchableItems] = useState([
		{ title: 1 },
		{ title: 2 },
		{ title: 3 },
		{ title: 4 },
		{ title: 9 },
		{ title: 99 },
		{ title: 999 },
	]);
	const [filteredItems, setFilteredItems] = useState([...searchableItems]);

	useEffect(() => {
		setFilteredItems(searchArray(searchableItems, searchQuery, 'title'));
	}, [searchableItems, searchQuery]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 30000);

		return () => {
			clearTimeout(timeout);
		};
	});

	return (
		<section className='content-section mt-content mb-content'>
			<header>
				<h1 className='text-6xl font-black'>Graphene</h1>
				<p className='sub-header mt-5'>
					This is a highly opinionated starter project for your next Next.js
					project. It&apos;s full of utility functions, helpful libraries, and a
					component system heavily inspired by{' '}
					<Link
						href='https://carbondesignsystem.com/'
						isExternal
						title="IBM's Carbon design system"
					/>
					, which is why it&apos;s called Graphene (refined from carbon). I came
					up with it while creating{' '}
					<Link href='https://leadgeek.io' isExternal title='Leadgeek v2' />, so
					it&apos;s really just set up with the technologies I enjoy using - and
					I hope you do too. Follow the project on{' '}
					<Link
						href='https://github.com/jake-hatfield/graphene'
						isExternal
						title='Github'
					/>
					.
				</p>
			</header>
			<Divider classes='mt-content' />
			<ul className='mt-content feature-grid'>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Buttons</h3>
					</header>
					<Divider classes='mt-1.5' />
					<ul>
						<li className='mt-5'>
							<Button icon={<ArrowRight />} title='Primary' />
						</li>
						<li className='mt-1.5'>
							<Button
								icon={<ArrowRight />}
								kind='secondary'
								title='Secondary'
							/>
						</li>
						<li className='mt-1.5'>
							<Button icon={<ArrowRight />} kind='tertiary' title='Tertiary' />
						</li>
						<li className='mt-1.5'>
							<Button icon={<ArrowRight />} kind='ghost' title='Ghost' />
						</li>
					</ul>
				</li>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Badges</h3>
					</header>
					<Divider classes='mt-1.5' />
					<ul>
						<li className='mt-5'>
							<Badge kind='success' title='Success' />
						</li>
						<li className='mt-1.5'>
							<Badge kind='info' title='Info' />
						</li>
						<li className='mt-1.5'>
							<Badge kind='error' title='Error' />
						</li>
						<li className='mt-1.5'>
							<Badge kind='highlighted' title='Highlighted' />
						</li>
						<li className='mt-1.5'>
							<Badge kind='ghost' title='Ghost' />
						</li>
					</ul>
				</li>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Loading states</h3>
					</header>
					<Divider classes='mt-1.5' />
					<Spinner classes='mt-5' />
					<div className='mt-3'>
						{isLoading ? <Skeleton /> : <p>No more loading skeleton!</p>}
					</div>
				</li>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Checkbox</h3>
					</header>
					<Divider classes='mt-1.5' />
					<Checkbox
						classes='mt-5'
						defaultIsChecked={isCheckboxChecked}
						id='checkbox'
						name='Checkbox'
					/>
				</li>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Fields</h3>
					</header>
					<Divider classes='mt-1.5' />
					<div className='mt-5'>
						<Input
							classes='mt-5'
							defaultType='text'
							id='input-email'
							isRequired
							label='Email'
							placeholder={placeholders.email}
							setValue={setInputEmailValue}
							value={inputEmailValue}
						/>
						<Input
							classes='mt-3'
							defaultType='password'
							id='input-password'
							isPassword
							isRequired
							label='Password'
							placeholder='***********'
							setValue={setInputPasswordValue}
							value={inputPasswordValue}
						/>
						<Input
							classes='mt-3'
							defaultType='tel'
							hasIncrementDecrement
							id='input-telephone'
							isRequired
							label='Phone'
							placeholder='555-5555'
							setValue={setInputTelephoneValue}
							value={inputTelephoneValue}
						/>
						<Input
							classes='mt-3'
							defaultType='number'
							hasIncrementDecrement
							id='input-number'
							isRequired
							label='Number'
							max={999}
							min={0}
							placeholder='e.g. 3'
							setValue={setInputNumberValue}
							units='ft'
							value={inputNumberValue}
						/>
						<TextArea
							classes='mt-3'
							id='test'
							label='Text area'
							placeholder='This is a test text area'
							value={textAreaValue}
							setValue={setTextAreaValue}
						/>
					</div>
					<div className='mt-5'>
						<SearchInput query={searchQuery} setQuery={setSearchQuery} />
						<ul>
							{filteredItems.map((item, i) => (
								<li
									className='mt-1.5 flex items-start border border-zinc-200 bg-zinc-100 px-3 py-1.5 first:mt-3 dark:border-zinc-700 dark:bg-zinc-800'
									key={i}
								>
									<Hashtag className='mt-1 flex-none text-zinc-500' />
									<HighlightableText
										classes='ml-3'
										text={item.title.toString()}
										query={searchQuery}
									/>
								</li>
							))}
						</ul>
					</div>
				</li>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Toggle</h3>
					</header>
					<Divider classes='mt-1.5' />
					<Toggle classes='mt-5' name='toggle-unchecked' />
					<Toggle
						classes='mt-3'
						defaultIsChecked={true}
						name='toggle-checked'
					/>
				</li>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Cards</h3>
					</header>
					<Divider classes='mt-1.5' />
					<ul>
						<Card classes='mt-5' title='Regular card'>
							<p>Lorem ipsum dolor sit amet</p>
						</Card>
						<Card classes='mt-3' isPrimary title='Primary card'>
							<p>Lorem ipsum dolor sit amet</p>
						</Card>
						<Card classes='mt-3' isExpandable title='Expandable card'>
							<p>Lorem ipsum dolor sit amet</p>
						</Card>
					</ul>
				</li>
			</ul>
		</section>
	);
};

export default Page;
