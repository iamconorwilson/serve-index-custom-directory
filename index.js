const Mustache = require('mustache');
const fs = require('fs');

const { makeList, makeBreadcrumbs } = require('./functions.js');

const render = (locals, callback) => {

    const template = fs.readFileSync('./assets/index.mustache', 'utf8');

    const data = {
        directory: locals.directory,
        list: makeList(locals.directory, locals.fileList),
        linkedPath: makeBreadcrumbs(locals.directory),
        style: fs.readFileSync('./assets/css/main.css', 'utf8'),
        script: fs.readFileSync('./assets/script.js', 'utf8')
    };

    let string = Mustache.render(template, data);

    callback(null, string);
}


exports.render = render;
