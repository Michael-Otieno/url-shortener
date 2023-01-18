let form = document.getElementById('form');
let inputVal = document.getElementById("input-value")
let contents = document.getElementById('contents')
let error = document.getElementById("error")


form.addEventListener('submit',function(e){
  e.preventDefault()
  if(inputVal.value===""){
    inputVal.style.border = "1px solid red"
    error.textContent = 'Please add a link'
    error.style.color = "red"
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
    content.innerHTML = 
    `
      <p>${inputVal.value}</p>
      <div>
        <p id="text-para">${data.result.short_link}</p>
        <button id="copy-text">Copy</button>
      </div>
    `
  contents.prepend(content)

  let copyTextPara = document.getElementById('text-para')
  let copyTextBtn = document.getElementById('copy-text')

  copyTextBtn.addEventListener('click',function(){
    navigator.clipboard.writeText(copyTextBtn.previousElementSibling.textContent)
    copyTextBtn.textContent = "Copied"
    
  })
  inputVal.value=""
  
  }catch(err){
    console.log(err)
  }
  
  
  


}





