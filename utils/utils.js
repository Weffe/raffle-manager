import { setTimeout } from "timers";
import axios from 'axios'

export const firebaseFuncions = axios.create({
    baseURL: 'https://us-central1-club-raffle-manager.cloudfunctions.net',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})

export function transformObjectToList(obj) {
    const list = [];

    if (obj) {
        Object.entries(obj).forEach(([key, val]) => {
            list.push(val)
        });
    }

    return list
}

export function getRandomRaffleWinner() {
    return firebaseFuncions.get('/getRandomRaffleWinner')
}

export function getUsersForDashboard() {
    return firebaseFuncions.get('/getUsersForDashboard')
}

export function handleAdminLogin(username, password) {
    return firebaseFuncions.post('/handleAdminLogin', { username, password })
}

export function handleDashboardLogin(username, password) {
    return firebaseFuncions.post('/handleDashboardLogin', { username, password })
}

export function handleRaffleEntry(username, password) {
    return firebaseFuncions.post('/handleRaffleEntry', { username, password })
}

export function createAccount(firstName, lastName, username, password) {
    return firebaseFuncions.post('/createAccount', { firstName, lastName, username, password })
}

export function resetPassword(firstName, lastName, username, password) {
    return firebaseFuncions.post('/resetPassword', { firstName, lastName, username, password })
}

export function resetUsername(firstName, lastName, username, password) {
    return firebaseFuncions.post('/resetUsername', { firstName, lastName, username, password })
}

export function confirmRaffleWinners(raffleWinnerIDs) {
    return firebaseFuncions.post('/confirmRaffleWinners', { raffleWinnerIDs })
}

export function resetAllUserTickets() {
    return firebaseFuncions.get('/resetAllUserTickets')
}