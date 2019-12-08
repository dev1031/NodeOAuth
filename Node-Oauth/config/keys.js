//this is to store all the secreate keys in our google id and keys 
// add this to git ignore
module.exports ={
    google :{
    clientID: '751098838687-l1am6e6frjfbua7c0b5elhj9rgdsspp4.apps.googleusercontent.com',
    clientSecret: 'CfBdPeLtOrBchoLU0Ad5n0Nh',
    },
    mongodb: {
      dbURI :'mongodb://o-auth-test:dev101@ds039437.mlab.com:39437/o-auth'
      //this uri is releted to the MLAB
    },
    session:{
      cookieKey:'theO-auth-projectKey2019'
    }
}

