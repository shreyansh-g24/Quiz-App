// FUNCTIONS.JS //

// Declaring Global Variables and Constants //
let global_quizStore = null;

// let homeQuizDisplay = `<div class="card margin-basic shadow-basic"><div class="card-content"><p class="title">${info._doc.title}</p><p class="subtitle">by ${info._doc.creator_id}</p></div><footer class="card-footer"><p class="card-footer-item"><span><a href="http://localhost:3000/api/v1/quiz/search/${info._doc._id}">Read More</a></span></p><p class="card-footer-item"><span><a href="00_SHARE_00">Copy Sharable Link</a></span></p></footer></div>`;
let toReplace = ["00_TITLE_00", "00_CREATOR_00", "00_LINK_00", "00_SHARE_00"];


// Declaring Functions //

// fetching data
// url: The url to fetch data from
// returns: The parsed data
async function syncFetch(url){
  let response = await fetch(url);
  let data = response.json();
  return data;
}

// formatting data
// info: receiving the object to extract data from
// block: the block to be formatted
// returns: the formatted data
function formatData(info){
  // console.log(info._doc.title, info._doc.creator_id, info._doc._id);
  // block.replace(toReplace[0], info._doc.title);
  // block.replace(toReplace[1], info._doc.creator_id);
  // block.replace(toReplace[2], `http://localhost:3000/api/v1/quiz/search/${info._doc._id}`);
  // block.replace(toReplace[0], info._doc.title);
  let a = `<div class="card margin-basic shadow-basic"><div class="card-content"><p class="title">${info._doc.title}</p><p class="subtitle">by ${info._doc.creator_id}</p></div><footer class="card-footer"><p class="card-footer-item"><span><a href="http://localhost:3000/api/v1/quiz/search/${info._doc._id}">Read More</a></span></p><p class="card-footer-item"><span><a href="00_SHARE_00">Copy Sharable Link</a></span></p></footer></div>`;
  return a;
}

// displaying data
// containerId: The id of the container to append the block of formatted code to
// htmlCode: Block of formatted html code
// returns: 0 if success
function displayHtmlData(containerId, htmlCode){
  let container = document.querySelector(`#${containerId}`);
  container.innerHTML += htmlCode;
  return 0;
}

// execution
syncFetch("http://localhost:3000/api/v1/quiz")
  .then(data => {
    for(let i = 0, n = data.length; i < n; i++){
      let formattedData = formatData(data[i]);
      displayHtmlData("homeQuizDisplay", formattedData);
    }
  })
