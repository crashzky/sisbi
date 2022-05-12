import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Headline from '../../components/Headline';
import Textarea from '../../components/Textarea';
import MainLayout from '../../layouts/MainLayout';
import { useFormik } from 'formik';

const EditDescriptionPage = ({ onBack, onContinue, initialValue }: Props): JSX.Element => {
	const formik = useFormik({
		initialValues: {
			textarea: initialValue,
		},
		onSubmit: (values) => onContinue(values.textarea),
	});

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
			<BackButton onClick={onBack} className='mb-10' />
			<Headline variant='5' tag='h1' className='font-bold mb-10'>
				Описание вакансии
			</Headline>
			<form onSubmit={formik.handleSubmit}>
				<Textarea
					name='textarea'
					value={formik.values.textarea}
					onChange={formik.handleChange}
					placeholder='Расскажите о вашей вакансии и требованиях к соискателям'
					className='h-[320px] max-w-[647px] w-full' />
				<div className='grid grid-flow-col w-fit gap-2 mt-8'>
					<Button className='h-12 w-[229px]'>
						Сохранить изменения
					</Button>
					<Button
						type='button'
						variant='secondary'
						className='h-12 w-[114px]'
						onClick={onBack}
					>
						Отмена
					</Button>
				</div>
			</form>
		</MainLayout>
	);
};

interface Props {
	onBack: () => void;
	onContinue: (value: string) => void;
	initialValue?: string;
}

export default EditDescriptionPage;
