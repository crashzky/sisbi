import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ISelectOption } from '../Select/Select.props';

interface Props extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'> {
	options: ISelectOption[];
	value?: ISelectOption;
	onChange?: (newValue: ISelectOption) => void;
};

export default Props;
