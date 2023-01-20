let form = document.getElementById('form');
let inputVal = document.getElementById("input-value")
let contents = document.getElementById('contents')
let error = document.getElementById("error")



function toggle() {
  var x = document.getElementById("menu");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

form?.addEventListener('submit',function(e){
  e.preventDefault()
  if(inputVal.value===""){

    inputVal.style.border = "2px solid hsl(0, 87%, 67%)"
    error.textContent = 'Please add a link'
    error.style.color = "hsl(0, 87%, 67%)"
    error.style.margin = "0"
    error.style.textAlign = "left"
    error.style.fontStyle = "italic"
    error.style.fontSize = "18px"

    return
  }else{
    inputVal.style.border = "1px solid black"
    error.textContent = ''
    shortUrl(inputVal)

  }

})

const shortUrl = async()=>{
  try{
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputVal.value}`);
    const data = await res.json();
    let content = document.createElement('div')
    content.className = "content"
    content.innerHTML = 
    `
      <p class="input-returned">${inputVal.value}</p>
      <div>
        <p id="text-para" class="text-para" >${data.result.short_link}</p>
        <button id="copy-text" class="copy-btn">Copy</button>
      </div>
    `
    content.style.backgroundColor = "white"
    
  contents.prepend(content)
  
  let copyTextPara = document.getElementById('text-para')
  let copyTextBtn = document.getElementById('copy-text')

  copyTextBtn.addEventListener('click',function(){
    navigator.clipboard.writeText(copyTextBtn.previousElementSibling.textContent)
    copyTextBtn.textContent = "Copied!"
    copyTextBtn.style.backgroundColor = 'hsl(257, 27%, 26%)'
    copyTextPara.style.color = 'hsl(180, 66%, 49%)'
    
    
  })
  inputVal.value=""
  
  }catch(err){
    console.log(err)
  }

}






