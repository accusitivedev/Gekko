#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

import fs from 'fs';
import path, { dirname } from 'path'
import { fileURLToPath } from "url";
import { createSpinner } from "nanospinner";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url))
const TEMPLATES = fs.readdirSync(`${__dirname}/lib`);
const SETUP = [
    {
        name: 'po0t787',
        message: 'Project name?',
        default: 'gekko-project',
        type: 'input',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return console.log(chalk.bgRedBright('\n\nnaming restrictions:\n') + chalk.red('*' + chalk.gray(' name can only contain URL-friendly characters')) + '\n');
        },
    }, {
        name: 'po0t789',
        message: 'Select a framework!',
        type: 'list',
        choices: TEMPLATES
    }
]

console.clear()
inquirer.prompt(SETUP)
    .then(async answers => {

        const projectName = answers['po0t787'];
        const projectChoice = answers['po0t789'];
        const templatePath = `${__dirname}/lib/${projectChoice}`;
        
        async function Loading() {
            console.clear()
            const spinner = createSpinner(chalk.bgRed('|' + chalk.bgRedBright.bold(' Gekko ') + '|') + ' Creating ' + chalk.bold(`${projectName}`) + ' ...').start();
        }

        console.clear()
        Loading()
        await sleep()
        console.clear()

        fs.mkdirSync(`${CURR_DIR}/${projectName}`);
        createDirectoryContents(templatePath, projectName);

        console.clear()
        console.log(chalk.blueBright('⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯'))
        console.log(chalk.blueBright.bold('\n  Success! ') + chalk.white(`Created ${chalk.bgGrey.blueBright(' ' + projectName + ' ')}`) + chalk.gray('!\n'))
        console.log(chalk.white("  Now, let's access our project!") + chalk.white('\n  1. ' + chalk.white(`cd ${chalk.blueBright.bold(projectName)}`)))
        console.log(`\n\n ${chalk.blackBright('       Accusitive © 2023')}`)
        console.log(`${chalk.blackBright(`     v1.0.5 | ${chalk.bgGrey.blueBright(' Build67b09c7 ')}`)}`)
        console.log(chalk.blueBright('⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯'))
        process.exit()
    });

function createDirectoryContents(templatePath, newProjectPath) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');

            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
            createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
    });
}