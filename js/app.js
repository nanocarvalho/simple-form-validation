const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const errorDivs = [...document.querySelectorAll('.error')]

let messages = []

//kinda works, but the submit is faster than I can be, haha, I need to delay a little to show confirmation, or have a function to do that
form.addEventListener('submit', (event) => {
    //And probably this can have less ifs, I just don't know how
    if (username.value === '' || username.value == null) {
        ifError(username, 'Name is required')
    } else {
        ifSuccess(username)
    }
  
    if (password.value === '') {
        ifError(password, 'Password is required')
    } else {
        ifSuccess(password)
    }
  
    if (password.value !== password2.value) {
        ifError(password, 'Passwords are not equal')
        ifError(password2, 'Passwords are not equal')
    } else {
        ifSuccess(password)
        ifSuccess(password2)
    }

    if(email.value !== '') {
        if (emailTester(email.value)) {  
            ifSuccess(email)
        } else {
            ifError(email, 'Email is wrong')
        }
    }
    
    if (messages.length > 0) {
      event.preventDefault()
    }

  })

function ifSuccess(element) {
    messages.pop()

    const parentActual = element.parentElement
    const errorDivActual = parentActual.querySelector('.error')
    errorDivActual.textContent = ''

    element.parentElement.classList.remove('error')
    element.parentElement.classList.add('success')
}

function ifError(element, message) {
    messages.push(message)
    
    const parentActual = element.parentElement
    const errorDivActual = parentActual.querySelector('.error')
    errorDivActual.textContent = message

    parentActual.classList.add('error')
    parentActual.classList.remove('success')
}


function emailTester(email) {
    //Yes i don't know whats is this either
    //But I followed this one to get the regex https://daily-dev-tips.com/posts/vanilla-javascript-email-validation/
    //And I know that this method is not good, but, for a simple client side validation, will do the job
    const emailTester = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(emailTester.test(String(email).toLowerCase())) {
        return true
    }
    return false
}





