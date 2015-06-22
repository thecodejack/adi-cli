#!/usr/bin/env iojs

'use strict';
var meow = require('meow');
var pkg = require('./package.json');
var chalk = require('chalk');
var inquirer = require("inquirer");
var unirest = require('unirest');

var cli = meow({
    help: false,
    pkg: pkg
});

var opts = cli.flags; //flags
var args = cli.input; //commands
var cmd = args[0]; //first command after adi
console.log(''); //new line
if (cmd == 'hello') {
    console.log(chalk.red('Hi There'));
} else if (cmd == 'askme') {
    console.log(chalk.red('Hi There. This is Adi.'));
    var questions = [{
        type: "input",
        name: "name",
        message: "What's your name?",
        validate: function(input) {
            return !!input;
        }
    }, {
        type: "confirm",
        name: "jsboolean",
        message: "Do you know Javascript?"
    }];

    inquirer.prompt(questions, function(answers) {
        console.log(JSON.stringify(answers, null, "  "));
    });
} else if (cmd == 'climate') {
    unirest.get("https://simple-weather.p.mashape.com/weatherdata?lat=17.483473%C2%B0N&lng=78.317731%C2%B0E")
        .header("X-Mashape-Key", "RMsnGCqBHVmshXsxvelFnbQaASqap1S21x0jsnbKmYuFVnje0S") //I know about this key. No Worries
        .header("Accept", "application/json")
        .end(function(result) {
            if (result.status == 200) {
                var report = JSON.parse(result.body).query.results.channel;
                var lastBuild = report.lastBuildDate;
                var title = report.item.title;
                var forecasts = report.item.forecast;
                console.log(chalk.styles.bold.open + chalk.yellow(title) + chalk.styles.bold.close);

                forecasts.forEach(function(item) {
                    console.log(chalk.styles.bold.open + chalk.cyan(item.date + '/' + item.day + ': ') + chalk.styles.bold.close +
                        chalk.magenta(item.text));
                });
            } else {
                console.log(chalk.red('!!!Error Loading data'));
            }
        });
} else {
	cmd = args.join(' ');
    unirest.get("http://api.duckduckgo.com/?q='" + cmd + "'&format=json")
        .end(function(result) {
        	var body = JSON.parse(result.body);
        	if (result.status == 200) {
        		if (body.Abstract !== '') {
        			console.log(chalk.magenta(body.Abstract));
		        	console.log('More Details at ' + chalk.blue(body.AbstractURL));
		        	console.log('Source: ' + chalk.magenta(body.AbstractSource));
		        	console.log('');
        		} else {
        			console.log(chalk.red('Multiple or No Results'));
        			console.log('Related Data:');
        			console.log('');
        			body.RelatedTopics.forEach(function(item){
        				if(!item.Topics || !item.Topics.length) {
        					console.log(chalk.magenta(item.Text));
        					console.log('More Details at ' + chalk.blue(item.FirstURL));
		        			console.log('-----');
        				}
        			});
        			console.log('');
        		}
        	} else {
        		console.log(chalk.red('!!!Error Loading data'));
        	}
        });
}
