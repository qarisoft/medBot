function send_msg(question) {
    const chat = document.getElementById("chat");
    chat.innerHTML+=`<div class="msg flex ">
                        <div class="grow w-6"></div>
                        <p
                            style="
                            text-overflow: ellipsis;"
                            class="msg-user break-all  p-1 bg-slate-600 rounded-tl-lg rounded-tr-lg rounded-bl-lg ">
                        ${question}
                        </p>
                    </div>`;
    chat.scroll({
        top: chat.scrollHeight,
        // left: 100,
        behavior: "smooth",
    })
}


function send_res(ans) {
    const chat = document.getElementById("chat");
    chat.innerHTML+=`<div class="msg flex ">
                       <p
                            style="overflow-wrap:anywhere;
                            text-overflow: ellipsis;"
                            class="msg-bot  mr-3   p-1 bg-slate-600 rounded-tl-lg rounded-tr-lg rounded-br-lg">
                            ${ans}
                        </p>
                    </div>
                    `;
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
try {
    query("tst").then((res)=>{
        console.log(res)
    })
    
} catch (error) {
    console.log(error)
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