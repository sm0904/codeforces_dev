const url = 'https://codeforces.com/api/user.status?handle=kkdrummer';


document.querySelector("div").addEventListener("click", e=>{
	responsiveVoice.speak(document.querySelector("input").value);
})


window.addEventListener("change" , () =>{	
	fetch(url)
	.then(res => res.json())
	.then(data => {
		const change = data['result'][0];
		const user = change['author']['members'][0]['handle'];
        var changeVerdict = change['verdict'] ;
		if(changeVerdict === 'OK'){
			changeVerdict = 'AC';
		}else{
			changeVerdict = 'WRONG ANSWER'
		}
        const problem = change['problem']['index']
        const notification = `${user} got verdict ${changeVerdict} on problem ${problem}`;
		responsiveVoice.speak(notification);
		document.querySelector("input").value = notification;
	})
	.catch(err =>console.log(err));
});