const inputTextEl = document.getElementById("inputText");
const wordsEl = document.querySelector(".num-words");
const charactersEl = document.querySelector(".num-characters");
const twitterLimitEl = document.querySelector(".num-twitter");
const linkedinLimitEl = document.querySelector(".num-linkedin");
const twitterWarning = document.querySelector(".warning.twitter-warning");
const linkedinWarning = document.querySelector(".warning.linkedin-warning");

const forbiddenWords = [
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  "payment",
  "payments",
  "list",
  "Payment",
  "Payments",
  "List",
];

const wordCountHandler = () => {
  const wordsArray = inputTextEl.value
    .split(" ")
    .filter((val) => val !== "")
    .map((word) => {
      if (forbiddenWords.includes(word) || forbiddenWords[0].test(word)) {
        alert(`You cannot use the word "${word}"`);

        inputTextEl.value = inputTextEl.value.replace(word, "");

        charCountHandler();
      }
      return word;
    });

  const newWordsArray = wordsArray.filter((val) => {
    if (forbiddenWords.includes(val) || forbiddenWords[0].test(val)) {
      return false;
    } else {
      return true;
    }
  });

  wordsEl.innerHTML = newWordsArray.length;
};

const charCountHandler = () => {
  const numberOfChars = inputTextEl.value.split("").length;
  charactersEl.innerHTML = numberOfChars;
  const twitterCharsLeft = 250 - numberOfChars;
  const linkedinCharsLeft = 320 - numberOfChars;
  twitterLimitEl.innerHTML = twitterCharsLeft;
  linkedinLimitEl.innerHTML = linkedinCharsLeft;

  if (twitterCharsLeft < 0) {
    twitterLimitEl.innerHTML = 0;
    twitterWarning.style.display = "block";
  } else {
    twitterWarning.style.display = "none";
  }

  if (linkedinCharsLeft < 0) {
    linkedinLimitEl.innerHTML = 0;
    linkedinWarning.style.display = "block";
  } else {
    linkedinWarning.style.display = "none";
  }
};

inputTextEl.addEventListener("input", charCountHandler);
inputTextEl.addEventListener("input", wordCountHandler);
