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

![Rick_&_Morty_API_Response_on_Postman](/assets/md_images/Rick_&_Morty_Response_001.png)

## Checking API response on the browser

![Rick_&_Morty_API_Response_on_Browser](/assets/md_images/Rick_&_Morty_Response_002.png)

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

![Rick_&_Morty_Cards_on_the_DOM](/assets/md_images/Rick_&_Morty_Response_003.png)

# Bug #002 - `ForEach()` vs. `ForLoop()`

I'm a bit hesitant to go into this bug since the first bug sort of disproves it. But I will still write it down because it did allow me to learn a few things like the difference between `forEach()` and `forLoop()`.

P.S. I will point out that this next bug happened with the `divs` already in the `index.html` file. I did not create them in the `main.js` file. So I may need to recreated it with the `divs` created in the `main.js` file. We shall see. Come along for the ride.

```html
<div class="col-md card p-4 bg-secondary mx-auto" style="width: 18rem">
  <img alt="" class="card-img-top" />
  <div class="card-body">
    <div class="bg-dark rounded p-1">
      <p class="card-title p0"></p>
    </div>
    <p class="card-text p1"></p>
    <p class="card-text p2"></p>
    <p class="card-text p3"></p>
    <a href="#" class="btn btn-dark">Go somewhere</a>
  </div>
</div>

<div class="col-md card p-4 bg-secondary mx-auto" style="width: 18rem">
  <img alt="" class="card-img-top" />
  <div class="card-body">
    <div class="bg-dark rounded p-1">
      <p class="card-title p0"></p>
    </div>
    <p class="card-text p1"></p>
    <p class="card-text p2"></p>
    <p class="card-text p3"></p>
    <a href="#" class="btn btn-dark">Go somewhere</a>
  </div>
</div>

<div class="col-md card p-4 bg-secondary mx-auto" style="width: 18rem">
  <img alt="" class="card-img-top" />
  <div class="card-body">
    <div class="bg-dark rounded p-1">
      <p class="card-title p0"></p>
    </div>
    <p class="card-text p1"></p>
    <p class="card-text p2"></p>
    <p class="card-text p3"></p>
    <a href="#" class="btn btn-dark">Go somewhere</a>
  </div>
</div>
```

The following will be a copy and paste from the previous `readme.md` file I created:

On the night of January 9th, 2023 around 10pm I started to have an idea of displaying cards on my front-end-porfolio project. Learning Bootstrap was sort of easy. I read some of the documentation provided on their site while also watching a YouTube video explaining how to use BootStrap properly.

## Here is an example of their default card:

![BootStrap Default Card](./assets/md_images/bootstrapDefaultCard.png)

# While trying to recreate the bug I fixed it.

Technically this was not a bug but a foolish mistake on my part. With the `html` code provided above I had this in my `main.js` file:

```js
// returns a NodeList of all the divs with the class of "card" in this case there are 3
const cards = document.querySelectorAll(".cards");

// since I know there are three results from the API call I will now use a forEach loop to iterate throught the cards.
cards.forEach((card, index) => {
  const { id, name, status, image, species } = characters[index];

  const imgTop = card.querySelector(".card-img-top");
  imgTop.src = image;
  imgTop.alt = name;

  // my first mistake was adding the following line of code
  // card.append(imgTop);

  const cardBody = card.querySelector(".card-body");

  // the line below and the line after do the same thing
  const cardTitle = card.querySelector(".card-title");
  // const cardTitle = cardBody.querySelector(".card-title");

  cardTitle.textContent = name;

  const p1 = card.querySelector(".p1");
  p1.textContent = `Status: ${status}`;

  const p2 = card.querySelector(".p2");
  p2.textContent = `Species: ${species}`;

  const p3 = card.querySelector(".p3");
  p3.textContent = `ID: ${id}`;

  // the lines below was in the original code which again is the culprit of the so called bug
  // cardBody.append(cardTitle, p1, p2, p3);
  // mainContainer.append(card);
});
```

I believed the culprit for the bug was the use of `forEach()` instead of a `forLoop()`. I was wrong. The culprit was the line of code that I commented out. I was appending elements back to the card when they were already there. All I was doing here in the `main.js` was updating their content. There was no need to appened them again which would result in something I thought was a bug.

## Here is what it looked like

