const formWrapper = document.querySelector(".form-wrapper");
const form = document.getElementById("form");
const sucheInput = document.getElementById("sucheInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const sucheButton = document.getElementById("sucheButton");
const bereinigenButton = document.getElementById("bereinigenButton");
const imageListWrapper = document.querySelector(".imageList-wrapper");

const runEventListeners = () => {
 form.addEventListener("submit", suche);
 bereinigenButton.addEventListener("click", bereinigen);
}  

const bereinigen = (e) => {
  e.preventDefault();
  sucheInput.value = "";
  imageListWrapper.innerHTML = "";
};

const suche = async (e) => {
  e.preventDefault();
  imageListWrapper.innerHTML = "";
  const wert = sucheInput.value.trim();
  if (!wert) {
    alert("Bitte geben Sie einen Suchbegriff ein.");
    return;
  }
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${wert}`, {
      method: "GET",
      headers: {
        Authorization: "Client-ID EgFDiI-FJD9hNyhOHsBVJYgmBjhjoUqJNElMICGBDgw",
      }
    });
    const data = await response.json();
    data.results.forEach((image) => {
      addiereImageZuUI(image.urls.small);
    });
  } catch (error) {
    console.error("Error", error);
  }
};

const addiereImageZuUI = (url) => {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.height = '500';
  img.width = '500';
  div.appendChild(img);
  imageListWrapper.append(div);
};

runEventListeners();
