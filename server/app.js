const express = require('express');
var cors = require('cors');
const fs = require('fs');
const uuid = require("uuid");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
const port = 4200;

let dataFromFile = fs.readFileSync('ads.json');
const ads = JSON.parse(dataFromFile);

let dataFromFileUsers = fs.readFileSync('users.json');
const users = JSON.parse(dataFromFileUsers);

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
app.use(cors(corsOpts));
app.use(urlencodedParser);
app.use(bodyParser.json());

app.get('/ad/:adId', (req, res) => {
  res.json(ads[req.params.adId]);
});

app.get('/', (req, res) => {
  if (req.query.getAll === "true") {
    res.json({
      ads: ads,
      total: ads.length
    });
  }
    let partOfAds = ads.slice((req.query.page - 1) * req.query.pageSize, req.query.page * req.query.pageSize);

    res.json({
        ads: partOfAds,
        total: ads.length
    });
})

app.get('/user/:userId', (req, res) => {
  const user = users.find((user) => {
    if (user.id === req.params.userId){
      return true;
    }
    return false;
  })
  if (user){
    res.json(user)
  }
})
app.post('/user/:userId', (req, res) => {
  const user = users.find((user) => {
    if (user.id === req.params.userId){
      return true;
    }
    return false;
  })
  user.login = req.body.login;
  user.phoneNumber = req.body.phoneNumber;
  
  const dataForFile = JSON.stringify(users, null, 4);

  function callback(){
    res.json({});
  }

  fs.writeFile('users.json', dataForFile, 'utf8', callback)
})

app.get('/login', (req, res) => {
  let dataFromFile = fs.readFileSync("users.json")
  const users = JSON.parse(dataFromFile)
  const user = users.find((user) => {
    if (user.login === req.query.login && user.password === req.query.password){
      return true;
    }
    return false;
  })
  if (user){
    res.json(user);
  } else if (req.query.login.length === 0){
    res.json({
      error: "Введите логин"
    })
  } else if (req.query.password.length === 0){
    res.json({
      error: "Введите пароль"
    })
  } else {
    res.json({
      error: "Пользователь с такими данными не существует"
    })
  }
})

// app.post('/change', (req, res) => {
//   if (oldUsers.find((elem) => {
//     if (elem.login === req.body.login){
//       return true;
//     }
//     return false;
//   })) {
//     res.json({
//       error: "Пользователь с таким логином уже существует"
//     })
//   } else {
//     let dataFromFile = fs.readFileSync('users.json');
//     const oldUsers = JSON.parse(dataFromFile); 
//     objInd = oldUsers.findIndex((obj => obj.id == 1))
//     console.log(objInd)
//   }
// })

app.post('/add', (req, res) => {
    let dataFromFile = fs.readFileSync('ads.json');
    const oldAds = JSON.parse(dataFromFile); 
    ads.push(req.body);
    oldAds.push(req.body);
    const dataForFile = JSON.stringify(oldAds, null, 4);

    function callback(){
        res.json({});
    }

    fs.writeFile('ads.json', dataForFile, 'utf8', callback)
    
});
app.post('/register', (req, res) => {
  if (req.body.password !== req.body.passwordConfirmation){
    res.json({
      error: "Пароли не совпадают"
    })
  } else if (req.body.password.length < 6){
    res.json({
      error: "Слишком короткий пароль"
    })
  } else {
    let dataFromFile = fs.readFileSync('users.json');
    const oldUsers = JSON.parse(dataFromFile); 
    if (oldUsers.find((elem) => {
      if (elem.login === req.body.login){
        return true;
      }
      return false;
    })) {
      res.json({
        error: "Пользователь с таким логином уже существует"
      })
    } else {
      users.push(req.body);
      oldUsers.push({
        id: uuid.v1(),
        login: req.body.login,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber
      });
      const dataForFile = JSON.stringify(oldUsers, null, 4);

      function callback(){
          res.json({});
      }

      fs.writeFile('users.json', dataForFile, 'utf8', callback)
  }
}
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})