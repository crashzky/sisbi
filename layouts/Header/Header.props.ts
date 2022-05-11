import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IEmployerResponse, IUserResponse } from '../../shared/types/api/user';
import { IHeaderItem } from '../../shared/types/header';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	items?: IHeaderItem[];
	userData?: IUserResponse | IEmployerResponse | null;
}

export default Props;
