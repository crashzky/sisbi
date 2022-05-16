import { MutableRefObject, useEffect, useState } from 'react';
import { IResponse } from './useRefDemantions.props';

const useRefDemantions = (ref: MutableRefObject<any>): IResponse => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if(ref && ref.current) {
			setWidth(ref.current.clientWidht);
			setHeight(ref.current.clientHeight);
		}
	}, []);

	return {
		width,
		height,
	};
};

export default useRefDemantions;
