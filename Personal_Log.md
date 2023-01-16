# Personal Log

# 01/15/2023

I've been keeping track of how I build my projects as a reminder of what I tried and how I fixed it. This file will keep track of the bugs that I remember so far from this project. These bugs where not found on the date that is written on the title of this section. I'm just re-writing them down and sort of doing a deep-dive on them so I can remember how I fixed and why that fix worked.

# Bug #001 - In trying to recreate it, I fixed it.

A few weeks back a fellow from my cohort had an idea of creating 95% of the html elements on the `main.js` file and then render/append them to the DOM. This worked fine for that specific project we worked on but I believe when we introduce Bootstrap to `this` project something breaks. I will try to recreate the bug and log the results.

```html
<!-- contents of the index.html file -->

<!-- code inside the body -->
<div class="container align-items-center">
  <div class="mainContainer">
    <div class="row text-center row001">
      <!-- inside here would be other divs that I would have created in the js file then rendered them back here -->
    </div>
  </div>
</div>
```

The goal of this project was to create a website that made a call to an API and render the results from said API call to the DOM. Because of the limited amount of calls I can make to the API I specifically choose for this project I will be using the [Rick and Morty API](https://rickandmortyapi.com/) to recreate the bug.

I wanted to display images on my page so both the API I chose for this project and the Rick & Morty API have images so there is no issue with that. Next I wanted to render those images inside a [Bootstrap Card](https://getbootstrap.com/docs/5.3/components/card/)

```js
// contents of the main.js file
const url = "https://rickandmortyapi.com/api/character/[1,2,3]";

const mainContainer = document.querySelector(".row001");

fetch(url)
  .then((characters) => characters.json())
  .then((characters) => {
    console.log(characters);
    landingPage(response);
  })
  .catch((error) => console.log(error));
```

Just for testing purposes I double check what I'm getting back from the API call. First I will check with [Postman](https://www.postman.com/). After I do that I will check the API with the browser.

## Checking API response with Postman

![Rick_&_Morty_API_Response_on_Postman](/assets/Rick_&_Morty_Response_001.png)

## Checking API response on the browser

![Rick_&_Morty_API_Response_on_Browser](/assets/Rick_&_Morty_Response_002.png)

---

## Creating the Bootstrap Cards in the `main.js` file

```js
function landingPage(characters) {
  characters.forEach((character) => {
    const { id, name, status, species, gender, image } = character;
    const card = document.createElement("div");
    card.classList.add("card", "col-md", "p-4", "bg-secondary", "mx-auto");
    card.style.width = "18rem";

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = image;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = name;

    // Line below may have been the culprit of bug #001
    card.append(img, cardBody, cardTitle);

    mainContainer.append(card);
  });
}
```

# It works!

It seems in my effort to recreate the bug I may have fixed it. Almost all the parameters and conditions are the same but different results were obtained. I will keep this in mind for future projects.

### Possible Solutions that may have fixed this particular bug.

- I noticed that in my original file where I found the bug, I had two cdn links for BootStraps's CSS. I removed one of them.
- It may be also that when trying to replicate this bug I forgot to append the contents made in the `main.js` file to the div that was already in the `index.html` file. So if I forgot to append them here. Then most likely I forgot to append them before. Hence causing the bug.

![Rick_&_Morty_Cards_on_the_DOM](/assets/Rick_&_Morty_Response_003.png)

# Bug #002 - `ForEach()` vs. `ForLoop()`

I'm a bit hesitant to go into this bug since the first bug sort of disproves it. But I will still write it down because it did allow me to learn a few things like the difference between `forEach()` and `forLoop()`.

The following will be a copy and paste from the previous `readme.md` file I created:

On the night of January 9th, 2023 around 10pm I started to have an idea of displaying cards on my front-end-porfolio project. Learning Bootstrap was sort of easy. I read some of the documentation provided on their site while also watching a YouTube video explaining how to use BootStrap Properly.

## Here is an example of their default card:

# Resources

[Testing an API with Postman](https://circleci.com/blog/testing-an-api-with-postman/)
