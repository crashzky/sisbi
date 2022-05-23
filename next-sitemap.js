/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: process.env.SITE_URL || 'https://sisbi.ru',
	generateRobotsTxt: true,
	// ...other options
};
