// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// fetch naar buurtcampus directus


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')


console.log('Let op: Er zijn nog geen routes. Voeg hier dus eerst jouw GET en POST routes toe.')


// district fields

const districts = ["oost", "nieuw-west", "zuidoost", "algemeen"];

app.use((req, res, next) => {
  res.locals.districts = districts;
  next();
})

// index GET route
app.get('/', async function (req, res) {
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?sort=-date&limit=4&filter[date][_nnull]=true')
  const apiResponseJSON = await apiResponse.json()

  res.render('index.liquid', { stories: apiResponseJSON.data })
})

// districts GET route
app.get('/district/:district_name', async function (req, res) {

  const district = req.params.district_name
  const districtDetailResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?filter[district][_eq]=' + district
  )

  const districtDetailResponseJSON = await districtDetailResponse.json()
  res.render('district.liquid', { district: districtDetailResponseJSON.data, districtName: district })
})

// articles GET route
app.get('/story/:slug', async function (req, res) {
  const slug = req.params.slug

  const storyResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?filter[slug][_eq]=' + slug)
  const storyJSON = await storyResponse.json()
  const story = storyJSON.data[0]


  const commentsResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories_comments?filter[story][_eq]=' + story.id)
  const commentsJSON = await commentsResponse.json()


  res.render('story.liquid', {
    story: story,
    comments: commentsJSON.data
  })

})

/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  const fetchResponse = await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  // Als de POST niet gelukt is, kun je de response loggen. Sowieso een goede debugging strategie.
  // console.log(fetchResponse)

  // Eventueel kun je de JSON van die response nog debuggen
  // const fetchResponseJSON = await fetchResponse.json()
  // console.log(fetchResponseJSON)

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/

app.post('/story/:slug', async function (req, res) {

  const slug = req.params.slug


  if (req.body.comment_id) {
    // DELETE a comment
    await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories_comments/' + req.body.comment_id, {
      method: 'DELETE'
    })
    res.redirect(303, '/story/' + slug)

  } else {
    // POST a new comment
    const postResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories_comments', {
      method: 'POST',
      body: JSON.stringify({
        name: req.body.name,
        comment: req.body.comment,
        story: req.body.story_id
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })

    const postJSON = await postResponse.json()
    res.redirect(303, '/story/' + slug + '#comment-' + postJSON.data.id)
  }
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})
