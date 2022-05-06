import { ComponentStory, ComponentMeta } from '@storybook/react';
import SkillsSelectPage from '../../pages/profile/_skills_select';

export default {
	title: 'Pages/Skills select',
	component: SkillsSelectPage,
} as ComponentMeta<typeof SkillsSelectPage>;

export const Primary: ComponentStory<typeof SkillsSelectPage> = () => (
	<SkillsSelectPage
		skills={['ux', 'ui', 'design']}
		onClickBack={() => console.log('back')}
		onContinue={() => console.log('continue')} />
);
