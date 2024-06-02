// forms
const chatSubmit = document.querySelector('#inputContainer')
const chatSubmitFolio = document.querySelector('#inputContainerFolio')
const emptyState = document.querySelector('#emptyState')
const inputField = document.getElementById('chatinput')
const userInput = inputField.value
const chatSubmitButton = document.getElementById('chatSubmit')
const chatSubmitButtonIMG = document.getElementById('chatSubmitIMG')

// output
const responseLog = document.querySelector('.responseLog')
const responseContainer = document.querySelector('.responseContainer')
const loader = document.querySelector('.loadingIndicator')
const query = document.querySelector('.query p')
const AiResponse = document.querySelector('.responseLog p')
const AiResponseBlurb = document.querySelector('.blurb p')
const AiResponseCardHeader = document.querySelector('.cardHeader p')
const AiResponseCardDescription = document.querySelector('.cardDescription p')
const URL = document.querySelector('.cardURL')
const AiResponseCardURL = document.querySelector('.cardURL a')
// store data from responses below
let data

chatSubmit.addEventListener('input', () => {
    inputField.value.trim();
    chatSubmitButton.disabled = inputField.value.trim() === '';
    chatSubmitButtonIMG.style.opacity = inputField.value.trim() === '' ? 0.25 : 1;
});

chatSubmitFolio.addEventListener('input', () => {
    inputField.value.trim();
    chatSubmitButton.disabled = inputField.value.trim() === '';
    chatSubmitButtonIMG.style.opacity = inputField.value.trim() === '' ? 0.25 : 1;
});

chatSubmit.addEventListener('submit', async (e) => {
    e.preventDefault()
    inputField.blur()
    chatSubmitButtonIMG.style.opacity = 0.25;
    chatSubmitButton.disabled = true;

    // display the responseLog
    emptyState.style.display = 'none'
    responseLog.style.transition = 'opacity 2s'
    responseLog.style.opacity = 0
    responseLog.style.visibility = 'visible'
    responseLog.style.transition = 'transform 0.5s ease-in-out, opacity 2s'
    responseLog.style.transform = 'translateY(0)'
    responseLog.style.opacity = 1
    responseContainer.style.opacity = 0
    responseContainer.style.visibility = 'hidden'
    responseContainer.style.transition = 'opacity 2s'
    responseLog.style.transform = 'translateY(33%)'

    // Grab user input
    const userInput = inputField.value  
    query.textContent = inputField.value
    inputField.value = ''
    loader.style.height = '80px'
    loader.style.visibility = 'visible'
    setTimeout(() => {
        loader.style.transition = 'opacity 0.5s'
        loader.style.opacity = 1
    }, 100); // Adding a 100ms delay before displaying loader

    const res = await fetch('/api/openai/meta', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ defineProblem: userInput })
    })
    data = await res.json()

    // Log the API response to the console
    console.log(data);

    // inject LLM output into UI AiResponse.textContent = userInput
    const contentObject = JSON.parse(data.AiResponse)
    const blurb = contentObject.blurb
    const cardHeader = contentObject.cardHeader
    const cardDescription = contentObject.cardDescription
    const cardURL = contentObject.cardURL
    if (AiResponseBlurb) AiResponseBlurb.textContent = blurb
    if (AiResponseCardHeader) AiResponseCardHeader.textContent = cardHeader
    if (AiResponseCardDescription) AiResponseCardDescription.textContent = cardDescription
    if (AiResponseCardURL) AiResponseCardURL.href = cardURL
    loader.style.visibility = 'hidden'
    loader.style.opacity = 0
    loader.style.height = '0px'
    responseLog.style.transform = 'translateY(0)'
    responseContainer.style.visibility = 'visible'
    responseContainer.style.transition = 'transform 0.5s ease-in-out, opacity 2s'
    responseContainer.style.transform = 'translateY(0)'
    responseContainer.style.opacity = 1

})

chatSubmitFolio.addEventListener('submit', async (e) => {
    e.preventDefault()
    inputField.blur()
    chatSubmitButtonIMG.style.opacity = 0.25;
    chatSubmitButton.disabled = true;

    // display the responseLog
    emptyState.style.display = 'none'
    responseLog.style.transition = 'opacity 2s'
    responseLog.style.opacity = 0
    responseLog.style.visibility = 'visible'
    responseLog.style.transition = 'transform 0.5s ease-in-out, opacity 2s'
    responseLog.style.transform = 'translateY(0)'
    responseLog.style.opacity = 1
    responseContainer.style.opacity = 0
    responseContainer.style.visibility = 'hidden'
    responseContainer.style.transition = 'opacity 2s'
    responseLog.style.transform = 'translateY(33%)'

    // Grab user input
    const userInput = inputField.value  
    query.textContent = inputField.value
    inputField.value = ''
    loader.style.height = '80px'
    loader.style.visibility = 'visible'
    setTimeout(() => {
        loader.style.transition = 'opacity 0.5s'
        loader.style.opacity = 1
    }, 100); // Adding a 100ms delay before displaying loader

    const res = await fetch('/api/openai/folio', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ defineProblem: userInput })
    })
    data = await res.json()

    // Log the API response to the console
    console.log(data);

    // inject LLM output into UI AiResponse.textContent = userInput
    const contentObject = JSON.parse(data.AiResponse)
    const blurb = contentObject.blurb
    const cardHeader = contentObject.cardHeader
    const cardDescription = contentObject.cardDescription
    const cardURL = contentObject.cardURL
    if (AiResponseBlurb) AiResponseBlurb.textContent = blurb
    if (AiResponseCardHeader) AiResponseCardHeader.textContent = cardHeader
    if (AiResponseCardDescription) AiResponseCardDescription.textContent = cardDescription
    if (AiResponseCardURL) AiResponseCardURL.href = cardURL
    loader.style.visibility = 'hidden'
    loader.style.opacity = 0
    loader.style.height = '0px'
    responseLog.style.transform = 'translateY(0)'
    responseContainer.style.visibility = 'visible'
    responseContainer.style.transition = 'transform 0.5s ease-in-out, opacity 2s'
    responseContainer.style.transform = 'translateY(0)'
    responseContainer.style.opacity = 1

})