const showLoder=()=>{
  document.getElementById('loader').classList.remove('hidden');
  document.getElementById('videos_container').classList.add('hidden')
}

const hideLoder=()=>{
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('videos_container').classList.remove('hidden')
}

function removeActiveClass() {
  const activeBtns = document.getElementsByClassName("active");
  for (let activeBtn of activeBtns) {
    activeBtn.classList.remove("active");
  }
}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
// --------------------loadVideos---------------
function loadVideos(searchText = '') {
  showLoder();
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const btnAll = document.getElementById("btn-all");
      btnAll.classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoriesVideos = (id) => {
  showLoder();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickBtn = document.getElementById(`btn-${id}`);
      clickBtn.classList.add("active");
      displayVideos(data.category);
    });
};

// ----------------------load Video Details
const loadVideoDetails=(video_id)=>{
  // console.log(video_id);
  const url=`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
  fetch(url)
  .then((res)=>res.json())
  .then((data)=>{
    displayVideoDetails(data.video);
  })
}
// -----------------display video details
const displayVideoDetails=(video)=>{
  console.log(video);
  document.getElementById('video_details').showModal();
  const modalDetails=document.getElementById('modal_details');
  modalDetails.innerHTML=`
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>
  `;


}
// ------------------displaycategory---------
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category_container");
  for (let category of categories) {
    const categoryBtn = document.createElement("div");
    categoryBtn.innerHTML = ` <button id="btn-${category.category_id}" onclick="loadCategoriesVideos(${category.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>`;
    categoryContainer.appendChild(categoryBtn);
  }
}

// ---------------------- display video card
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos_container");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    videoContainer.innerHTML = ` 
     <div class="empty_data flex flex-col justify-center items-center gap-2 col-span-full mt-10">
     <img src="images/icon.png" alt="icon">
     <p class="font-bold text-black w-[433px] text-center text-3xl">Oops!! Sorry, There is no content here</p>
   </div>`;
    hideLoder();
    return;
  }
  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="card bg-base-100 shadow-sm flex justify-center  pb-2">
    <figure class="relative">
      <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Shoes" />
      <span
        class="absolute top-[70%] right-[10%] bg-black text-white px-2 py-1 rounded-[4px]"
        >3hrs 56 min ago</span
      >
    </figure>
    <div class="flex gap-3 px-1 py-5">
      <div class="card_img">
        <div class="avatar">
          <div
            class="ring-primary ring-offset-base-100 w-[40px] rounded-full ring ring-offset-2"
          >
            <img
              src="${video.authors[0].profile_picture}"
            />
          </div>
        </div>
      </div>
      <div class="card_content">
          <h2 class="text-sm text-black font-bold">${video.title}</h2>
          <p class="text-sm text-gray-400 flex gap-1 items-center">${video.authors[0].profile_name}
          ${video.authors[0].verified == true 
            ?
            `<img class="w-[16px] h-[16px]" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified">` 
            :
            ``}
           </p>
          <p class="text-sm text-gray-400">${video.others.views} views</p>
      </div>
    </div>
    <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-wide bg-gray-300 ml-10">Show Details</button>
  </div>
    `;
    videoContainer.appendChild(videoCard);
  });
  hideLoder();
};

// -----------------------search input event-------------------
document.getElementById('search_input').addEventListener('keyup',(event)=>{
    const input=event.target.value;
    loadVideos(input);
})

loadVideos();
loadCategories();
