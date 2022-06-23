import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep6Modal.props';
import Paragraph from '../../components/Paragraph';
import Checkbox from '../../components/Checkbox';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Select from '../../components/Select';
import { useState } from 'react';
import { ISelectOption } from '../../components/Select/Select.props';
import { getCities } from '../../shared/api/cities';
import { useMutation, useQuery } from 'react-query';
import { getMyProfileUser, putProfileUser } from '../../shared/api/user';
import { addSchedulesUser, getSchedules, removeSchedulesUser } from '../../shared/api/schedules';
import { addTypeEmployementUser, getTypeEmployments, removeTypeEmployementUser } from '../../shared/api/type_employments';

import Step1Image from '../../assets/signup_steps/1.svg';

const SingupStep6Modal: React.FC<Props> = () => {
	const router = useRouter();

	const [city, setCity] = useState<ISelectOption>();

	const myProfileQuery = useQuery('my_profile_user', getMyProfileUser);

	const citiesMutation = useMutation(getCities);
	
	const schedulesQuery = useQuery('schedules', getSchedules, {
		initialData: {
			current_page: 1,
			next_page: null,
			payload: [],
			result_code: 'ok',
			total_entries: 0,
			total_pages: 1,
		},
	});

	const typeEmploymentsQuery = useQuery('type_employments', getTypeEmployments, {
		initialData: {
			current_page: 1,
			next_page: null,
			payload: [],
			result_code: 'ok',
			total_entries: 0,
			total_pages: 1,
		},
	});

	const formik = useFormik({
		initialValues: {
			schedule: [],
			employment: [],
		},
		onSubmit: null,
	});

	const putProfileMutation = useMutation(putProfileUser, {
		onSuccess: () => router.push(router.pathname + '/?modal=signupFinal'),
	});

	const addSchedulesUserMutattion = useMutation(addSchedulesUser, {
		onSuccess: () => router.push(router.pathname + '/?modal=signupFinal'),
	});

	const removeSchedulesUserMutation = useMutation(removeSchedulesUser, {
		onSuccess: () => router.push(router.pathname + '/?modal=signupFinal'),
	});

	const addTypeEmployementUserMutation = useMutation(addTypeEmployementUser, {
		onSuccess: () => router.push(router.pathname + '/?modal=signupFinal'),
	});

	const removeTypeEmployementUserMutation = useMutation(removeTypeEmployementUser, {
		onSuccess: () => router.push(router.pathname + '/?modal=signupFinal'),
	});

	const onClickContinue = () => {
		let deleteShedules = myProfileQuery.data
			? myProfileQuery.data.payload.schedules.map((i) => i.id)
			: [];
		let addShedules = formik.values.schedule.map((i) => +i);

		addSchedulesUserMutattion.mutate({
			schedules: addShedules,
		});

		removeSchedulesUserMutation.mutate({
			schedules: deleteShedules,
		});

		let deleteTypeEmployements = myProfileQuery.data
			? myProfileQuery.data.payload.type_employments.map((i) => i.id)
			: [];
		let addTypeEmployements = formik.values.employment.map((i) => +i);

		addTypeEmployementUserMutation.mutate({
			type_employments: addTypeEmployements,
		});

		removeTypeEmployementUserMutation.mutate({
			type_employments: deleteTypeEmployements,
		});

		putProfileMutation.mutate({
			user: {
				city_id: +city.value,
			},
		});
	};

	return (
		<SignupStepLayout
			label='Выберите условия работы'
			currentStep={6}
			maxSteps={7}
			HeaderImage={Step1Image}
			isLoading={addSchedulesUserMutattion.isLoading || removeSchedulesUserMutation.isLoading 
				|| addTypeEmployementUserMutation.isLoading || removeTypeEmployementUserMutation.isLoading}
			onClickBack={() => router.push(router.pathname + '/?modal=signup5')}
			onClickContinue={() => {
				if(city)
					onClickContinue();
			}}
		>
			<form onSubmit={formik.handleSubmit}>
				<div className='grid grid-cols-2 mb-5'>
					<div className='grid gap-3'>
						<Paragraph variant='4' tag='h3' className='font-semibold'>
							График работы
						</Paragraph>
						{schedulesQuery.data.payload.map((i) => (
							<Checkbox
								key={i.id}
								name='schedule'
								onChange={formik.handleChange}
								value={i.id}
								label={i.name} />
						))}
					</div>
					<div className='grid gap-3'>
						<Paragraph variant='4' tag='h3' className='font-semibold'>
							График занятости
						</Paragraph>
						{typeEmploymentsQuery.data.payload.map((i) => (
							<Checkbox
								key={i.id}
								name='employment'
								onChange={formik.handleChange}
								value={i.id}
								label={i.name} />
						))}
					</div>	
				</div>	
				<Select
					variant='primary'
					placeholder='Ваш город'
					isLazyLoad
					isDanger={!city && !!formik.submitCount}
					onInputChange={(newValue) => citiesMutation.mutate({ name: newValue })}
					noOptionsMessage={() => 'Ничего не найдено'}
					loadingMessage={() => 'Загрузка...'}
					isLoading={citiesMutation.isLoading}
					value={city}
					onChange={setCity}
					options={citiesMutation.isSuccess
						? citiesMutation.data.payload.map((i) => ({ value: i.id.toString(), label: i.name }))
						: []} />
			</form>
		</SignupStepLayout>
	);
};

export default SingupStep6Modal;
