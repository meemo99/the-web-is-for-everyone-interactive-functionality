# Interactive Functionality

Ontwerp en maak voor een opdrachtgever een interactieve toepassing die voor iedereen toegankelijk is

De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/the-web-is-for-everyone-interactive-functionality/blob/main/docs/INSTRUCTIONS.md)


## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual of video toe 📸 -->
<!-- Voeg een link toe naar GitHub Pages 🌐-->
Dit is de Readme voor de opdrachtgever Buurtcampuskrant. Er is een homepagina gemaakt, een wijkpagina en een artikelpagina.

#### Homepagina
<img width="1432" height="835" alt="image" src="https://github.com/user-attachments/assets/bf667372-5bb2-418a-8b45-28f417b25eda" />

#### Wijkpagina
###### Oost
<img width="1432" height="830" alt="image" src="https://github.com/user-attachments/assets/f7f815a5-cf14-46c4-a531-145cff79a660" />

###### Nieuw-west

<img width="1432" height="830" alt="Scherm­afbeelding 2026-04-05 om 18 34 37" src="https://github.com/user-attachments/assets/fe3ebc47-50a7-45d6-8f49-cf65c03c1c5e" />

###### Zuidoost

<img width="1432" height="830" alt="Scherm­afbeelding 2026-04-05 om 18 34 51" src="https://github.com/user-attachments/assets/66038e6d-3db0-4a9d-87ae-b00fec6d707b" />


## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
Bij elk artikel kan er een reactie geplaatst worden om zo meer interactie met de lezer van de Buurtcampuskrant te creëren. Om een reactie te kunnen plaatsen moeten twee velden ingevuld worden; eentje met je naam en de ander wat je wilt zeggen. als er niks of 1 veld ingevoerd wordt krijgt de gebruiker een error melding te zien.
<img width="678" height="303" alt="Scherm­afbeelding 2026-04-05 om 19 06 06" src="https://github.com/user-attachments/assets/ce15983f-be0a-4006-8908-0d96da06d7ed" />

Bij een succesvolle post krijgt de gebruiker een succes melding te zien en staat hun reactie onder het kopje "Reacties"
<img width="790" height="450" alt="Scherm­afbeelding 2026-04-05 om 19 08 35" src="https://github.com/user-attachments/assets/b226f0c4-d50d-494c-b211-8d46ffc7ba12" />



## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framework of library gebruikt? -->

#### Styling

Bij het ontwerpen is er gehouden aan de huisstijl van de Buurtcampuskrant, met name bij de wijken(elke wijk heeft zijn eigen kleur)
<img width="261" height="481" alt="image" src="https://github.com/user-attachments/assets/8d3a3547-f1d8-4cdc-929b-c816b0313db9" />

De font die gebruikt wordt is de eigen <a href ="https://github.com/meemo99/the-web-is-for-everyone-interactive-functionality/edit/main/README.md#homepagina">Buurtcampus Arial</a> (voor koppen en subkoppen) en Arial voor de rest van de website.

#### Technieken
Ipv dat ik voor elk district een liquidpagina heb gemaakt, heb ik 1 main template gemaakt die ik in nodejs heb aangeroepen per district. Eerst met een variable voor alle districten
<pre><code>const districts = ["oost", "nieuw-west", "zuidoost", "algemeen"];</code></pre>

en daarna een get-route die filtert op district_name. 
<pre><code>app.get('/district/:district_name', async function (req, res) {
  const district = req.params.district_name
  const districtDetailResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?filter[district][_eq]=' + district
  )
  const districtDetailResponseJSON = await districtDetailResponse.json()
  res.render('district.liquid', { district: districtDetailResponseJSON.data, districtName: district })</code></pre>

Via CSS heb ik de districtkleuren gekoppeld aan de article door in de class name met curlybrackets de districts aan te roepen 
<pre><code>    article class="index-article district-{{ story.district }}"</code></pre>
en in CSS de kleur te koppelen per district.
<pre><code>.district-oost {
    background-color: var(--oost-primary);
}

.district-nieuw-west {
    background-color: var(--nieuw-west-primary);
}

.district-zuidoost {
    background-color: var(--zuidoost-primary);</code></pre>

## Installatie
<!-- Bij Installatie staat hoe een andere developer aan jouw repo kan werken -->
Download <a href="https://nodejs.org/en/download">NodeJs</a>. Fork en clone daarna deze repo.
Open dit vervolgens in je codespace(ik gebruik Visual Studio Code).
Open daarna de Terminal met`` ^` `` `(control + `) en voer  `npm install`  uit.
Voer als laatste ` npm install `  uit. De site staat nu via localhost live, klik op de localhost link om het openen in je browser.
Om de server weer uit te zetten voer je `control c`  uit in je Terminal.


## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
