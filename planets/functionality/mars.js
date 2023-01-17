const roverSelection = document.querySelector(".form-select");

onload();

function onload() {
  fetchInformation("curiosity", "manifest");
}

roverSelection.addEventListener("change", (event) => {
  const rover = event.target.value;
  changeDisplay(rover);
  fetchInformation(rover, "manifest");
});

function changeDisplay(roverName) {
  const landingPage = document.querySelector(".landing-img");
  landingPage.src = `../../assets/rovers/mars_${roverName}_rover.jpg`;
}

function fetchInformation(roverName, fetchType) {
  if (fetchType === "manifest") {
    fetchManifest(roverName);
  }
}

function fetchManifest(roverName) {
  const baseURL = "https://api.nasa.gov/mars-photos/api/v1/manifests/";
  const apiKey = "DEMO_KEY";

  fetch(`${baseURL}${roverName}/?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      displayManifest(data);
    });
}

function displayManifest(data) {
  clearInformation();

  const manifestName = document.querySelector(".manifest_name");
  manifestName.append(` ${data.photo_manifest.name}`);

  const manifestLaunchDate = document.querySelector(".manifest_launch_date");
  manifestLaunchDate.append(` ${data.photo_manifest.launch_date}`);

  const manifestLandingDate = document.querySelector(".manifest_landing_date");
  manifestLandingDate.append(` ${data.photo_manifest.landing_date}`);

  const manifestStatus = document.querySelector(".manifest_status");
  manifestStatus.append(` ${data.photo_manifest.status}`);

  const manifestMaxSol = document.querySelector(".manifest_max_sol");
  manifestMaxSol.append(` ${data.photo_manifest.max_sol}`);

  const manifestMaxDate = document.querySelector(".manifest_max_date");
  manifestMaxDate.append(` ${data.photo_manifest.max_date}`);

  const manifestTotalPhotos = document.querySelector(".manifest_total_photos");
  manifestTotalPhotos.append(` ${data.photo_manifest.total_photos}`);
}

function clearInformation() {
  const manifestName = document.querySelector(".manifest_name");
  manifestName.innerHTML = `<strong>Name: .......... </strong>`;

  const manifestLaunchDate = document.querySelector(".manifest_launch_date");
  manifestLaunchDate.innerHTML = `<strong>Launch Date: .......... </strong>`;

  const manifestLandingDate = document.querySelector(".manifest_landing_date");
  manifestLandingDate.innerHTML = `<strong>Landing Date: .......... </strong>`;

  const manifestStatus = document.querySelector(".manifest_status");
  manifestStatus.innerHTML = `<strong>Status: .......... </strong>`;

  const manifestMaxSol = document.querySelector(".manifest_max_sol");
  manifestMaxSol.innerHTML = `<strong>Max Sol: .......... </strong>`;

  const manifestMaxDate = document.querySelector(".manifest_max_date");
  manifestMaxDate.innerHTML = `<strong>Max Date: .......... </strong>`;

  const manifestTotalPhotos = document.querySelector(".manifest_total_photos");
  manifestTotalPhotos.innerHTML = `<strong>Total Photos: .......... </strong>`;
}
// function constructURL(roverName) {
//   const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/photos?";
//   const sol = 1000;
//   const type = "photos"
//   const rover = roverName;
//   const apiKey = "DEMO_KEY";

//   https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
// }
