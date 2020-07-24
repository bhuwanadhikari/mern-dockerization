import React from 'react';
import './App.css';

const serverUrl = 'http://server:5000'

const postModel = {
	title: '',
	body: '',
}

function App() {

	const [posts, setPosts] = React.useState([])
	const [post, setPost] = React.useState({ ...postModel })

	React.useEffect(() => {


		//get all the posts
		fetch(`${serverUrl}/posts/`, {
			method: 'GET',
		})
			.then(res => res.json())
			.then(res => {
				console.log(res)
			})
			.catch(err => console.log(err))

		//get all the posts
		fetch(`${serverUrl}/posts/`, {
			method: 'GET',
		})
			.then(res => res.json())
			.then(res => {
				setPosts([...res])
			})
			.catch(err => console.log(err))
	}, [])


	const _postChange = (e) => {
		setPost({ ...post, [e.target.name]: e.target.value })
	}

	const _addPost = () => {
		//add new post

		const requestJson = JSON.stringify(post)
		console.log(requestJson)
		fetch(`${serverUrl}post/add/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: requestJson
		})
			.then(res => res.json())
			.then(res => {
				console.log(res)
				setPosts([...posts, { title: res.post.title, body: res.post.body }]);
				setPost({ ...postModel })
			})
			.catch(err => console.log(err))
	}

	console.log(post)

	return (
		<div className="App">
			<h2>All Posts</h2>
			<div>
				<input placeholder="Post Title" value={post.title} onChange={_postChange} type="text" name="title" />
				<input placeholder="Post body" value={post.body} onChange={_postChange} name="body" />
				<button onClick={_addPost}>Add</button>
			</div>
			<div>
				{posts.map((instance, index) => {
					return <div key={index}>
						<h4>{instance.title}</h4>
						<p>{instance.body}</p>
						<hr />
					</div>
				})}
			</div>
		</div>
	);
}

export default App;
