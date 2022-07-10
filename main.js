const _APIKEY = `AIzaSyAAqcsF0GCq1wJjH4X37YbYaYpm-7ZyQjQ`;
let show = false;
alert('hello');
const _qs = (type) => {
  if (document.querySelectorAll(type).length > 1) {
    return document.querySelectorAll(type);
  }
  return document.querySelector(type);
}

const _LoaderCard = _qs("._loaderCard");
const _LoaderWrapper = _qs('.Loader_wrapper');
const _dataCard = _qs('._wrapper');
const _ProgressBar = document.createElement("div");
_ProgressBar.className = "bar";
_LoaderWrapper.appendChild(_ProgressBar);

class Loader {
  constructor(target) {
    this.target = target;
  }

  _showLoader(status) {
    if (status >= 100) {
      this._setPosition(100);
      setTimeout(() => {
        this.target.style.opacity = "0";
      }, 2000);

      setTimeout(() => {
        this._setPosition(0);
        setTimeout(() => {
          this.target.style.opacity = '1'
        }, 5000)
      }, 3000)
    }
    else {
      this._setPosition(status);
    }
  }


  _setPosition(position) {
    setTimeout(() => {
      this.target.style.width = `${position}%`;
    }, 1000);
  }
}

const _setLoader = new Loader(_ProgressBar);


const getData = async (search, cb) => {
  try {
    _setLoader._showLoader(20);
    let data = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${_APIKEY}&type=video&part=snippet&maxResults=100&q=${search}`);
    _setLoader._showLoader(40);
    let res = await data.json();
    _setLoader._showLoader(60)
    cb(res.items)
  }
  catch (err) {
    if (err.message == 'Failed to fetch') {
      alert('Network Connection Error')
    }
  }
}


getData("", (res) => {
  _setLoader._showLoader(80);
  res.forEach(item => {
    getchannelIcon(item);
  })
  setTimeout(() => {
    _setLoader._showLoader(100);
  }, 1500)
});


async function getchannelIcon(item) {
  let channelid = item.snippet.channelId;
  let data = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelid}&maxResults=100&key=${_APIKEY}`);
  let res = await data.json();
  item.profilePic = res.items[0].snippet.thumbnails.medium.url;
  showHTML(item);
}


let montArry = ['Jan', 'Feb', 'Mar', "Apr", 'May', "Jun", "Jul", 'Aug', "Sep", "Oct", "Nov", "Dec"];

function dateFormateer(iso) {
  let date = new Date(iso),
    year = date.getFullYear(),
    month = date.getMonth(),
    dt = date.getDate();
  return (`${dt} ${montArry[month]}, ${year}`);
}


function showHTML(item) {
  let html = `<div onclick="play('${item.profilePic}',{name:'${item.snippet.channelTitle}',title:'${item.snippet.title}',id:'${item.id.videoId}'})" class="card sm:w-72 w-full my-2 cursor-pointer">
               <img class="w-full rounded-lg h-48 object-cover bg-gray-600 object-center" src=${item.snippet.thumbnails.high.url} alt="img" loading="lazy"/>
         <div class="info flex items-start mt-2">
                     <img class="w-8 bg-gray-600 h-8 object-cover rounded-full object-center mt-2" src=${item.profilePic}>
                     <div class='ml-3'>
                     <h1 class=" capitalize font-semibold text-lg dark:text-white">${item.snippet.title}</h1>
                     <p class="flex items-center text-lightColor dark:text-darkColor">${item.snippet.channelTitle}~${dateFormateer(item.snippet.publishTime)}</span></p>
                     </div>
                     </div>
                   </div>`;
  _LoaderCard.forEach(item => {
    item.classList.add('hidden');
  })
  _dataCard.innerHTML += html;
}

function play(e,f) {
  _setLoader._showLoader(50);
  document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // 
  if (!show) {
    let playerHtml = `<div class="_loaderVideo w-full h-auto">
        <iframe class="video w-full fixed bg-gray-600 max-w-lg mx-auto h-60 top-16 left-0 right-0" src="https://www.youtube.com/embed/${f.id}?controls=1&rel=0&showinfo=0&modestbranding=1&autohide=1" title="YouTube video player" frameborder="0" allow="autoplay" allowfullscreen></iframe>
        <div class="flex items-start mt-56 max-w-lg mx-auto">
          <img src=${e} class="rounded-full mt-2 w-8 h-8 shirnk-0 bg-gray-600"/>
          <div class="ml-2">
            <p class="title dark:text-white capitalize font-semibold text-xl">${f.title}</p>
            <p class="name text-lightColor dark:text-darkColor text-sm">${f.name}</p>
          </div>
        </div>`;
     _dataCard.insertAdjacentHTML('afterbegin', playerHtml);
    show = true;
    _setLoader._showLoader(100);
}
else{
  let playerCard = document.querySelector("._loaderVideo");
    playerCard.querySelector(".video").src = `https://www.youtube.com/embed/${f.id}?controls=1&rel=0&showinfo=0&modestbranding=1&autohide=1`;
    playerCard.querySelector('.title').innerHTML = f.title;
    playerCard.querySelector(".name").innerHTML = f.name;
    playerCard.querySelector('img').src = `${e}`;
    _setLoader._showLoader(100);
}
}
