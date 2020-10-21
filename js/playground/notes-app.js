const notes = [
  {
    title: "cote 1",
    content: "test content",
  },
  {
    title: "aote 2",
    content: "test yeet",
  },
  {
    title: "bote 3",
    content: "test content",
  },
];

document.getElementById("addItem").addEventListener("click", function () {
  const inputValue = document.querySelector("input").value;
  const newSection = document.createElement("section");
  const newParagraph = document.createElement("p");
  newParagraph.textContent = inputValue;
  if (!inputValue.trim() == "") {
    if (!document.querySelector("section")) {
      document.querySelector("body").appendChild(newSection);
    }
    document.querySelector("section").appendChild(newParagraph);
  }
});

document
  .getElementById("deleteAllItems")
  .addEventListener("click", function () {
    const currentSection = document.querySelector("section");
    document.querySelector("body").removeChild(currentSection);
  });
