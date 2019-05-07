class Projects {
  constructor() {
    this.content = $(".content");
  }

  fetchData() {
    fetch("https://api.github.com/users/SamDe4574/repos").then(response => response.json()).then(parsedJSON => parsedJSON.map(project => ({
      name: `${project.name}`,
      url: `${project.html_url}`,
      language: `${project.language}`
    }))).then(details => details.forEach((elements, index) => {
      this.appendData(elements, index);
    })).catch(error => console.log("Failed", error));
  }

  appendData(element, index) {
    let col = `<div class = "col-lg-3 card${index} cardd"> <a class="link" href=${element.url}><h5>${element.name}</h5>
    <p id="lang">${element.language}</p>
    </a> </div>`;
    this.content.append(col);
  }

}

let project = new Projects(); // navbar button

$("#wrapper").click(function () {
  $(".icon").toggleClass("close");
  $(".navbar").fadeToggle(100);
});
$(document).ready(function () {
  baffleText();
  project.fetchData();
}); // baffle Effect

function baffleText() {
  const text = baffle("#title");
  text.set({
    characters: "abcdefghijklmnopqrstuvwxyz",
    speed: 120
  });
  text.start();
  text.reveal(4000);
} // Parallax Effect


$(window).scroll(function () {
  var scrollPos = $(this).scrollTop();
  $(".header").css({
    "background-size": 100 + scrollPos + "%"
  });
});
//# sourceMappingURL=main.js.map
