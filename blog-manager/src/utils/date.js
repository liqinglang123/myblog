// getYMDHMS (timestamp) {
//     let time = new Date(timestamp)
//     let year = time.getFullYear()
//     let month = time.getMonth() + 1
//     let date = time.getDate()
//     let hours = time.getHours()
//     let minute = time.getMinutes()
//     let second = time.getSeconds()

//     if (month < 10) { month = '0' + month }
//     if (date < 10) { date = '0' + date }
//     if (hours < 10) { hours = '0' + hours }
//     if (minute < 10) { minute = '0' + minute }
//     if (second < 10) { second = '0' + second }
//     return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
//   }

// 使用es6的padStart()方法来补0
const getYMDHMS = function (timestamp) {
    let time = new Date(timestamp)
    let year = time.getFullYear()
    const month = (time.getMonth() + 1).toString().padStart(2, '0')
    const date = (time.getDate()).toString().padStart(2, '0')
    const hours = (time.getHours()).toString().padStart(2, '0')
    const minute = (time.getMinutes()).toString().padStart(2, '0')
    const second = (time.getSeconds()).toString().padStart(2, '0')

    return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
}

// 使用es6的padStart()方法来补0
const getYMD = function (timestamp) {
    let time = new Date(timestamp)
    let year = time.getFullYear()
    const month = (time.getMonth() + 1).toString().padStart(2, '0')
    const date = (time.getDate()).toString().padStart(2, '0')
    return year + '-' + month + '-' + date
}

export {
    getYMDHMS,
    getYMD
}

// let str = "2021-06-18T06:38:03.609Z"

// console.log(new Date(str))
// console.log(getYMDHMS(str))


