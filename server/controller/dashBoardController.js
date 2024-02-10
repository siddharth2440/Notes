const notes = require('../models/NotesSchema')
const users = require('../models/User');
const nodemailer=require('nodemailer');
const mongoose = require('mongoose');

//sendAnMailToTheUserwhoPostANewNote
const sendMail = (email,name) =>{
    try {
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.Email,
                pass:process.env.MailAppPassword
            }
        }) 
        const options = {
            from:process.env.Email,
            to:email,
            subject:"Notes",
            text:`Thank you for using Notes ${name}`
        }
        transporter.createTransport(options,(error,info)=>{
            error?'Email is not send Succesfully':`Email Sent Successfully : ${info.response}`
        })
    } catch (error) {
        console.log("Error in sending the message"+error.messsage);
    }
}

const dashBoard = async (req,res)=>{
    const locals = {
        title:"DashBoard",
        description:"NodeJS Notes App"
    }
    const {id,firstName,lastName,profileImage} = req.user;
    const findNotes = await notes.aggregate([
        {$match: {user: new mongoose.Types.ObjectId(req.user.id)}},
        {$project: {title: true}},
        {$sort:{title:-1,_id:-1}}
    ]);

    const totalNotesWeHave = await notes.find({}).count();
    const totalUsers = await users.find({}).count();
    const countTotalNumberOfNotes = await notes.find({user:req.user.id}).countDocuments();
    // console.log("countTotalNumberOfNotes --- " +countTotalNumberOfNotes);

    const bookTitleWithUserName = await notes.aggregate([{$lookup:{from:'users',localField:'user',foreignField:'_id',as:'combine'}}]);
    // bookTitleWithUserName.forEach((el,idx)=>{
    //     console.log(el);
    // })
    const allNoteCreatedByTheUser = await notes.find({user:id}); 
    const user = await users.findOne({_id:req.user.id});
    res.render('dashBoard/index',{
        locals,
        firstName,
        id,
        lastName,
        findNotes,
        profileImage,
        bookTitleWithUserName,
        countTotalNumberOfNotes,
        layout:'../views/layouts/dashboard'
    })
}

const showPageForNewPost = (req,res)=>{ 
    // res.send('showPageForNewPost');
    res.render('dashboard/newNote');
}
const newPost = async (req,res)=>{
    const {title,body} = req.body;
    const {id,displayName} = req.user;
    console.log(req.user);
    const newNote = new notes({
        user:id,title,body
    })
    const saveNote = await newNote.save();
    // sendMail(email,given_name);
    saveNote?res.send('showPageForNewPost'):res.send('Not send');
}
const showUpdatePageToUpdate = async (req,res)=>{
    const noteId = req.params.id;
    // const noteId = await notes.findOne({_id:req.params.id});
    const note = await notes.findOne({_id:noteId});
    const noteByAggregation = await notes.aggregate([{$match:{_id:new mongoose.Types.ObjectId(noteId)}},{$sort:{_id:-1}},{$project:{title:true}}]);
    const notesAllInfo = await notes.aggregate([{$lookup:{from:"users",localField:"user",foreignField:"_id",as:"As"}}])

    //fetch data as a combination or union 
    const NoteByUser = await notes.aggregate([{$match:{_id: new mongoose.Types.ObjectId(noteId)}},{$project:{title:true,body:true,_id:true}}]);
    res.render('dashBoard/viewNote',{
        layout:'../views/layouts/dashboard',NoteByUser,note,noteByAggregation,notesAllInfo
    })
}
const updateThePost =async (req,res)=>{
    const id = req.params.id;
    console.log(id);
    const NoteId = await notes.find({_id:id});
    NoteId.forEach(element => {
        console.log(element);
    });

    //using aggregationpipeline
    const Note = await notes.aggregate([{$match:{_id:new mongoose.Types.ObjectId(id)}},{$project:{_id:false}}]);
    //updateTheNote
    const {body,title} = req.body;
    const updateNote = await notes.updateOne({_id:id},{$set:{title:title,body:body}});
    // const BookId = await notes.updateOne({_id:},{$set:{,}});
    updateNote?res.redirect('/dashboard'):res.send("UnableToUpdateTheNote");
}
const deleteThePost = async (req,res)=>{
    const id = req.params.id;
    console.log(id);
    const deleteNote = await notes.deleteOne({_id:id});
    deleteNote?res.redirect('/dashboard'):res.send("SomeThing went wrong...") 
}
module.exports ={
    dashBoard,showPageForNewPost,newPost,showUpdatePageToUpdate,updateThePost,deleteThePost
}