function removeItemFromArray<T>(array: T[], item: T): T[] {
	let _array = array;

	_array.splice(array.indexOf(item), 1);

	return _array;
};

export default removeItemFromArray;
