const Mustache = require('mustache');
const path = require('path');
const fs = require('fs');

const { makeList, makeBreadcrumbs } = require(path.join(__dirname, './functions.js'));

const render = (locals, callback) => {

    const template = fs.readFileSync(path.join(__dirname, './assets/index.mustache'), 'utf8');

    const data = {
        directory: locals.directory,
        list: makeList(locals.directory, locals.fileList),
        linkedPath: makeBreadcrumbs(locals.directory),
        style: fs.readFileSync(path.join(__dirname, './assets/css/main.css'), 'utf8'),
        script: fs.readFileSync(path.join(__dirname, './assets/script.js'), 'utf8')
    };

    let string = Mustache.render(template, data);

    callback(null, string);
}


exports.render = render;
