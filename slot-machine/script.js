/* using nextSibling instead of nextElementSibling may return empty element
 * that empty represents the space between elements
 * eg.
 * <li>Hi</li>  // the empty white space
 * <li>Bye</li>
 */

/* document.documentElement returns the html element
 * css variables created using var() can be changed using document.documentElement.style.setProperty()
 */

// .onchange represents a change in value event, like other events, we can access the event object as parameter

let values = document.getElementsByClassName('value')
let total = document.getElementById('total')
let inpBid = document.getElementById('inpBid')
let start = document.getElementById('start')
let stop = document.getElementById('stop')
let stopped = true

let arr = ['😭', '🤑', '😜', '🥰', '🥵', '🥶'];
let winFactor = 5
let initial = 5000
let refresh = 100
let bidVal = null

total.textContent = initial.toString()
for (let value of values) {
    value.style.animationDuration = refresh + 'ms'
    value.style.animationDelay = (refresh / 2) + 'ms'
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

setInterval(function () {
    if (!stopped) {
        for (let value of values) {
            value.textContent = arr[getRandomInt(arr.length)]
        }
    }
}, refresh)

// if a new set interval must be created in place of old one, the previous on must be cleared

start.onclick = function () {
    let moneyVal = Number(total.textContent)
    let bid = Number(inpBid.value)
    if (bid === 0) {
        alert('Bid must be greater than 0!')
    } else if (isNaN(bid)) {
        alert('Enter a bid amount!')
    } else {
        if (moneyVal >= bid) {
            if (stopped) {
                stopped = false
                total.textContent = (moneyVal - bid).toString()
                bidVal = bid
                for (let value of values) {
                    value.style.animationPlayState = 'running'
                }
            } else {
                alert('Stop first!')
            }
        } else {
            alert('You dont have enough balance!')
        }
    }
}

stop.onclick = function () {
    if (!stopped) {
        stopped = true
        let same = true
        for (let value of values) {
            value.style.animationPlayState = 'paused'
            value.parentNode.replaceChild(value.cloneNode(true), value)
            if (value.textContent !== values[0].textContent) {
                same = false
            }
        }
        setTimeout(function () {
            if (same) {
                alert('You won!')
                total.textContent = (Number(total.textContent) + bidVal * winFactor).toString()
            } else {
                alert('You lost!')
            }
        }, refresh)
    } else {
        alert('Run first!')
    }
}

