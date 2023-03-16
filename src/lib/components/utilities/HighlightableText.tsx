'use client';
// react
import { useEffect, useState } from 'react';

// packages
import highlightWords from 'highlight-words';

// types
interface Props {
	classes?: string;
	text: string;
	query: string;
}

const HighlightableText: React.FC<Props> = ({ classes, text, query }) => {
	// state
	const [chunks, setChunks] = useState(
		highlightWords({ text, query, matchExactly: true })
	);

	useEffect(() => {
		setChunks(highlightWords({ text, query, matchExactly: true }));
	}, [text, query]);

	return (
		<span className={classes ? classes : ''}>
			{chunks.map(({ text, match, key }) => (
				<span className={match ? 'highlight' : ''} key={key}>
					{text}
				</span>
			))}
		</span>
	);
};

export default HighlightableText;
