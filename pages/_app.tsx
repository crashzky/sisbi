import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AOS from 'aos';

import 'aos/dist/aos.css';

import '../styles/globals.css';
import '../styles/font.css';
import '../styles/radio.css';
import '../styles/checkbox.css';
import '../styles/number.css';
import '../styles/burger-menu.css';
import '../styles/switch.css';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Head>
				<title>
					SISBI —  сервис по поиску работы и персонала
				</title>
				<link rel='icon' href='/favicon.ico' type='image/x-icon' />
				<meta
					name='description'
					content='Создайте резюме в пару шагов, общайтесь с работодателями через наш встроенный мессенджер!' />
				<meta
					name='keywords'
					content='работа, вакансии, работа, поиск вакансий, резюме, работы, работу, работ, ищу работу, поиск' />
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://sisbi.ru/' />
				<meta property='og:title' content='SISBI —  сервис по поиску работы и персонала' />
				<meta
					property='og:description'
					content='Создайте резюме в пару шагов, общайтесь с работодателями через наш встроенный мессенджер!' />
				<meta
					property='og:image'
					content='/assets/og_image.svg' />
					
				<meta property='twitter:card' content='summary_large_image' />
				<meta property='twitter:url' content='https://sisbi.ru/' />
				<meta property='twitter:title' content='SISBI —  сервис по поиску работы и персонала' />
				<meta
					property='twitter:description'
					content='Создайте резюме в пару шагов, общайтесь с работодателями через наш встроенный мессенджер!' />
				<meta
					property='twitter:image'
					content='/assets/og_image.svg' />
			</Head>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
};

export default MyApp;
