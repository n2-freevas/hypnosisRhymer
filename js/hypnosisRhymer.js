var lyricJSON
var lyricStatic = []
var view_zone = document.getElementById('view-zone')

window.addEventListener('keydown',event =>{
    console.log(event.code)
})

async function inportLyric_local(){
    new Promise((resolve,reject) => {
        lyricJSON = n2f_introduce
        console.log(lyricJSON)
        console.log(lyricJSON.lyric)
        
        for(var i=0; i<lyricJSON.lyric.length;i++){
            lyr = lyricJSON.lyric[i]
            var frame = generateRhymeFrame(lyr)
            console.log(frame)
            view_zone.insertAdjacentElement('beforeend',frame)
            lyricStatic.push(frame)
        }
        resolve();
    })
}

function generateRhymeFrame(lyr){
    var frame = document.createElement('div')
    frame.classList.add('frame')
    
    var rhyme = lyr.rhyme;
    var action = lyr.action;
    var color = lyr.color;
    var position = lyr.position;
    var animation = null
    if(lyr.animation != undefined){
        animation = lyr.animation
    }

    for(var i=0; i < rhyme.length; i++){
        var rhy = document.createElement('div')
        rhy.classList.add(position[i])
        for(var j=0; j < rhyme[i].length; j++){
            var str = document.createElement('div')
            str.classList.add(action[i][j])
            if(color != "n"){str.classList.add(color[i][j])}
            str.insertAdjacentText('beforeend',rhyme[i][j])
            rhy.insertAdjacentElement('beforeend',str)
        }
        console.log(rhy)
        frame.insertAdjacentElement('beforeend',rhy)
    }
    return frame
}


async function initialize(){
    await inportLyric_local()
    console.log('init end')
}

initialize()
