// Setting up Varibles
let userName = document.getElementById("userName");
let btnRepos = document.getElementById("getRepos");
let datas = document.getElementsByClassName("details")[0];

// when click on getRepos button
btnRepos.onclick = function () {
  if (userName.value == "") {
    datas.firstElementChild.textContent = "Please Enter UserName";
  } else {
    getData();
  }
};

// fetch data
function getData() {
  if (datas.contains(datas.firstElementChild)) {
    datas.firstElementChild.remove();
  }
  let reposs = Array.from(document.querySelectorAll(".repos"));
  if (datas.childElementCount > 1) {
    reposs.forEach((ele) => {
      ele.remove();
    });
  }
  fetch(`https://api.github.com/users/${userName.value}/repos`)
    .then((response) => response.json())
    .then((repos) => {
      repos.forEach((repo) => {
        // creating repos name
        let mainDiv = document.createElement("div");
        let paragraph = document.createElement("p");
        let reposText = document.createTextNode(repo.name);

        // appending repos name
        mainDiv.appendChild(paragraph);
        paragraph.appendChild(reposText);
        paragraph.className = "repoName";
        datas.appendChild(mainDiv);
        mainDiv.className = "repos";

        // Creating links Repos
        let linkRepo = document.createElement("a");
        linkRepo.className = "link";
        linkRepo.href = `https://github.com/${userName.value}/${repo.name}`;
        let textLink = document.createTextNode("Visit");
        linkRepo.setAttribute("target", "_blank");
        // Append Visit Repos
        linkRepo.appendChild(textLink);
        mainDiv.appendChild(linkRepo);

        // Creating Stars
        let stars = document.createElement("span");
        let starsText = document.createTextNode(
          `Stars ${repo.stargazers_count}`
        );

        // append Stars
        stars.appendChild(starsText);
        mainDiv.appendChild(stars);
        stars.className = "star";
        // watchers
        let watchers = document.createElement("span");
        let watchersText = document.createTextNode(
          `Watchers Is ${repo.watchers_count}`
        );

        //append Watchers
        watchers.appendChild(watchersText);
        mainDiv.appendChild(watchers);
        watchers.classList.add("watchers");
      });
    });
}
