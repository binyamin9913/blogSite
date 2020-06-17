const container = document.getElementById('container');//the div from the Feed.html should to contain the data for presented
  
getPost();// the three get posts are initalize the page with three posts except what i writed in the Feed.html 
getPost();// the three get posts are initalize the page with three posts except what i writed in the Feed.html 
getPost();// the three get posts are initalize the page with three posts except what i writed in the Feed.html 

window.addEventListener('scroll', () => {//anomaly function for show the state of scroll 
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;//to accept the values that define where am i once i am scroll down
	
	console.log( { scrollTop, scrollHeight, clientHeight }); // for the developer to undertand when i am load more data 
	 
	if(clientHeight + scrollTop >= scrollHeight - 5) {//in the condicion we are ready to show more data(posts)
		setTimeout(getPost,800);// go to the function when i call at but i can to define the time that the data came so i use at setTimeout()
	}
});

async function getPost() {// async function mean that we can use at 'await' for asynchronous because that is give prommise that the await wait until that accept the data from the api
	const postsFromApi = await fetch(`https://jsonplaceholder.typicode.com/posts/${Math.floor(Math.random() * 100) + 1}`);//i conect to api of describe of pepole and we take the data randomally 
	const DataFromPostApi = await postsFromApi.json();//we take the data in shape of json 
	
	const userInformationFromApi = await fetch('https://randomuser.me/api');
	const userInformation = await userInformationFromApi.json();//we take the data in shape of json 
	
	const data = { post: DataFromPostApi, userDetail: userInformation.results[0] };//to accept all data that present at json in the first result
 /* that contain gender,name,location,email,login,dob,registered,phone,cell,id,picture,nat
	so i want to take the profile picture and the full name 
	from the first api i will take the title that actully describe of pepole what they say */ 
	addToFeedPage(data);//take the class "data" that contain the data of two apis and sending to function that append the data in the web page
}
function addToFeedPage(data) {
	const postElement = document.createElement('div');//craete place to ahow the posts
	postElement.classList.add('postLists');//add more posts the same name has showed up in my Feed.html
    postElement.innerHTML = `
        <h2 class="title"><img src="${data.userDetail.picture.large}" alt="${data.userDetail.name.first}" /> <span>${data.userDetail.name.first} ${data.userDetail.name.last}</span></h2>
        <p style="margin-left:0px;" class="text">${data.post.title}</p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAsEAeb-OiL3YfemEQX2iX5yyhqH8BPfe54Ea40Xqc7jkaA04R&usqp=CAU" alt="pic" />
        <ul>
            <button class="activationButtons">Like</button>
            <button class="activationButtons">SHERE</button>
            <button class="activationButtons">Comment</button>
        </ul>
	`;
	container.appendChild(postElement);//append the new posts in the web page 
	/*
	the page made for hatal i hope you enjoy from my code 
	*/ 
	
}
