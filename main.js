function send_msg(question) {
    const chat = document.getElementById("chat");
    chat.innerHTML+=`<div class="msg-user break-word tracking-wide m-2 p-3 bg-slate-600 rounded-tl-lg rounded-tr-lg rounded-bl-lg w-fit ml-auto">
                        ${question}
                    </div>`;
    chat.scroll({
        top: chat.scrollHeight,
        // left: 100,
        behavior: "smooth",
    })
}


function send_res(ans) {
    const chat = document.getElementById("chat");
    chat.innerHTML+=`<div
                        class="msg-bot tracking-wide m-2 mr-10 p-3 break-word bg-slate-600 rounded-tl-lg rounded-tr-lg rounded-br-lg w-fit mr-auto">
                        ${ans}
                    </div>`;
    chat.scroll({
        top: chat.scrollHeight,
        // left: 100,
        behavior: "smooth",
    })
}

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/qarisoft/tstmodel0",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}



document.getElementById("send").addEventListener('click',function(){
    // console.log("salah");
    const ipt = document.getElementById("qz_input");
    // console.log(ipt.length)
    if (ipt.value.length >0) {
        
        send_msg(ipt.value);
        
        query({"inputs": `${ipt.value}`})
        .then((response) => {
            const res = response[0]['generated_text'];
            send_res(res)
            console.log(res);
        });
        
        ipt.value="";
    }

} );

document.getElementById("fever").addEventListener('click',function(){
    const ipt = document.getElementById("qz_input");
    ipt.value = "what is fever?"
});
document.getElementById("headache").addEventListener('click',function(){
    const ipt = document.getElementById("qz_input");
    ipt.value = "what is best medication for headache?"
});