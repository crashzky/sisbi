import { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css';
import '../styles/font.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<>
			<Head>
				<title>
					SISBI — новый сервис по поиску работы
				</title>
				<link rel='icon' href='/favicon.ico' type='image/x-icon' />
				<meta
					name='description'
					content='Создайте резюме в пару шагов, общайтесь с работодателями через наш встроенный мессенджер!' />
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://sisbi.ru/' />
				<meta property='og:title' content='SkillActive - поиск секций и кружков для ребёнка' />
				<meta
					property='og:description'
					content='Создайте резюме в пару шагов, общайтесь с работодателями через наш встроенный мессенджер!' />
				<meta
					property='og:image'
					content='/assets/og_image.svg' />
					
				<meta property='twitter:card' content='summary_large_image' />
				<meta property='twitter:url' content='https://sisbi.ru/' />
				<meta property='twitter:title' content='SISBI — новый сервис по поиску работы' />
				<meta
					property='twitter:description'
					content='Создайте резюме в пару шагов, общайтесь с работодателями через наш встроенный мессенджер!' />
				<meta
					property='twitter:image'
					content='/assets/og_image.svg' />
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
