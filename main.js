fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
  .then((response) => response.json())
  .then((response) => displayOnLoad(response))
  .catch((error) => console.log(error));

function displayOnLoad(APOD) {
  displayAPOD(APOD);
}

function displayAPOD(APOD) {
  const APOD_IMG = document.querySelector(".nasa-image");
  APOD_IMG.src = APOD.url;
  APOD_IMG.alt = APOD.title;

  const img_title_strong = document.createElement("strong");
  img_title_strong.textContent = "Title: ";

  const img_title = document.querySelector(".apod-title");
  img_title.append(img_title_strong, APOD.title);

  const img_credit_strong = document.createElement("strong");
  img_credit_strong.textContent = "Credit: ";

  const img_credit = document.querySelector(".apod-credit");
  img_credit.append(img_credit_strong, APOD.copyright);

  const img_date_strong = document.createElement("strong");
  img_date_strong.textContent = "Date: ";

  const img_date = document.querySelector(".apod-date");
  img_date.append(img_date_strong, APOD.date);

  const img_description = document.querySelector(".apod-description");
  img_description.textContent = APOD.explanation;
  
  // testing out pulls with github
}
