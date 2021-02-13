const model = require('../models/rootModel')

exports.getChildren = (req, res) => {
    try {
        let toReturn = { "name": '', "children": [], "type": '' }
        const path = req.params.current.split(' ').filter(x => x)
        let children = [model]
        if (path[0].localeCompare('root') !== 0) throw 0

        for (let i = 0; i < path.length; i++) {
            const child = children.find(child =>
                path[i].localeCompare(child.name) === 0)
            if (typeof (child) === 'undefined') throw 0
            children = child.children

            if (i == path.length - 1) {
                toReturn.name = child.name
                toReturn.type = child.type
                if (child.type.localeCompare('dir') === 0) {
                    child.children.map(add => {
                        let toAdd = { "name": add.name, "type": add.type }
                        toReturn.children.push(toAdd)
                    })
                }
            }
        }
        if (toReturn.name.localeCompare('') === 0) {
            throw 0
        } else {
            return res.json(toReturn)
        }

        /*for(let i = 0; i < model.length; i++){
            if(model[i].name.localeCompare(req.params.current) == 0){
                if(model[i].type.localeCompare('dir') == 0){
                    let nextDir = []
                    let children = model[i].children
                    for(let j = 0; j < children.length; j++){
                        let toAdd = {"name": children[j].name, "type": children[j].type}
                        nextDir.push(toAdd)
                    }
                    toReturn.name = model[i].name
                    toReturn.children = nextDir
                    toReturn.type = model[i].type
                    return res.json(toReturn)
                }else{
                    toReturn.name = model[i].name
                    toReturn.type = model[i].type
                    return res.json(toReturn)
                }
            }
        }
        throw 0*/
    } catch (err) {
        if (err == 0) {
            res.status(400).json({ message: 'Bad Request' })
        } else {
            res.status(500).json({ message: err.message })
        }
    }
}

