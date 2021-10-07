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

const dateStr = function(date){
    // 获取时间戳
    date = new Date(date).getTime()
    //获取js 时间戳
    var time=new Date().getTime();
    //去掉 js 时间戳后三位，与php 时间戳保持一致
    time=parseInt((time-date)/1000);
    //存储转换值 
    var s;
    if(time<60*10){//十分钟内
        return '刚刚';
    }else if((time<60*60)&&(time>=60*10)){
        //超过十分钟少于1小时
        s = Math.floor(time/60);
        return  s+"分钟前";
    }else if((time<60*60*24)&&(time>=60*60)){ 
        //超过1小时少于24小时
        s = Math.floor(time/60/60);
        return  s+"小时前";
    }else if((time<60*60*24*30)&&(time>=60*60*24)){ 
        //超过1天少于30天内
        s = Math.floor(time/60/60/24);
        return s+"天前";
    }else{ 
        //超过30天ddd
        date= new Date(parseInt(date));
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    }
}

export {
    getYMDHMS,
    getYMD,
    dateStr
}

// let str = "2021-06-18T06:38:03.609Z"

// console.log(new Date(str))
// console.log(getYMDHMS(str))