![Bug #002](./assets/md_images/forEachLoopResult.png)

But after thinking about how to recreate the bug I found my mistake and fixed it. Here is what it looks like now:

```js
const cards = document.querySelectorAll(".cards");

cards.forEach((card, index) => {
  const { id, name, status, image, species } = characters[index];

  const imgTop = card.querySelector(".card-img-top");
  imgTop.src = image;
  imgTop.alt = name;

  const cardBody = card.querySelector(".card-body");
  const cardTitle = card.querySelector(".card-title");
  cardTitle.textContent = name;

  const p1 = card.querySelector(".p1");
  p1.textContent = `Status: ${status}`;

  const p2 = card.querySelector(".p2");
  p2.textContent = `Species: ${species}`;

  const p3 = card.querySelector(".p3");
  p3.textContent = `ID: ${id}`;
});
```

## Here is what it looks like. The CSS might be a lil off

![Rick&MortyBugFix](./assets/md_images/code_refactored.png)

## Another way to tackle this might be using a `forLoop()`

```js
const cards = document.querySelectorAll(".cards");

for (let i = 0; i < cards.length; i++) {
  const { id, name, status, image, species } = characters[i];

  const imgCard = cards[i].querySelector(".card-img-top");
  imgCard.src = image;
  imgCard.alt = name;

  const cardBody = cards[i].querySelector(".card-body");
  const cardTitle = cardBody.querySelector(".card-title");
  cardTitle.textContent = name;

  const p1 = cards[i].querySelector(".p1");
  p1.textContent = status;

  const p2 = cards[i].querySelector(".p2");
  p2.textContent = species;

  const p3 = cards[i].querySelector(".p3");
  p3.textContent = id;
}
```

# Difference between `forEach()` and `forLoop()`

So what is the difference between the 'forEach' loop and the 'forLoop'?
Well in class we have been instructed that the 'forEach' loop is a higher order function. It takes a callback function as an argument. The callback function is executed for each element in the array. The 'forLoop' is a lower order function. It is a simple loop that iterates over an array. Digging deeper I found out that the 'forEach' loop is a method that is called on an array like object aka in this case the NodeList.
Meanwhile the 'forLoop' is a statement that is used to loop through a block of code.

So if they do the same thing is there a difference? The next question I asked was..... which is faster?
The answer is that the 'forLoop' is faster than the 'forEach' loop. The reason for this is that the 'forEach' loop has to check if the array has been modified. The 'forLoop' does not have to check if the array has been modified. The 'forLoop' is also more flexible. It can be used to iterate over any iterable object. The 'forEach' loop can only be used to iterate over an array.

### forEach Loop

- Use to iterate through and array
- Slower
- Method of the Array prototype
- Not as flexible

### forLoop

- Use to iterate through a block of code
- Faster
- Statement in JavaScript
- Flexible

Writing this at 2am... literally to record my findings is very tiresome but I believe in the long run. It will pay off. We learn more from our failures than our achievements. I forgot who said that but it holds very true after I keep failing to write the correct code.

# 01/16/2023

Today I will add the functionality for the project I'm working on. As stated above I will be working with Bootstrap. I have already messed with writting css over the years and I believe I have a pretty good grasp on it. So Bootstrap will serve as a step up.

## Bootstrap

What is it? From their website and from many other resources like YouTube videos I've watched I can say that it is a very popular Framework that provides the user with pre-designed CSS and Javascript components. This helps developers like myself immensely and we can quickly create responsive, mobile-first websites. This allows me to focus primarily on the functionality rather than the design.

Some questions I had when I looked into Bootstrap years ago were:

## What is a Framework?

A framework is a set of pre-written code that provides a structure for building a specific type of application or service. In the case of Boostrap, it is a front-end framework. It provides a wide range of pre-designed components such as a navbar, cards, buttons, etc. Bootstrap also allows us to customize said components to our specific needs if we wish to do so.

Bootstrap is built using HTML, CSS, and Javascript, and it makes use of a responsive grid system. This means that the website will be responsive to the device it is being viewed on. This is called mobile-first design. To change the look and feel of certain components that we are using with Bootstrap. Bootstrap allows us to add classes to those components and they will style the typography, colors, and spacing of the component.

## What is mobile-first design?

When I first started my journey into web development circa 2012, I was told that we should first think about desinging our websites for the desktop browser first and then make it responsive for mobile. This is the opposite of what Bootstrap is doing. This means that the website will be designed for mobile first and then we will make it responsive for desktop. This is a very popular way of designing websites now.

So let's get on with it.

## Background info on my studies

When I started learning `html` I wanted to find out why we are using certain elements and what they are used for. I researched the elements and came across `html` semantics. I learned that we should use the correct element for the correct purpose. For example, we should use a `nav` element for navigation. This is because it is a semantic element. It tells the browser that this is a navigation element. This is important for accessibility and search engine optimization. This is also important for screen readers. Screen readers are used by people with visual impairments. They are used to read the content of a website to the user. This is important because it allows people with visual impairments to use the internet. This is also important for search engine optimization because search engines like Google use the `html` semantics to determine what the content of a website is about. I paid close attention to these details because at the same time I was learning `html` I was also reading [The Design of Everyday Things](https://en.wikipedia.org/wiki/The_Design_of_Everyday_Things) by [Donald Norman](https://en.wikipedia.org/wiki/Don_Norman). It is an amazing book and I highly recommend for people to read it. I remember bits and pieces of it but the chapter that stood out to me was how people pay close attention to the shape of a handle. It blew my mind obviously if I remember it like 10yrs later that there are people that pay alot of attention to the design of a door handle.

I believe that's what I'm doing here. Going into extreme detail of why I'm using certain things.

## The Navigation Section Element

In its essence it is an `html` element that is used to indicate that the content within the element is a section of navigation links. Using the `<nav>` element helps keep the `html` semantically correct by clearly indication the purpose of the content within the element.

In school they always referred to `html` as the structure, the foundation, the skeleton of our site. Until this day I still believe this. Different elements have different purposes. We should use the correct element for the correct purpose. This is the reason why I'm using the `<nav>` element for my navigation.

## `<nav>` and Bootstrap

There are many classes we can use with the `<nav>` element and make it look pretty let's go over some of them:

- `.navbar`: This is the main class that is used to create the navbar container.
- `.navbar-brand`: This class is used to style the text or image that is used as the logo or brand name within the navbar.
- `.navbar-nav`: This class is used to create the unordered list that holds the navigation links.
- `.nav-item`: This class is used to style each individual navigation list item within the navbar.
- `.nav-link`: This class is used to style the anchor tag that is used within each of the navigation list item.
- `.navbar-toggler`: This class is used to create and style a button that is used to toggle the navbar on mobile devices.
- `.navbar-collapse`: This class is used to create the container for the navigation list items/links that is hidden in smaller screens and is revealed when the navbar toggler button is clicked.
- `.navbar-text`: this class is used to style the text that is used within the navbar.
- `.navbar-expand`: This class is used to determine the breakpoint at which the navbar will collapse and the navbar toggler button will be revealed.

  - `.navbar-expand-lg`: This class is used to determine that the navbar will collapse at the large breakpoint. Which is at around 992px.

  ## My implementation

  ```html
  <nav class="navbar fixed-top navbar-expand-lg bg-dark navbar-dark py-4">
    <div class="container">
      <a href="index.html" class="navbar-brand text-light text-lg"><span>Home</span></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto text-center">
          <li class="nav-item">
            <a href="/planets/mars.html" class="nav-link">Mars</a>
          </li>
          <li class="nav-item">
            <a href="#earth" class="nav-link">Earth</a>
          </li>
          <li class="nav-item">
            <a href="#jupiter" class="nav-link">Jupiter</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  ```

# `sticky-top` vs `fixed-top`

In Bootstrap, sticky-top is a class that makes an element "stick" to the top of the viewport when the user scrolls past it. The element will remain "fixed" to the top of the viewport until the user scrolls back up to the element's original position. fixed-top class is similar, but the element will always remain fixed to the top of the viewport, regardless of the user's scroll position.

# Resources

[Testing an API with Postman](https://circleci.com/blog/testing-an-api-with-postman/)

[Bootstrap Navbar Tutorial](https://www.youtube.com/watch?v=qNifU_aQRio)

[The Navigation Section Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)

[The Design of Everyday Things](https://en.wikipedia.org/wiki/The_Design_of_Everyday_Things)

[Donald Norman](https://en.wikipedia.org/wiki/Don_Norman)

[Difference between forEach and forLoop in Javascript](https://www.geeksforgeeks.org/difference-between-foreach-and-for-loop-in-javascript/)

[How to Make Multiple API Requests in Parallel?](https://rapidapi.com/guides/parallel-api-requests)

[How a RESTful API Server Reacts to Requests](https://www.oreilly.com/content/how-a-restful-api-server-reacts-to-requests/)

[The Sequential Network Request Pattern and Why You Should Avoid it!](https://www.webperf.tips/tip/serial-network-requests/)

[Tips for avoiding external and internal API performance issues](https://www.theserverside.com/feature/Tips-for-avoiding-external-and-internal-API-performance-issues)

[Javascript Promise Constructor](https://www.geeksforgeeks.org/javascript-promise-constructor/)

[Promise Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
