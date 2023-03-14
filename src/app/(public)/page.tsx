'use client';

// react
import { useEffect, useState } from 'react';

// components
import Badge from '@components/utilities/Badge';
import Button from '@components/utilities/Button';
import Card from '@components/utilities/Card';
import Divider from '@components/utilities/Divider';
import Link from '@components/utilities/Link';
import SearchInput from '@components/utilities/SearchInput';
import Spinner from '@components/utilities/Spinner';
import TextArea from '@components/utilities/TextArea';
import Toggle from '@components/utilities/Toggle';

// lib
import { searchArray } from '@utils/array';

// icons
import { ArrowRight } from '@carbon/icons-react';
import HighlightableText from '@components/utilities/HighlightableText';

const Page = () => {
	// state
	const [textAreaValue, setTextAreaValue] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [searchableItems, setSearchableItems] = useState([
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

	return (
		<section className='content-section mt-content mb-content'>
			<header>
				<h1 className='text-6xl font-black'>Next.js starter</h1>
				<p className='sub-header mt-5'>
					This is a highly opinionated starter project for your next Next.js
					project. It&apos;s full of utility functions, helpful libraries, and a
					component system heavily based on{' '}
					<Link
						href='https://carbondesignsystem.com/'
						isExternal
						title="IBM's Carbon design system"
					/>
					that I came up with when creating{' '}
					<Link href='https://leadgeek.io' isExternal title='Leadgeek' /> v2.
					Really, it&apos;s just set up with the technologies I enjoy using, and
					I hope you do too.
				</p>
			</header>
			<Divider classes='mt-content' />
			<ul className='mt-content feature-grid'>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Buttons</h3>
					</header>
					<Button icon={<ArrowRight />} title='Primary' />
					<Button icon={<ArrowRight />} kind='secondary' title='Secondary' />
					<Button icon={<ArrowRight />} kind='tertiary' title='Tertiary' />
					<Button icon={<ArrowRight />} kind='ghost' title='Ghost' />
				</li>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Badges</h3>
					</header>
					<Badge kind='success' title='Success' />
					<Badge kind='info' title='Info' />
					<Badge kind='error' title='Error' />
					<Badge kind='highlighted' title='Highlighted' />
					<Badge kind='ghost' title='Ghost' />
				</li>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Spinner</h3>
					</header>
					<Spinner />
				</li>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Inputs</h3>
					</header>
					<div className='mt-5'>
						<h4>Text area</h4>
						<TextArea
							id='test'
							placeholder='This is a test text area'
							value={textAreaValue}
							setValue={setTextAreaValue}
						/>
					</div>
					<div className='mt-5'>
						<h4>Search input</h4>
						<SearchInput query={searchQuery} setQuery={setSearchQuery} />
						<ul>
							{filteredItems.map((item, i) => (
								<li key={i}>
									<HighlightableText
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
					<Toggle name='toggle' />
				</li>
				<li className='feature-list-item'>
					<header>
						<h3 className='text-3xl font-black'>Cards</h3>
					</header>
					<ul>
						<Card title='Regular card'>
							<p>Lorem ipsum dolor sit amet</p>
						</Card>
						<Card isPrimary title='Primary card'>
							<p>Lorem ipsum dolor sit amet</p>
						</Card>
						<Card isExpandable title='Expandable card'>
							<p>Lorem ipsum dolor sit amet</p>
						</Card>
					</ul>
				</li>
			</ul>
		</section>
	);
};

export default Page;
