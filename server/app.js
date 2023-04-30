const express = require('express');
var cors = require('cors');
const fs = require('fs');
const uuid = require("uuid");
var bodyParser = require('body-parser');
const { error } = require('console');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
const port = 4200;

let dataFromFile = fs.readFileSync('ads.json');
const ads = JSON.parse(dataFromFile);

let dataFromFileUsers = fs.readFileSync('users.json');
const users = JSON.parse(dataFromFileUsers);

let dataFromFileRents = fs.readFileSync('rents.json');
const rents = JSON.parse(dataFromFileRents);

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
    const userAds = ads.filter((ad) => {return ad.userId === user.id});
    user.ads = userAds;
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
app.get('/rents/:userId', (req, res) => {
  const userRents = rents.filter((rent) => {
    if (rent.userId === req.params.userId){
      return true;
    }
  });
  userRents.forEach(userRent => {
    userRent.adInfo = ads.find((ad) => {
      if (userRent.adId === ad.id){
        return true;
      }
    })
  });
  res.json({
    rents: userRents
  });
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
    req.body.id = uuid.v1();
    ads.push(req.body);
    oldAds.push(req.body);
    const dataForFile = JSON.stringify(oldAds, null, 4);

    function callback(){
        res.json({});
    }

    fs.writeFile('ads.json', dataForFile, 'utf8', callback)
    
});
app.post('/ad/:adId', (req, res) => {
  const removedIndex = ads.findIndex((ad) => {
    return ad.id === req.params.adId;
  }); 
  if (removedIndex > -1){
    ads.splice(removedIndex, 1);
    const dataForFile = JSON.stringify(ads, null, 4);

      function callback(){
        const userAds = ads.filter((ad) => {return ad.userId === req.body.user});
        res.json(userAds);
      }

      fs.writeFile('ads.json', dataForFile, 'utf8', callback);
  } else {
    const userAds = ads.filter((ad) => {return ad.userId === req.body.user});
    res.json(userAds);
  }
});
app.post('/rent', (req, res) => {
  const time = new Date();
  const userId = req.body.user;
  const adId = req.body.adId;

  const currentUser = users.find((user) => {
    if (userId === user.id){
      return true;
    }
  });
  const currentAd = ads.find((ad) => {
    if (adId === ad.id){
      return true;
    }
  });
  const newRent = {
    timeStart: time,
    userId: userId,
    adId: adId,
    id: uuid.v1(),
    active: true
  };
  const rentExist = rents.find((rent) => {
    if (rent.adId === adId){
      return true;
    }
  })
  if (rentExist){
    res.json({error: "Аренда уже существует."});
    return;
  }
  rents.push(newRent);
  const dataForFile = JSON.stringify(rents, null, 4);
  
  function callback(){
    res.json({});
  }

  fs.writeFile('rents.json', dataForFile, 'utf-8', callback);
});
app.post('/rent/update/:rentId', (req, res) => {
  const updatedRent = rents.find((rent) => {
    if (req.params.rentId === rent.id){
      return true;
    }
  });
  const endRentTime = new Date();
  updatedRent.timeEnd = endRentTime;
  const data = JSON.stringify(rents, null, 4);

  function callback(){
    res.json({rents})
  }

  fs.writeFile('rents.json', data, 'utf-8', callback);
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