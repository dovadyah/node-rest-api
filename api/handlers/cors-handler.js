module.exports = (req, res, next) =>{
    //allow resource access from all origins. 
    res.header('Access-Control-Allow-Origin', '*');
    
    //Allow certain headers, use * to allow all headers
    res.header(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Acept, Authorization'
    );
    
    //method sent by browser before POST or PUT to see it it can make the request
    if(req.method === 'OPTIONS') {
      //Set which HTTP methods will be allowed.    
      res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET'); 
      return res.status(200).json({});
    }

    next();
}