#!/usr/bin/env node


const fs = require('fs');
const chalk = require('chalk')
const path = require('path')
// const { lstat } = fs.promises;

const target = process.argv[2] || process.cwd();

fs.readdir(target, async (err, files) => {
	if (err) {
		console.log(err)
	}

	const promises = files.map(file => {
		return lstat(path.join(target, file));
	})

	const allStats = await Promise.all(promises)

	for (let stat of allStats) {
		const index = allStats.indexOf(stat)

		if (stat.isFile()) {
			console.log(files[index]);
		} else {
			console.log(chalk.bold(files[index]))
		}


	}


	// console.log(files)
})



const lstat = file => {
	return new Promise((resolve, reject) => {
		fs.lstat(file, (err, stats) => {

			if (err) {
				reject(err)
			}

			resolve(stats)

		})
	})
}