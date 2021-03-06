const Chip = require('../model/Chip')
const { active, date } = require('./utils')



module.exports = {
    index(req, res){
        const { filter } = req.query

        if( filter ) {
            Chip.findBy(filter, function(chips){
                return res.render("chips/index", {chips, filter})
            })
        } else {
            Chip.all(function(chips) {
                console.log(chips.member_name)
                return res.render("chips/index", {chips})
            })
        }

    },
    create(req, res){
        Chip.membersSelectOptions(function(options) {
            return res.render('chips/create', {memberOptions: options})
        })
    },
    post(req, res){
        
        const keys = Object.keys(req.body)
        
        for(key of keys) {
            if (req.body[key] == ""){
                return res.send('Eiiiii! Não foi preenchido todos os campos')
            }
        }

        Chip.create(req.body, function(chips) {
            return res.redirect(`/chips/${chips.id}`)
        })

        
    },
    show(req, res){
        Chip.find(req.params.id, function(chip) {
            if(!chip) return res.send("Ei, membro not found OK?")
        
            chip.created_at = date(chip.created_at).format
            chip.active =  date(chip.active).format
        
            return res.render("chips/show", { chip })
        })
    },
    edit(req, res){

        Chip.find(req.params.id, function(chip) {
            if(!chip) return res.send("Ei, membro not found OK?")
            
            chip.vencimento = date(chip.created_at).iso
            
            Chip.membersSelectOptions(function(options) {
                return res.render('chips/edit', {chip, memberOptions: options})
            })
        })

    },
    put(req, res){
        const keys = Object.keys(req.body)
        for(key of keys) {
            if (req.body[key] == ""){
                return res.send('Eiiiii! Não foi preenchido todos os campos')
            }
        }

        Chip.update(req.body, function() {
            return res.redirect(`/chips/${req.body.id}`)
        })
    },
    delete(req, res){
        Chip.delete(req.body.id, function() {
            return res.redirect(`/chips`)
        })

    }
}

