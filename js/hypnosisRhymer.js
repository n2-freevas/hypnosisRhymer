let lyricJSON = null
let lyricStatic = []
let AnimaStatic = []
let bpm = 0
let indexer = {frame: 0, rhymes: 0, rhy: 0};
let MAX_Index = {frame: 0}
let isDOMLoaded = false;
let nowFrame = null;

let view_zone = null;

window.addEventListener('DOMContentLoaded',function(){
    isDOMLoaded = true
},false)
async function waitDOMLoaded(){
    return new Promise(resolve => {
        // is DOMLoaded Complete?
        let rep = setInterval(function(){
            if(isDOMLoaded){
                clearTimeout(rep)
                resolve('[Promiss] DOM is Loaded')
            }
        },500)
    });
}

async function importLyric(filename,locate){
    return new Promise((resolve,reject) => {
        initialize_elemet()
        if(locate == 'local'){
            if(lyric == undefined){console.error("lyricsファイルにlyric.jsonを作成してください。")}
            else{lyricJSON = lyric;}
        }
        else{
            fetch(filename)
                .then(response => response.json())
                .then(data => lyricJSON = data);
        }   
        console.log(lyricJSON)
        console.log("lyrical Statue is > ",lyricJSON.lyric)
        bpm = lyricJSON.bpm
        MAX_Index['frame'] = lyricJSON.lyric.length
        for(let i=0; i<lyricJSON.lyric.length;i++){
            console.log(lyricJSON.lyric[i])
            generateRhymeFrame(lyricJSON.lyric[i]).then(function(result){
                console.log(result["frame_div"], result["animation_info"]);
                result["frame_div"].classList.add('none');
                lyricStatic.push(result["frame_div"]);
                AnimaStatic.push(result["animation_info"]);
                view_zone.insertAdjacentElement('beforeend',result["frame_div"]);
            });
        }
        resolve("[Promiss] Success lyric setting");
    });
}

async function generateRhymeFrame(lyr){
    return new Promise((resolve,reject) => {
        let frame = document.createElement('div')
        frame.classList.add('frame');
        
        let rhyme = lyr.rhyme;
        let action = lyr.action;
        let position = lyr.position;

        let color,anime,size,font = null;
        if(lyr.color != undefined || typeof(lyr.coder) != 'object'){color = lyr.color;}
        if(lyr.size != undefined || typeof(lyr.size) != 'object'){size = lyr.size;}
        if(lyr.font != undefined || typeof(lyr.font) != 'object'){font = lyr.font;}
        if(lyr.animation != undefined){ anime = lyr.animation;}

        console.log(rhyme, action, position, color, size, font, anime)
        for(let i=0; i < rhyme.length; i++){
            let rhymes_div = document.createElement('div');
            rhymes_div.classList.add('rhymes');
            if(typeof(position[i]) == 'string'){
                pos = position[i].split(' ')
                for(let j=0; j<pos.length;j++){ rhymes_div.classList.add(pos[j])}}
            
            
            for(let j=0; j < rhyme[i].length; j++){
                let r_div = document.createElement('div')
                r_div.classList.add('rhy')
                
                r_div.classList.add('a-'+action[i][j])
                if(size != null){
                    if(typeof(size[i][j]) == 'string'){r_div.classList.add('s-'+size[i][j])}}
                if(color != null){
                    if(typeof(color[i][j]) == 'string'){r_div.classList.add('c-'+color[i][j])}}
                if(font != null){
                    if(typeof(font[i][j]) == 'string'){
                        ft = font[i][j].split(' ')
                        for(let k=0; k<ft.length;k++){r_div.classList.add('f-'+ft[k])}}}
                r_div = rhyPartGenerate(r_div, rhyme[i][j])
                rhymes_div.insertAdjacentElement('beforeend',r_div);
            }
            frame.insertAdjacentElement('beforeend',rhymes_div)
        }
        resolve({"frame_div": frame, "animation_info": anime})
    });
}

