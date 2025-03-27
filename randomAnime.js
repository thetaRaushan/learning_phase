// let btn = document.querySelector("button");
// // let apiUrl = 'https://api.waifu.im/tags';


// // async function getImage(){
// //     try{
// //         let res = await axios.get(apiurl);
// //         return res.data.message;
// //     } catch(e){
// //         console.log("error - ",e);
// //         return "/"
// //     }
// // }

// // fetch(apiUrl)
// //   .then(response => {
// //     if (response.ok) {
// //       return response.json();
// //     } else {
// //       throw new Error('Request failed with status code: ' + response.status);
// //     }
// //   })
// //   .then(data => {
// //     // Process the response data as needed
// //     console.log(data);
// //   })
// //   .catch(error => {
// //     console.error('An error occurred:', error.message);
// //   });

// const apiUrl = 'https://api.waifu.im/search';  // Replace with the actual API endpoint URL
// const params = {
//   included_tags: ['waifu','maid','marin-kitagawa','mori-calliope','raiden-shogun','oppai','selfies','uniform','kamisato-ayaka'],
//   height: '>=2000'
// };

// const queryParams = new URLSearchParams();

// for (const key in params) {
//   if (Array.isArray(params[key])) {
//     params[key].forEach(value => {
//       queryParams.append(key, value);
//     });
//   } else {
//     queryParams.set(key, params[key]);
//   }
// }
// const requestUrl = `${apiUrl}?${queryParams.toString()}`;

// fetch(requestUrl)
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Request failed with status code: ' + response.status);
//     }
//   })
//   .then(data => {
//     // Process the response data as needed
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('An error occurred:', error.message);
//   });

//   btn.addEventListener("click",async()=>{
//     let link=await fetch();
//     console.log(link);
//     let image = document.querySelector("#result");
//     image.setAttribute(scr,link);
// });

let btn = document.querySelector("button");

const apiUrl = "https://api.waifu.im/search"; // API URL

const tags = [
    "waifu",
    "maid",
    "marin-kitagawa",
    "mori-calliope",
    "raiden-shogun",
    "oppai",
    "selfies",
    "uniform",
    "kamisato-ayaka",
];

// Function to get a random tag
function getRandomTag() {
    return tags[Math.floor(Math.random() * tags.length)];
}

async function getImage() {
    const randomTag = getRandomTag(); // Select a random tag

    const queryParams = new URLSearchParams({
        included_tags: randomTag, // Use a random tag
        height: ">=2000",
    });

    const requestUrl = `${apiUrl}?${queryParams.toString()}`;

    try {
        let response = await fetch(requestUrl);
        if (!response.ok) throw new Error("Request failed with status " + response.status);

        let data = await response.json();

        // Extract the image URL from the response
        if (data.images && data.images.length > 0) {
            return data.images[0].url; // Assuming first image
        } else {
            throw new Error("No images found in response");
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
        return "fallback-image.jpg"; // Fallback image path (use a valid image)
    }
}

btn.addEventListener("click", async () => {
    let link = await getImage();
    console.log("Image URL:", link);

    let image = document.querySelector("#result");
    image.setAttribute("src", link); // Corrected "src"
    image.setAttribute("alt", "Random Anime Image"); // Adds alt text for accessibility
});
