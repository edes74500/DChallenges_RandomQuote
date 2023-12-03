// 1 fetch api
const quoteContainer = document.querySelector(".quote-container");
const randomBtn = document.querySelector("#random");
const copyBtn = document.querySelector("#copy");
let quote = {};
let ready = false;

let randomQuote = async () => {
  await fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => (quote = data))
    .then((ready = true));

  console.log(quote);
};

// let waiting = () => {
//   if (ready === false) quoteContainer.style.background = "red";
// };

let quoteDisplay = () => {
  document.querySelector(".wait").style.display = "block";
  document.querySelector(".app-container").style.display = "none";
  setTimeout(async () => {
    await randomQuote();
    quoteContainer.querySelector("h3").innerHTML = `${quote.author}`;
    quoteContainer.querySelector(".tags-container").innerHTML = "";
    for (let i = 0; i < quote.tags.length; i++) {
      quoteContainer.querySelector(".tags-container").innerHTML += `<span class="tag">${quote.tags[i]}</span>`;
    }
    quoteContainer.querySelector(".quote p").innerHTML = `"${quote.content}"`;
    document.querySelector(".wait").style.display = "none";
    document.querySelector(".app-container").style.display = "flex";
  }, 500);
};

window.addEventListener("load", async () => {
  console.log("onload");
  await quoteDisplay();
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`"${quote.content}" ${quote.author}`);
  console.log("onload");
  alert("Quote copied!");
});
randomBtn.addEventListener("click", () => {
  quoteDisplay();
});
