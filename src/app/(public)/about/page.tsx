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
				<h1 className='headline-primary'>Ren Church</h1>
			</header>
			<h2 className='headline-secondary'>Title test</h2>
			<h3 className='headline-tertiary'>Title test again</h3>
			<p>Hello, world!</p>
		</section>
	);
};

export default Page;
