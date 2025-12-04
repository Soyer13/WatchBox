const mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const conn = mysql.createConnection({
  host: "localhost",
  database: "watchbox",
  user: "root",
  password: ""
})
conn.connect(error => {
  if (error) {
    throw error;
  } else {
    console.log('Połączono z bazą danych');
  }
});
app.post('/login', (req, res) => {
  conn.query("SELECT user.id,user.UserName , user.Password FROM user WHERE user.UserName =? AND user.Password = ?", [req.body.login, req.body.password], (err, result) => {
    if (err) res.json({ error: err });
    else {
      if (result.length > 0) {
        res.json({ Id: result[0].id, success: true, user: result[0] });
      } else {
        res.json({ success: false });
      }
    }
  })
})

app.post('/signup', (req, res) => {
  conn.query("INSERT INTO user ( Name, Surname, Username, Password, IsAdmin) VALUES ( ?, ?, ?, ?, 0);", [req.body.Name, req.body.SurName, req.body.Login, req.body.Password], (err, result) => {
    if (err) res.json({ error: err });
    else {
      if (err == null) {
        res.json({ Id: result.insertId, success: true, user: result[0] });
      } else {
        res.json({ success: false });
      }
    }
  })
})

app.get("/chkLogin/:id", (req, res) => {
  conn.query("SELECT user.Username FROM user WHERE user.Username = ?", [req.params.id], (err, result) => {
    if (err) res.json({ error: err });
    else {
      if (result.length > 0) {
        res.json({ success: true, user: result[0] });
      } else {
        res.json({ success: false });
      }
    }
  })
})

app.get("/UserMovieList/:id", (req, res) => {
  conn.query("SELECT movies.id, movies.Title, movies.Description, movies.Img, genre.Name FROM movieslist JOIN movies ON movieslist.MovieId = movies.id JOIN genre ON movies.GenreID = genre.id WHERE movieslist.UserId = ?", [req.params.id], (err, result) => {
    if (err) res.json({ error: err });
    else {
      if (result.length > 0) {
        res.json({ success: true, user: result });
      } else {
        res.json({ success: false });
      }
    }
  })
})

app.get("/MovieList/:id", (req, res) => {
  conn.query("SELECT movies.id, movies.Title, movies.Description, movies.Img, genre.Name FROM movies LEFT JOIN movieslist ON movies.id = movieslist.MovieId  AND movieslist.UserId = ? JOIN genre ON movies.GenreID = genre.id WHERE movies.Accepted = 1  AND movieslist.MovieId IS NULL;", [req.params.id], (err, result) => {
    if (err) res.json({ error: err });
    else {
      if (result.length > 0) {
        res.json({ success: true, user: result });
      } else {
        res.json({ success: false });
      }
    }
  })
})

app.delete("/DeleteFromUserMovieList", (req, res) => {
  const { UserId, MovieId } = req.body
  conn.query("DELETE FROM movieslist WHERE movieslist.UserId = ? AND movieslist.MovieId = ?", [UserId, MovieId], (err, result) => {
    if (err) res.json({ error: err });
    else {
      if (err == null) {
        res.json({ success: true, user: result[0] });
      } else {
        res.json({ success: false });
      }
    }
  })
})
//INSERT INTO movieslist (Id, UserId, MovieId, Status, AddDate) VALUES (NULL, '11', '1', '0', '2025-12-04');

app.post("/AddFromUserMovieList",(req,res) => {
  const { UserId, MovieId } = req.body
  const date = new Date();
  console.log(UserId, MovieId )
  conn.query("INSERT INTO movieslist ( UserId, MovieId, Status, AddDate) VALUES ( ?, ?, 0, ?);",[UserId,MovieId,date],(err,result) => {
    console.log()
    if (err) res.json({ error: err });
    else {
      if (err == null) {
        res.json({ success: true, user: result[0] });
      } else {
        res.json({ success: false });
      }
    }
  })
})

app.listen(8000, () => {
  console.log("Serwer działa na porcie 8000");
});