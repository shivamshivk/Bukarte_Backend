exports.getDefaultRoute = (req,res,next) =>{
    res.status(200).json({
        message:'Welcome to Bukarte Backend Api homepage.. :-)'
    });
}