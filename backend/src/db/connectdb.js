const mongoose = require('mongoose')

// * This is the mongodb Atlas connection link

const dbConnect = 'mongodb+srv://taskeen_haider:sjdh72465RESREW1g@cluster0.yq6p685.mongodb.net/?retryWrites=true&w=majority';

// * Theses are the parameters

const connectionParams = {useNewUrlParser: true, useUnifiedTopology: true,};    

// * This is the mongodb Atlas connection

mongoose.connect(dbConnect, connectionParams).then(() => {
    
    console.log('Hurrah! MongoDB connection successfully established :)');
    
    }).catch((err) => {
    
        console.log('Sorry Bro! MongoDB is not connected :(', err);
    
    })