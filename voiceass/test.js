
const localurl = 'http://localhost:9000/stream';

/*const changeoncf = new CustomEvent("changeoncf" , {
	detail:{
		name : "custom"
	}
});*/

/*window.addEventListener("changeoncf", ()=>{
	fetch(localurl)
	.then(res => res.text())
	.then(data => {
		let notify = new SpeechSynthesisUtterance(data); 
    	window.speechSynthesis.cancel();
    	window.speechSynthesis.speak(notify); 
	})
	.catch(err => console.log(err));
});*/

document.querySelector("input").addEventListener("changeoncf" , (event)=>{
	console.log('Detected change successfully');
	let change = new SpeechSynthesisUtterance(event.target.value);
	window.speechSynthesis.cancel();
	window.speechSynthesis.speak(change);
});


document.querySelector("input").addEventListener("click" , ()=>{
	fetch(localurl)
	.then(res => res.text())
	.then(data => {
		console.log(data);
	})
	.catch(err => console.log(err));
});

//window.dispatchEvent(changeoncf);

