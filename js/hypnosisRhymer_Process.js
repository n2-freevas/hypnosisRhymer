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
