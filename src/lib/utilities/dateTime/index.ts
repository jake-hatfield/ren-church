// packages
import { DateTime } from 'luxon';

// lib
import { handlePluralization } from '@utils/string';

export const convertIsoToTimestamp = (iso: string) => {
	return DateTime.fromISO(iso).toMillis();
};

export const convertKeepaTime = (keepaTime: number) => {
	return (keepaTime + 21564000) * 60;
};

export const convertKeepaTimeToIso = (keepaTime: number) => {
	return convertTimestampToIso(convertKeepaTime(keepaTime));
};

export const convertTimestampToIso = (timestamp: number) => {
	return new Date(timestamp * 1000).toISOString();
};

export const getCurrentTime = () => {
	return DateTime.now();
};

export const getDifference = (futureDate: DateTime, date: DateTime) => {
	return futureDate.diff(date, ['days', 'hours', 'minutes']);
};

export const formatDifference = (futureDate: DateTime, date?: DateTime) => {
	let dt: DateTime;

	if (!date) {
		dt = getCurrentTime();
	} else {
		dt = date;
	}

	const difference = getDifference(futureDate, dt);

	// if time difference is in the past
	if (difference.minutes < 0) {
		// don't mess around with stupid negative values & operands
		const diffDays = Math.abs(+difference.days.toFixed(0));
		const diffHours = Math.abs(+difference.hours.toFixed(0));
		const diffMinutes = Math.abs(+difference.minutes.toFixed(0));

		if (diffDays === 0 && diffHours === 0 && diffMinutes < 60) {
			if (diffMinutes < 1) {
				return 'Just now';
			} else {
				return `${handlePluralization('minute', diffMinutes, true)} ago`;
			}
		}

		if (diffDays < 1) {
			return `${handlePluralization(
				'hour',
				Math.abs(+difference.hours),
				true
			)} ago`;
		}

		return `${handlePluralization('day', diffDays, true)} ago`;
	} else {
		// then time difference must be in the future...

		// simplify this process
		const diffDays = +difference.days.toFixed(0);
		const diffHours = +difference.hours.toFixed(0);
		const diffMinutes = +difference.minutes.toFixed(0);

		// if only minutes left
		if (diffDays === 0 && diffHours === 0 && diffMinutes < 60) {
			return `${handlePluralization('minute', diffMinutes, true)} left`;
		}

		// if more than 1 hour, but less than 1 day left
		if (diffDays < 1) {
			return `${handlePluralization(
				'hour',
				+difference.hours.toFixed(0),
				true
			)} ${handlePluralization('minute', diffMinutes, true)} left`;
		}

		if (diffDays < 2) {
			return `${handlePluralization('hour', diffHours, true)} left`;
		}

		return `${handlePluralization('day', diffDays, true)}${
			diffHours > 0 ? `, ${handlePluralization('hour', diffHours, true)}` : ''
		} left`;
	}
};

export const formatTimestamp = (timestamp: number, format = 'LLL dd, yyyy') => {
	const isoTime = convertTimestampToIso(timestamp);
	return DateTime.fromISO(isoTime).toFormat(format);
};

export const formatIsoToText = (isoTime: string, format = 'LLL dd, yyyy') => {
	return DateTime.fromISO(isoTime).toFormat(format);
};
