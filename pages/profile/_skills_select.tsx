import BackButton from '../../components/BackButton';
import Headline from '../../components/Headline';
import MainLayout from '../../layouts/MainLayout';
import { useState } from 'react';

import CloseIcon from '../../assets/general/close.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useFormik } from 'formik';
import Paragraph from '../../components/Paragraph';

const SkillsSelectPage = ({ onClickBack, skills = [], onContinue }: Props): JSX.Element => {
	const [localSkills, setLocalSkills] = useState<string[]>(skills);

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		onSubmit: (values) => {
			if(localSkills.length < 5 && values.name.length) {
				setLocalSkills((prev) => {
					let _prev = [...prev];
					_prev.push(values.name.replaceAll(' ', '_'));
	
					return _prev;
				});
				formik.resetForm();
			}
		},
	});

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
			<BackButton className='mb-10' onClick={onClickBack} />
			<Headline variant='5' tag='h1' className='font-bold mb-10'>
				Профессиональные навыки
			</Headline>
			<div className='flex flex-wrap gap-2 mb-8'>
				{localSkills.map((i, num) => (
					<span key={num} className='bg-softGold py-1 px-2 grid grid-cols-[1fr_auto] gap-3 rounded'>
						{i}
						<button onClick={() => setLocalSkills((prev) => prev.filter((j) => j !== i))}>
							<CloseIcon className='fill-icon-secondary' />
						</button>
					</span>
				))}
			</div>
			<form onSubmit={formik.handleSubmit} className='grid grid-flow-col gap-4 mb-8'>
				<div>
					<Input
						name='name'
						value={formik.values.name}
						onChange={formik.handleChange}
						placeholder='Что вы хорошо умеете делать?' />
					<Paragraph variant='6' tag='p' className='mt-2 float-right'>
						{localSkills.length}
						{' из 5'}
					</Paragraph>
				</div>
				<Button className='w-[138px] h-14' variant='outline_secondary'>
					Добавить навык
				</Button>
			</form>
			<div className='grid grid-flow-col gap-2 w-fit'>
				<Button className='h-12 w-[209px]' onClick={() => onContinue(localSkills)}>
					Сохранить изменения
				</Button>
				<Button variant='secondary' className='h-12 w-[114px]' onClick={onClickBack}>
					Отмена
				</Button>
			</div>
		</MainLayout>
	);
};

interface Props {
	onClickBack: () => void;
	skills: string[];
	onContinue: (values: string[]) => void;
}

export default SkillsSelectPage;
