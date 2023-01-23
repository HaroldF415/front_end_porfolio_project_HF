const roverSelection = document.querySelector(".rover_selection");

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
  const apiKey = "cj41OPe4xFddhFHxeEB4iMST6rzNpBJwSpsQc5Zw";

  fetch(`${baseURL}${roverName}/?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      populateSolSelection(data);
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

// const solSelection = document.querySelector(".sol_selection");

function populateSolSelection(data) {
  createSolSelectionDropDown();
  const solSelection = document.querySelector(".sol_selection");

  const solsAvailable = data.photo_manifest.photos.map((photo) => photo.sol);
  const solFragment = document.createDocumentFragment();

  solsAvailable.forEach((sol) => {
    const solOption = document.createElement("option");
    solOption.value = sol;
    solOption.textContent = sol;
    solFragment.append(solOption);
  });

  solSelection.append(solFragment);
  createEventListenerForSolSelection(data);
}

function createSolSelectionDropDown() {
  const divSolSelection = document.querySelector(".div_sol_selection");
  divSolSelection.innerHTML = "";

  const solSelectionLabel = document.createElement("label");
  solSelectionLabel.for = "sol_selection";

  const h3SolSelection = document.createElement("span");
  h3SolSelection.classList.add("h3");
  h3SolSelection.textContent = "Select a Sol: ";

  solSelectionLabel.append(h3SolSelection);

  const solSelection = document.createElement("select");
  solSelection.classList.add("sol_selection", "form-select");
  solSelection.name = "sol_selection";
  solSelection.id = "sol_selection";

  divSolSelection.append(solSelectionLabel, solSelection);
  // createEventListenerForSolSelection(data);
}

function createEventListenerForSolSelection(data) {
  const solSelection = document.querySelector(".sol_selection");

  solSelection.addEventListener("change", (event) => {
    const sol = event.target.value;
    displaySolPhotoInfo(data, sol);
  });
}

function displaySolPhotoInfo(data, day) {
  const solContainer = document.querySelector(".sol_container");
  solContainer.innerHTML = "";

  const photosArrayBySol = data.photo_manifest.photos;

  const solByDay = photosArrayBySol.find((photo) => photo.sol === parseInt(day));

  const solNum = solByDay.sol;

  const sol = document.createElement("div");
  sol.classList.add("container", "text-dark");

  const solH2 = document.createElement("h2");
  solH2.classList.add(`sol_${solNum}`);
  solH2.append(`Sol: ${solNum}`);

  const solEarthDate = document.createElement("p");
  solEarthDate.classList.add(`earth_date`);
  solEarthDate.append(`Earth Date: ${solByDay.earth_date}`);

  const solTotalPhotos = document.createElement("p");
  solTotalPhotos.classList.add(`total_photos`);
  solTotalPhotos.append(`Total Photos: ${solByDay.total_photos}`);

  const solCameraListContainer = document.createElement("div");
  solCameraListContainer.classList.add(`available_cameras`);
  const solCameraListH2 = document.createElement("h2");
  solCameraListH2.append("Available Cameras");

  const solCameraList = document.createElement("ul");
  solCameraList.classList.add(`camera_list`);
  solByDay.cameras.forEach((camera) => {
    const cameraItem = document.createElement("li");
    cameraItem.append(camera);
    solCameraList.append(cameraItem);
  });

  solCameraListContainer.append(solCameraListH2, solCameraList);

  sol.append(solH2, solEarthDate, solTotalPhotos, solCameraListContainer);
  solContainer.append(sol);
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

  const solContainer = document.querySelector(".sol_container");
  solContainer.innerHTML = "";
}
