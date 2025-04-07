const postsArea = document.getElementById('posts-area');
const moreButton = document.getElementById('more-button');

let postCount = 0;

const postContents = [
    "Just adopted this cute puppy today! What should I name him?",
    "Made homemade pizza for the first time. Not perfect but I'm proud!",
    "Sunset at the beach was amazing tonight! Had to share this view.",
    "Finally finished reading this book. Highly recommend it!",
    "My garden is finally blooming! All that hard work paid off.",
    "Hiked to the top of the mountain today. The view was worth every step!",
    "Just got my new gaming setup! Ready for some serious gaming sessions.",
    "Look at this delicious cake I baked for my mom's birthday!",
    "My cat always sits like this. I think she's broken...",
    "Visited the Grand Canyon for the first time. Pictures don't do it justice!",
    "Just completed my first marathon! 26.2 miles!",
    "Found this cool street art downtown. The artist is so talented!",
    "My first attempt at painting. Please be kind, I'm still learning!",
    "This coffee shop has the best view in the city!",
    "Just got my dream car! Been saving up for years for this moment.",
    "Made this tiny crochet elephant for my niece. She loves it!",
    "Caught this amazing lightning strike during last night's storm!",
    "My houseplant collection is getting out of control...",
    "Tried this new restaurant and the food was incredible!",
    "Built this bookshelf myself. Not bad for a first DIY project!"
];

const subreddits = [
    "r/aww", "r/food", "r/EarthPorn", "r/books", "r/gardening",
    "r/hiking", "r/gaming", "r/baking", "r/cats", "r/travel",
    "r/running", "r/Art", "r/painting", "r/CityPorn", "r/cars",
    "r/crochet", "r/weather", "r/houseplants", "r/FoodPorn", "r/DIY"
];

const usernames = [
    "HappyDogLover", "ChefInTraining", "SunsetChaser", "BookWorm42", "GreenThumb",
    "MountainClimber", "GamerGirl", "BakingQueen", "CrazyCatLady", "Wanderlust",
    "MarathonRunner", "ArtEnthusiast", "NewPainter", "CityExplorer", "CarEnthusiast",
    "CrochetMaster", "StormChaser", "PlantParent", "FoodieForever", "DIYNewbie"
];

const timePeriods = [
    "just now", "5 minutes ago", "10 minutes ago", "30 minutes ago", "1 hour ago",
    "2 hours ago", "3 hours ago", "5 hours ago", "8 hours ago", "12 hours ago",
    "yesterday", "2 days ago", "3 days ago", "this week", "last week"
];

function addNewPost() {
    postCount++;

    const contentIndex = (postCount - 1) % postContents.length;
    const subredditIndex = (postCount - 1) % subreddits.length;
    const usernameIndex = (postCount - 1) % usernames.length;
    const timeIndex = Math.floor(Math.random() * timePeriods.length);

    const likes = Math.floor(Math.random() * 1000) + 5;
    const comments = Math.floor(Math.random() * 50) + 1;

    const post = document.createElement('div');
    post.className = 'post';

    post.innerHTML = `
        <div class="post-header">
            <div class="user-avatar">👤</div>
            <div>
                <div class="username">u/${usernames[usernameIndex]} • ${subreddits[subredditIndex]}</div>
                <div class="post-time">Posted ${timePeriods[timeIndex]}</div>
            </div>
        </div>
        <div class="post-content">${postContents[contentIndex]}</div>
        <img src="https://picsum.photos/800/500?random=${postCount}" class="post-picture">
        <div class="post-actions">
            <div class="action">⬆️ Upvote (${likes})</div>
            <div class="action">💬 Comments (${comments})</div>
            <div class="action">↗️ Share</div>
        </div>
    `;

    postsArea.appendChild(post);

    if (postCount >= 20) {
        moreButton.textContent = "No More Posts";
        moreButton.disabled = true;
    }
}

addNewPost();
addNewPost();
addNewPost();

moreButton.addEventListener('click', addNewPost);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (postCount < 20) {
            addNewPost();
        }
    }
});
