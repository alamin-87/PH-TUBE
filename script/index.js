function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
// --------------------loadVideos---------------
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}
// ------------------displaycategory---------
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category_container");
  for (let category of categories) {
    const categoryBtn = document.createElement("div");
    categoryBtn.innerHTML = ` <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>`;
    categoryContainer.appendChild(categoryBtn);
  }
}
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos_container");
  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
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
          <p class="text-sm text-gray-400 flex gap-1 items-center">${video.authors[0].profile_name}<img class="w-[16px] h-[16px]" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified"> </p>
          <p class="text-sm text-gray-400">${video.others.views} views</p>
      </div>
    </div>
  </div>
    `;
    videoContainer.appendChild(videoCard);
  });
};
loadCategories();
loadVideos();
