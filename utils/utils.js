import { setTimeout } from "timers";
import axios from 'axios'

export const firebaseFuncions = axios.create({
    baseURL: 'https://us-central1-raffle-manager.cloudfunctions.net',
    // baseURL: ' http://localhost:5000/raffle-manager/us-central1',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})

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
    return firebaseFuncions.post('/handleRaffleEntry', { username, password })
}

export function transformTicketsToList(tickets) {
    const list = [];

    Object.entries(tickets).forEach(([key, val]) => {
        list.push(val)
    });

    return list
}