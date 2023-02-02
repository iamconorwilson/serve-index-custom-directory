const path = require('path');

// FORMAT BYTES TO READABLE SIZE
function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}


// FORMAT TIME TO READABLE TIME
function formatTime(time) {

    const timeFormats = [
        [60, "seconds", 1], // 60
        [120, "1 minute ago", "1 minute from now"], // 60*2
        [3600, "minutes", 60], // 60*60, 60
        [7200, "1 hour ago", "1 hour from now"], // 60*60*2
        [86400, "hours", 3600], // 60*60*24, 60*60
        [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
        [604800, "days", 86400], // 60*60*24*7, 60*60*24
        [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
        [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
        [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
        [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
        [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    let seconds = (+new Date() - time) / 1000;
    let token = "ago";
    let listChoice = 1;

    if (seconds == 0) {
        return "Just now";
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = "from now";
        listChoice = 2;
    }
    let i = 0;
    let format;
    while ((format = timeFormats[i++]))
        if (seconds < format[0]) {
            if (typeof format[2] == "string") return format[listChoice];
            else
                return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
        }
    return time;
}

// MAKE LIST OF FILES
function makeList(dir, fileList) {
    let list = '<ul id="files">';

    list += `<li class='header'><span class='name'>Name</span><span class='size'>Size</span><span class='date'>Modified</span></li>`;

    for (const file in fileList) {
        const fileData = fileList[file];

        const isDir = fileData.stat.isDirectory();

        const filePath = dir.split('/').map(function (c) { return encodeURIComponent(c); });
        const size = (!isDir) ? formatBytes(fileData.stat.size) : '';
        const date = (fileData.name != '..') ? formatTime(fileData.stat.mtimeMs) : '';
        //format original date to local string
        const origDate = fileData.stat.mtime.toLocaleString();

        let classes = [];

        classes.push('icon');

        classes.push((isDir) ? 'icon-directory' : getIconClass(fileData.name));



        list += `<li>
        <a href='${path.join(filePath.join('/'), fileData.name)}' class='${classes.join(' ')}'>
            <span class='name' data-name='${fileData.name}'>${fileData.name}</span>
            <span class='size' data-size='${fileData.stat.size}'>${size}</span>
            <span class='date' data-date='${origDate}'>${date}</span>
        </a>
    </li>`;
    }
    list += '</ul>';
    return list;
}

// GET ICON CLASS
function getIconClass(filename) {
    const ext = path.extname(filename);

    if (ext === '') return 'icon-default';

    //if file is image
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif' || ext === '.svg') return 'icon-image';

    //if file is video
    if (ext === '.mp4' || ext === '.webm' || ext === '.ogg') return 'icon-video';

    //if file is audio
    if (ext === '.mp3' || ext === '.wav' || ext === '.ogg') return 'icon-audio';

    //remove the dot
    if (ext[0] === '.') return `icon-${ext.slice(1)}`;

    return `icon-${ext}`;

}

function makeBreadcrumbs(dir) {
    let parts = dir.split('/');
    let crumb = new Array(parts.length);

    for (const i in parts) {
        let part = parts[i];

        if (part) {
            parts[i] = encodeURIComponent(part);
            crumb[i] = `<a href="${parts.slice(0, i + 1).join('/')}">${part}</a>`;
        }
    }

    return crumb.join(` <span class='slsh'>/</span> `);
}

module.exports = {
    makeList,
    makeBreadcrumbs
}