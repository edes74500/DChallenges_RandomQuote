// 1 fetch api
const quoteContainer = document.querySelector(".quote-container");
const randomBtn = document.querySelector("#random");
const copyBtn = document.querySelector("#copy");
let quote = {};

let randomQuote = async () => {
  await fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => (quote = data));

  console.log(quote);
};

let quoteDisplay = async () => {
  await randomQuote();
  quoteContainer.querySelector("h3").innerHTML = `${quote.author}`;
  quoteContainer.querySelector(".tags-container").innerHTML = "";
  for (let i = 0; i < quote.tags.length; i++) {
    quoteContainer.querySelector(".tags-container").innerHTML += `<span class="tag">${quote.tags[i]}</span>`;
  }
  quoteContainer.querySelector(".quote p").innerHTML = `"${quote.content}"`;
};

window.addEventListener("load", () => quoteDisplay());

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`"${quote.content}" ${quote.author}`);
  alert("Quote copied!");
});
randomBtn.addEventListener("click", () => {
  quoteDisplay();
});
