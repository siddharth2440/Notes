const homePage = (req,res) =>{
    res.render('index');
}

const about = (req,res)=>{
    res.render('about');
}

const features = (req,res)=>{
    res.render('features');
}
const faqs = (req,res)=>{
    res.render('faqs');
}

module.exports = {
    homePage,
    about,
    features,
    faqs
}