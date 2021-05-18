const brian = document.getElementById('brian');
const ant_up = document.getElementById('ant_up');
const tokyo_drift = document.getElementById('tokyo_drift');
const trap_beat = document.getElementById('trap_beat');
const panels = document.querySelectorAll(".panel");
const main_slide = document.getElementById('main_slide');
const black_curtain = document.getElementById('black-curtain');
let curtain_info
const web_video = document.getElementById('web-video');
let button_active = true
async function panelOpen(event){
    if(button_active){
        button_active = false;
        curtain_info = document.getElementById('curtain_info');
        if(event.target.getAttribute('class') == 'panel'){
            writeCurtainInfo(event.target.getAttribute('title'),event.target.getAttribute('sentence'))
            black_curtain.classList.add('sliding');
            if(event.target.getAttribute(filename='file').indexOf('http') == -1){
                loadLyric(event.target.getAttribute(filename='file'),"local");
            }
            else{
                loadLyric(event.target.getAttribute('file'));
            }
            
            main_slide.classList.add('none');
            setTimeout(()=>{
                web_video.classList.add('invanish');
                
            },1000)
            //window.addEventListener('keydown', serCurtainOpener, false);
        }
    }
}
function writeCurtainInfo(title,sentence){
    let cur_title = document.createElement('div')
    let cur_sentence = document.createElement('div')
    cur_title.classList.add('curtain-title')
    cur_sentence.classList.add('curtain-sentence')
    cur_title.insertAdjacentText('afterbegin',title)
    cur_sentence.insertAdjacentText('afterbegin',sentence)
    curtain_info.insertAdjacentElement('beforeend',cur_title)
    curtain_info.insertAdjacentElement('beforeend',cur_sentence)
}

function serCurtainOpener(){
    console.log('Curtain Open');
    window.removeEventListener('keydown',serCurtainOpener,false);
}

panels.forEach(element =>{
    element.addEventListener('click',panelOpen,false);
});

function rhymeEndListner(){
    console.log('rhyme end catch')
    //titleの情報削除
    let clone = curtain_info.cloneNode( false );
    curtain_info.parentNode.replaceChild( clone , curtain_info );
    
    black_curtain.classList.add('end');
    setTimeout(()=>{
        black_curtain.classList.remove('end');
        black_curtain.classList.remove('sliding');
        main_slide.classList.remove('none');
    },2100)
    web_video.classList.remove('invanish');
    button_active = true
    
}