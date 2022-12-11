// require express
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')

// require restaurantList data
const restaurantList = require('./restaurant.json')

//setting express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static file(css,js)
app.use(express.static('public'))

//route setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// setting search route（compare to restaurant name＆category)
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((restaurant) => {
    return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    )
  })

  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// setting dynamic route for showing restaurant details
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find((restaurant) => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant: restaurant })
})


//start & listen to the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})