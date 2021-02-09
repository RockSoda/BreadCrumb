const model = require('../models/rootModel')

exports.getChildren = (req, res) => {
    try{
        for(let i = 0; i < model.length; i++){
            if(model[i].name.localeCompare(req.params.current) == 0){
                if(model[i].type.localeCompare('dir') == 0){
                    let nextDir = []
                    let children = model[i].children
                    for(let j = 0; j < children.length; j++){
                        let toAdd = {"name": children[j].name, "type": children[j].type}
                        nextDir.push(toAdd)
                    }
                    return res.json(nextDir)
                }else{
                    return res.json([model[i]])
                }
            }
        }
        throw 0
    }catch(err){
        if(err == 0){
            res.status(400).json({ message: 'Bad Request' })
        }else{
            res.status(500).json({ message: err.message })
        }
    }
}
