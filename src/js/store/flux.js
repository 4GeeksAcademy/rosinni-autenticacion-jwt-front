import axios from 'axios';
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			login: async (userEmail,userPassword) => {
				// console.log(userEmail,userPassword);
				try{
					let response = await axios.post('https://rosinni-redesigned-acorn-wgr4v6444r6h5r7j-3000.preview.app.github.dev/login', {
						email:userEmail,
						password:userPassword
					  })
					  if(response.status === 200){
						localStorage.setItem("myToken",response.data.access_token)
						return true;
					  }

				}catch(err){
					console.log(err);
					// err.response.status === 401
					if(err.response.status === 401){
						return false;
					}
				}


				// fetch('https://rosinni-redesigned-acorn-wgr4v6444r6h5r7j-3000.preview.app.github.dev/login',{
				// 	method:'POST',
				// 	body: JSON.stringify({email:userEmail,password:userPassword}),
				// 	headers:{
				// 		'Content-Type':'application/json'
				// 	}
				// })
				// .then((response)=>response.json())
				// .then((data)=>console.log(data))
				// .catch((error)=>console.log(error))
			},
			logout: () => {
				let token = localStorage.getItem("myToken")
				return	token != null ? true : false
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
