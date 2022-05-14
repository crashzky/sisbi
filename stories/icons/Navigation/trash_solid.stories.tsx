import { ComponentStory, ComponentMeta } from '@storybook/react';

import TrashSolidIcon from '../../../assets/navigation/trash_solid.svg';

export default {
	title: 'Icons/Navigation/Trash',
	component: TrashSolidIcon,
} as ComponentMeta<typeof TrashSolidIcon>;

export const Primary: ComponentStory<typeof TrashSolidIcon> = () => <TrashSolidIcon />;
