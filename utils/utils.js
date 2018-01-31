import { setTimeout } from "timers";

export function validateAppLogin(username, password) {
    return new Promise((resolve, reject) => {
        const validLogin = true;


        // make the request to firebase for the app credentials
        // check if credentials are equal
        // ----
        // look into using firebase functions to do this validation
        // on the "backend" vs the react app
        resolve(validLogin)

        // reject('Incorrect credentials.')
    })
}

function validateRaffleEntry(username, password) {
    return new Promise((resolve, reject) => {
        // make the request to firebase for a user's credentials
        // check if credentials are equal
        // then resolve the ticket UUID: _id

        resolve('SOME-TICEKT-ID')
    })
}

function incrementTicketCount(ticketID) {
    return new Promise((resolve, reject) => {
        // update the ticketCount for the ticketID
        resolve()
    })
}

export function handleRaffleEntry(username, password) {
    return validateRaffleEntry(username, password)
        .then(ticketID => incrementTicketCount(ticketID))
}
