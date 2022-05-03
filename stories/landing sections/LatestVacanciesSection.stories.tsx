import { ComponentStory, ComponentMeta } from '@storybook/react';

import LatestVacanciesSection from '../../landing-secitions/LatestVacanciesSection';

export default {
	title: 'Landing/Latest Vacancies',
	component: LatestVacanciesSection,
} as ComponentMeta<typeof LatestVacanciesSection>;

export const Primary: ComponentStory<typeof LatestVacanciesSection> = () => <LatestVacanciesSection />;
