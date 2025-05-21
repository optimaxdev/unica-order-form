setTimeout(()=>{
    const ratingRadios = document.querySelectorAll('input[name="ExperienceRating"]');
    const tabs = document.querySelectorAll('.tab');
    const feedback = document.getElementById('feedback') || { value: "" };
    const FormDataInput = document.querySelector('.form');
    const emoji = document.querySelectorAll('.componeEmoji');
    const emojiTwo = document.querySelectorAll('.comptwoEmoji');
    const answerEmojiOs=document.querySelectorAll('.componeEmoji input');
    const star = document.querySelectorAll('.star');
    const ratingError = document.querySelector('.rating');
    let orderStatusContainer = document.querySelector('.orderStatus');
    const thankyoupagev1=document.querySelector('.tp1');
    const thankyoupagev2=document.querySelector('.tp2');
    const emojiSelectors = ['.componeEmoji', '.comptwoEmoji'];
    const  scrolltop=document.querySelector('.cmsPage');
    if (!FormDataInput) {
        console.error("Form not found");
        return;
    }
    
    const errorMessages = {
        reason: document.querySelector('#reason-error'),
        orderStatus: document.querySelector('#order-status-error'),
        satisfaction: document.querySelector('#satisfaction-error'),
        rating: document.querySelector('#rating-error'),
        feedback: document.querySelector('#feedback-error')
    };
    
    
    
    emojiSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(tabemoji => {
    tabemoji.addEventListener("click", () => {
    // Remove active class from all emojis in the same category
    document.querySelectorAll(selector).forEach(link => {
        link.classList.remove("emojiactive");
    });
    
    // Add active class to the clicked emoji
    tabemoji.classList.add("emojiactive");
    });
    });
    });
    
    
    // Tab Selection Handler
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(link => link.classList.remove("activeoption"));
            tab.classList.add("activeoption");
        });
    });
    
    // Update Star Colors Based on Rating
    ratingRadios.forEach(radio => {
        radio.addEventListener('change', () => updateStarColors(radio.value));
    });
    
    function updateStarColors(selectedRating) {
        const stars = document.querySelectorAll('.star svg path');
        const starArea = document.querySelectorAll('.star');
        if (!stars.length) return;
    
        stars.forEach((star, index) => {
            star.style.fill = index < selectedRating ? '#C08C17' : '#DBE1E5';
        });
        starArea.forEach((starearound, index) => {
            index < selectedRating ? starearound.classList.add('activearea') : starearound.classList.remove('activearea');
        });
    }
    
    function validateInput(input) {
        let isValid = true;
    if (input.name === "ReasonForContact") {
    const reasonForContact = document.querySelector('input[name="ReasonForContact"]:checked');
    
    if (!reasonForContact) {
    errorMessages.reason.style.display = 'block';
    tabs.forEach(tab => tab.classList.add('errorTab'));
    isValid = false;
    } else {
    errorMessages.reason.style.display = 'none';
    tabs.forEach(tab => tab.classList.remove('errorTab'));
    
    // Ensure `orderStatus` exists before trying to modify it
    if (reasonForContact.value === "Order Status") {
    
    if (orderStatusContainer) {
        orderStatusContainer.classList.remove('hide');
    }
    
    }
    else{
        orderStatusContainer.classList.add('hide'); 
        emoji.forEach((e)=>{ e.classList.remove('emojiactive')})
        answerEmojiOs.forEach(eos=>eos.checked=false)
    }
    }
    }
    
    if (input.name === "ReceivedOrderStatus") {
    let reasonForContact = document.querySelector('input[name="ReasonForContact"]:checked');
    
    // Ensure `reasonForContact` is selected before checking its value
    if (reasonForContact && reasonForContact.value === "Order Status") {
    const orderStatus = document.querySelector('input[name="ReceivedOrderStatus"]:checked');
    
    if (!orderStatus) {
    errorMessages.orderStatus.style.display = 'block';
    emoji.forEach(emojilike => emojilike.classList.add('errorTab'));
    isValid = false;
    } else {
    errorMessages.orderStatus.style.display = 'none';
    emoji.forEach(emojilike => emojilike.classList.remove('errorTab'));
    }
    }
    }
        if (input.name === "Satisfied") {
            const satisfaction = document.querySelector('input[name="Satisfied"]:checked');
            if (!satisfaction) {
                errorMessages.satisfaction.style.display = 'block';
                isValid = false;
                emojiTwo.forEach(emojilike => emojilike.classList.add('errorTab'));
            } else {
                errorMessages.satisfaction.style.display = 'none';
                emojiTwo.forEach(emojilike => emojilike.classList.remove('errorTab'));
            }
        }
    
        if (input.name === "ExperienceRating") {
            const rating = document.querySelector('input[name="ExperienceRating"]:checked');
            if (!rating) {
                errorMessages.rating.style.display = 'block';
                ratingError?.classList.add('errorTab');
                isValid = false;
            } else {
                errorMessages.rating.style.display = 'none';
                ratingError?.classList.remove('errorTab');
            }
        }
       if( input.name === "TellUsMore"){
        if (feedback.value.trim() === "") {
            errorMessages.feedback.style.display = 'block';
            isValid = false;
        } else {
            errorMessages.feedback.style.display = 'none';
        }
    }
        return isValid;
    }
    
    document.querySelectorAll('.radio, .focus').forEach(input => {
        input.addEventListener('input', (e) => validateInput(e.target));
    });
    
    FormDataInput.addEventListener('submit', function (event) {
    let isFormValid = true;
    let firstErrorElement = null;
    // Validate each input element
    document.querySelectorAll('.radio, .focus').forEach(input => {
    if (!validateInput(input)) {
    isFormValid = false;
    
    // Check if the input has an error class or error message visible
    if (!firstErrorElement && input.closest('.errorTab')) {
        firstErrorElement = input.closest('.errorTab');
    }
    }
    });
    
    if (!isFormValid) {
    event.preventDefault();
    
    // Scroll to the first error element (smoothly)
    if (firstErrorElement) {
    firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    return;  // Prevent form submission
    }
    let selectedReasonForContact = document.querySelector('input[name="ReasonForContact"]:checked');
   let selectedSatisfied = document.querySelector('input[name="Satisfied"]:checked');
   let ReceivedOrderStatus=document.querySelector('input[name="ReceivedOrderStatus"]:checked');
   let ctaChat=document.querySelector('.ctaChat');
    if ( selectedReasonForContact.value === "Billing") {
        thankyoupagev1.classList.add('display');
        sendMKTEvents('GeneralNonInteraction','Billing','TYP - Visible')
    }
    if (selectedSatisfied.value === "No" && selectedReasonForContact.value !== "Billing" &&  selectedReasonForContact.value !== "Order Status" && !ReceivedOrderStatus) {
      
        thankyoupagev2.classList.add('display','genCta');
 
    } 
    if(selectedReasonForContact.value === "Return"){
        ctaChat.setAttribute('href', 'https://gusa.ada.support/chat/?greeting=647f512cedb97bd50ca76a9a');

        ctaChat.addEventListener('click', function () {
            sendMKTEvents('GeneralInteraction','Return', 'CTA - Try Our Chat - Clicked');
        });
        sendMKTEvents('GeneralNonInteraction','Return','TYP - Visible')
        
             }
           
             if(selectedReasonForContact.value === "Cancellation"){
                ctaChat.setAttribute('href','https://gusa.ada.support/chat/?greeting=63f20f3c989594489629a005')
                sendMKTEvents('GeneralNonInteraction','Cancellation','TYP - Visible')
                ctaChat.addEventListener('click', function () {
                    sendMKTEvents('GeneralInteraction','Cancellation', 'CTA - Try Our Chat - Clicked');
                });
               
                     }
                  
                     if(selectedReasonForContact.value === "Prescription"){
                        ctaChat.setAttribute('href','https://gusa.ada.support/chat/?greeting=652d0c706d8aca8244a6addd')
                        sendMKTEvents('GeneralNonInteraction','Prescription','TYP - Visible')
                        ctaChat.addEventListener('click', function () {
                            sendMKTEvents('GeneralInteraction','Prescription', 'CTA - Try Our Chat - Clicked');
                        });
                             }
                          
    if( selectedReasonForContact.value === "Order Status"){
        if(ReceivedOrderStatus.value ==="No" ){
        thankyoupagev2.classList.add('display','osCta');
        sendMKTEvents('GeneralNonInteraction','Order Status','TYP - Visible')
 
        }
        else{
            thankyoupagev1.classList.add('display');
            sendMKTEvents('GeneralNonInteraction','Order Status','TYP - Visible');
        }
    }
   

    document.querySelector('.customerFeedback').innerHTML='';
    if(scrolltop){
   scrolltop.scrollIntoView({inline: "nearest" });
    }
    sendTogSheet(event);  // Proceed with form submission if valid
   
    });
    // Helper function to check if an element has an error (i.e., error message is visible)
    function isErrorVisible(input) {
    const errorElement = document.querySelector(`#${input.name}-error`);
    return errorElement && errorElement.style.display !== 'none';
    }
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz8XckhsRg_bFyio7ZqDwWEdqJPds_ZjS7DNcMaKWJbfFxb-zmHWPVl4zouhGEb4PlI/exec';
    
    function sendTogSheet(event) {
        event.preventDefault();
        const responseBody = new FormData(FormDataInput);
        const TrendBody = responseBody.getAll("TRENDS")?.join(" ") || "";
        responseBody.set('TRENDS', TrendBody);
    
        fetch(scriptURL, {
            method: 'POST',
            body: responseBody
        })
    
        .then(response => response.text())
        .then(data => {
            // alert('Success! Form submitted.');
            FormDataInput.reset();
        })
        .catch(error => alert('Error: ' + error.message));
    }
    

    
    },400)


