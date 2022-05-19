import { useState } from 'react';
import ReactSelect from 'react-select';
import Props from './Select.props';
import { getStyles } from './Select.styles';

const Select: React.FC<Props> = ({
	variant = 'primary',
	isLazyLoad,
	onInputChange,
	isDanger,
	loadingMessage = () => 'Загрузка...',
	noOptionsMessage = () => 'Ничего не найдено :(',
	...props
}) => {
	const [lastTimeout, setLastTimeout] = useState<any>();

	return (
		<ReactSelect
			{...props}
			loadingMessage={loadingMessage}
			noOptionsMessage={noOptionsMessage}
			onInputChange={(newValue) => {
				if(onInputChange && isLazyLoad) {
					clearTimeout(lastTimeout);

					const _timeout = setTimeout(() => onInputChange(newValue), 1000);
					setLastTimeout(_timeout);
				}
				else if(onInputChange)
					onInputChange(newValue);
			}}
			styles={getStyles(variant, isDanger)} />
	);
};

export default Select;
