const container = document.getElementById('container');
const loading = document.querySelector('.loading');

getPost();
getPost();
getPost();

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	console.log( { scrollTop, scrollHeight, clientHeight });
	
	if(clientHeight + scrollTop >= scrollHeight - 5) {
		// show the loading animation
		showLoading();
	}
});

function showLoading() {
	loading.classList.add('show');
	
	// load more data
	setTimeout(getPost)
}

async function getPost() {
	const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${getRandomNr()}`);
	const postData = await postResponse.json();
	
	const userResponse = await fetch('https://randomuser.me/api');
	const userData = await userResponse.json();
	
	const data = { post: postData, user: userData.results[0] };
	
	addDataToDOM(data);
}

function getRandomNr() {
	return Math.floor(Math.random() * 100) + 1;
}

function addDataToDOM(data) {
	const postElement = document.createElement('div');
	postElement.classList.add('blog-post');
    postElement.innerHTML = `
        <h2 class="title"><img src="${data.user.picture.large}" alt="${data.user.name.first}" /> <span>${data.user.name.first} ${data.user.name.last}</span></h2>
        <p style="margin-left:0px;" class="text">${data.post.title}</p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAsEAeb-OiL3YfemEQX2iX5yyhqH8BPfe54Ea40Xqc7jkaA04R&usqp=CAU" alt="pic" />
        <ul>
            <button class="activationButtons"> Like</button>
            <button class="activationButtons"> SHERE</button>
            <button class="activationButtons"> Comment</button>
        </ul>
	`;
	container.appendChild(postElement);
	
}