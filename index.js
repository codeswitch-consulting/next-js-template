#!/usr/bin/env node
const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const handlebars = require('handlebars');

// Define the template files and their target paths
const templateFiles = [
  { src: 'templates/index.html', dest: 'output/index.html' },
  { src: 'templates/style.css', dest: 'output/style.css' },
];

// Register the 'create' command
program
  .command('create <name>')
  .description('Create a new project from template')
  .action(async (name) => {
    // Prompt for user inputs
    const { author } = await inquirer.prompt([
      {
        type: 'input',
        name: 'author',
        message: 'Enter author name:',
      },
    ]);

    // Create the target directory
    fs.mkdirSync(`./${name}`);

    // Copy and process template files
    templateFiles.forEach((file) => {
      const source = fs.readFileSync(file.src, 'utf-8');
      const template = handlebars.compile(source);
      const result = template({ name, author });
      fs.writeFileSync(`${name}/${file.dest}`, result);
    });

    console.log('Project created successfully!');
  });

// Parse the command-line arguments
program.parse(process.argv);