function rhyPartGenerate(r_div,string){
    classes = r_div.classList
    if(classes.contains('a-rolls')||classes.contains('a-pops')){
        for(let i=0; i<string.length;i++){
            if(string[i] == ' '){r_div.insertAdjacentHTML('beforeend',"<span>"+"&nbsp;"+"</span>")}
            else{r_div.insertAdjacentHTML('beforeend',"<span>"+string[i]+"</span>")}
        }
    }
    else if(classes.contains('a-slide')){
        r_div.insertAdjacentHTML('beforeend',"<span>"+string+"</span>")
    }
    else{r_div.insertAdjacentText('beforeend',string)}
    return r_div;
}

async function initialize_elemet(){
    return new Promise((resolve,reject) => {
        view_zone = document.getElementById('view-zone')
        console.log(view_zone)
        resolve("[Promiss] initialization end");
    });
}

async function rhymeInitialize(){
    return new Promise((resolve,reject) => {
        nowFrame = lyricStatic[0]
        lyricStatic[0].classList.remove('none')
        if (lyricStatic[1] != undefined){
            lyricStatic[1].classList.remove('none')
        }
        resolve("[Promiss] all rhymes waiting for you Flow!");
    });
}

function rhymeEndProcess(){
    let clone = view_zone.cloneNode( false );
    view_zone.parentNode.replaceChild( clone , view_zone );
    if(typeof rhymeEndListner == 'function'){
        console.log('Listen to <<rhyme process end>>')
        rhymeEndListner();
    }
}

let refresh = false;


function RhymeStepEvent(event){
    if(event.code == 'Enter'){
        result = nextRhyme()
        if(result == 'tune-end'){
            this.removeEventListener('keydown',RhymeStepEvent,false)
            console.log("TUNE END",event)
            rhymeEndProcess() //to hypnosisRhymer function
        }
    }
}


/* Processer */
function nextRhyme(){
    if(refresh){
        //view_zone.removeChild(view_zone.lastChild)
        lyricStatic[indexer['frame']].classList.add('none')
        if(lyricStatic[indexer['frame']+1] == undefined){
            return 'tune-end'
        }
        lyricStatic[indexer['frame']+1].classList.remove('none')
        if (lyricStatic[indexer['frame']+2] != undefined){
            lyricStatic[indexer['frame']+2].classList.remove('none')
        }
        lyricStatic[indexer['frame']+1].classList.remove('none')
        
        indexer['frame'] += 1
        nowFrame = lyricStatic[indexer['frame']]
        refresh = false
    }
    
    console.log(indexer)
    let rhymes_list = nowFrame.childNodes
    console.log(rhymes_list)
    let target_rhymes = rhymes_list[indexer['rhymes']]
    console.log(target_rhymes)
    let target_rhy = target_rhymes.childNodes[indexer['rhy']]
    console.log(target_rhy)
    target_rhy.classList.add('act');
    if (target_rhymes.childNodes[indexer['rhy'] + 1] == undefined){
        console.log('rhy end')
        indexer['rhy'] = 0
        if (nowFrame.childNodes[indexer['rhymes'] + 1] == undefined){
            console.log('rhymes end')
            indexer['rhymes'] = 0
            refresh = true
            //view_zone.insertAdjacentElement('beforeend',nowFrame)
        }
        else{indexer['rhymes'] += 1}

    }
    else{indexer['rhy'] += 1}
    return 'tune-continue'
}

function setRhyneStepListner(){
    window.addEventListener('keydown', RhymeStepEvent, false)
}


async function sequence(){
    console.log('sequence launch')
    console.log(await waitDOMLoaded())
    console.log(await initialize_elemet())
}
async function loadLyric(filename,locate){
    console.log(await importLyric(filename,locate))
    console.log(await rhymeInitialize())
    setRhyneStepListner()
}
sequence()