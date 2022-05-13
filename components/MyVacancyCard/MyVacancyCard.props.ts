import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { VacancyStatesType } from '../../shared/types/api/common';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	imageSrc: string | null;
	label: string;
	minPrice: number;
	description: string;
	tags: string[];
	last_update: string;
	vacancyId: number;
	views: number;
	shows: number;
	state: VacancyStatesType;
};

export default Props;
