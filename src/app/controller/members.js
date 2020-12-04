const Member = require('../model/Member')
const { active, date } = require('./utils')


module.exports = {
    index(req, res){
        Member.all(function(members) {
            return res.render("members/index", {members})
        })
    },
    create(req, res){
        return res.render('members/create')
    },
    post(req, res){
        
        const keys = Object.keys(req.body)
        
        for(key of keys) {
            if (req.body[key] == ""){
                return res.send('Eiiiii! Não foi preenchido todos os campos')
            }
        }

        Member.create(req.body, function(members) {
            return res.redirect(`/members/${members.id}`)
        })

        
    },
    show(req, res){
        Member.find(req.params.id, function(member) {
            if(!member) return res.send("Ei, membro not found OK?")
        
            member.created_at = date(member.created_at).format
        
            return res.render("members/show", { member })
        })
    },
    edit(req, res){

        Member.find(req.params.id, function(member) {
            if(!member) return res.send("Ei, membro not found OK?")
            
            member.vencimento = date(member.created_at).iso
            
            return res.render("members/edit", { member })
        })

    },
    put(req, res){
        const keys = Object.keys(req.body)
        for(key of keys) {
            if (req.body[key] == ""){
                return res.send('Eiiiii! Não foi preenchido todos os campos')
            }
        }

        Member.update(req.body, function() {
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req, res){
        Member.delete(req.body.id, function() {
            return res.redirect(`/members`)
        })

    }
}

