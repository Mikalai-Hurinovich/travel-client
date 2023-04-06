export function calculateDaysDifference (firstDate: Date, secondDate: Date): number {
	const oneDayInMs = 24 * 60 * 60 * 1000;
	const firstDateMs = firstDate.getTime();
	const secondDateMs = secondDate.getTime();
	const diffInMs = Math.abs(firstDateMs - secondDateMs);
	return Math.round(diffInMs / oneDayInMs);
}
