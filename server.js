const express=require('express');
const hbs=require('hbs');                                           /* templtaing engine renders html */
const fs=require('fs');
var app=express(); 


app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');


hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});


app.use((req,res,next)=>{

    var now=Date().toString();
     var log=`${now} : ${req.method} ${req.url}`;
     fs.appendFile('server.log',log + '\n',(error)=>{

        if (error)
        {
           console.log('unable to access');
        }
    	
     });
    next();
});


// app.use((req,res,next)=>{

// 	res.render('maintance.hbs');
// });

app.use(express.static(__dirname +'/public')); // middleware function

hbs.registerHelper('screamit',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{    // setup a handler for http request


  //res.send('<h1>Hello Express<h1>'); // sending response

  res.render('home.hbs',{
  	titlePage:'This is my Home Page',
  	
  	Msg:'Welcome to My Page'
  });


});



app.get('/about',(req,res)=>{

	// res.send({
	// 	name: 'Nabeel',
	// 	age:21
	// })

	 res.render('about.hbs',{

	 	titlePage:"About Page",
	 	Msg: "this is about page"
	 });
});

app.get('/bad',(req,res)=>{

     res.send({
     	errormessage:'Unable to find'
     })

   

});

app.listen(3000, ()=>{

	console.log('server is up on 3000');
});