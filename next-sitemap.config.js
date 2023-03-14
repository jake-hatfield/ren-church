// lib
import metadata from '@lib/metadata';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || metadata.siteUrl,
	generateRobotsTxt: true, // (optional)
	exclude: [],
	// ...other options
};
