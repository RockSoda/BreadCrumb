const mysupersecretfile = {"name": "mysupersecretfile", "type": "file"}
const mysupersecretproject = {"name": "mysupersecretproject", "children":[mysupersecretfile], "type": "dir"}
const projects = {"name": "projects", "children":[mysupersecretproject], "type": "dir"}
const filea = {"name": "filea.txt", "type": "file"}
const fileb = {"name": "fileb.txt","type": "file"}
const myname = {"name": "myname", "children":[filea, fileb, projects], "type": "dir"}
const home = {"name": "home", "children": [myname], "type": "dir"}
const root = {"name": "root", "children":[home], "type": "dir"}

const flatten = [root, home, myname, filea, fileb, projects, mysupersecretproject, mysupersecretfile]

module.exports = flatten