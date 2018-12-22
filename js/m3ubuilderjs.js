/* ************************************ */
/*             experiment               */
/*      m3u builder with javascript     */
/* Dirk.L.Nicolaas - Manado - Indonesia */
/* ************************************ */
var result;
var countIndex = 0;
var m3uList = "#EXTM3U";
m3uList += "\n";
var file=[];
var songs = [];
function getFileName(fromFile){
  var fname = fromFile
  fname.indexOf('\\')?fname = fname.split('\\'):(fname.indexOf('/')?fname.split('/'):fname);
  fname = fname[fname.length-1];
  return fname
}
/*
function getFileName2(fromFile){
  // other method to getFilename
  var fname = fromFile;
  var chars = unescape("%5C");
  while(fname.indexOf(chars) != -1) {
    var pos = fname.indexOf(chars);
    fname = fname.substring(pos + 1, fname.length);
  }
  return fname
}
*/

function generateFileList() {
  var filex = document.getElementById("file");
  var files = filex.files;
  for(var i = 0;i < files.length; i++){
    countIndex = i;
    file[i] = files[i].name;
    
    if(file[i] == "") {
      document.getElementById("alert").textContent = "Enter a file name or click BROWSE";
    }
    else {
      document.getElementById("alert").textContent = "";
      var fname = getFileName(file[i]);
      console.log(fname);
      if((fname.indexOf('.mp3') == -1)) {
        document.getElementById("alert").textContent = "only for mp3";
      }
      else {
        document.getElementById("alert").textContent = "";
        songs[countIndex] = file[i];
        //console.log(URL.createObjectURL(files[i]));
        document.getElementById("Select")[countIndex] = new Option((countIndex+1) + ": " + fname, file[i], false, true);
        countIndex++;
      }
    }
  }
}

function buildM3U() {
  if(countIndex == 0) {
    document.getElementById("alert").textContent="Add some songs to the list!";
  }
  else {
    document.getElementById("alert").textContent="";
    for(var i = 0; i < songs.length; i++) {
      if(songs[i] != "") {
        // len actualy is audio.duration
        // alternative for fill -1 or file.length
        // this only experiment.
        var len = songs[i].length;
        var s;
        songs[i].indexOf('\\')?s = songs[i].split('\\'):s = songs[i].split('/');
        //////////////////////////////////////////////////
        //  ?? i do not understand, why is 'undefined' apeared
        //////////////////////////////////////////////////
        s = s[s.length-1].replace('.mp3').trim();
        if(s.indexOf("-")==true){
          s = s.split("-");
          var artist = s[0].replace('undefined',"");
          var title = s[s.length-1].replace('undefined',"");
          var extinf = '#EXTINF: '+len+', '+ artist + "-" + title;
        }
        else{
          var artist = s.replace('undefined',"");
          var extinf = '#EXTINF: '+len+', '+ artist;
        }
        m3uList += extinf;
        m3uList += "\n";
        //'c:\fakepath\' - manually changed for actual absolute or relative path
        m3uList += "c:\\fakepath\\";
        m3uList +=  songs[i];
        m3uList += "\n"
      }
    }
    result = m3uList;
  }
}

function SaveFile(sContentToSave, sFileNameToSave) {
  var blob = new Blob([sContentToSave]);
  var a = document.createElement('a');
  a.download = sFileNameToSave;
  document.body.appendChild(a);
  a.href = URL.createObjectURL(blob);
  a.click();
  a.remove();
}
document.addEventListener('DOMContentLoaded', function (e) {
  document.querySelector('#save').addEventListener('click', function (e) {
    buildM3U();
    SaveFile(result,'test.m3u')
    console.log(result);
  },false)
},false);
function refresh(){
  var meta=document.createElement("meta");
  meta.setAttribute("http-equiv","refresh");
  meta.setAttribute("content","0;URL=index.html");
  document.head.appendChild(meta)
};
////Pengisi ruang kosong saja
var textStr=['Masa depan adalah milik mereka yang menyiapkan hari ini\n','Bila gagal, ya coba lagi!,Sampai kapan?,Sampai sukses!\n','Orang bijak menemukan kebijaksanaannya melalui kerasnya kehidupan\n','Kegagalan adalah sebuah proses menuju kesuksesan\n','Percaya diri adalah rahasia pertama dari sukses\n','Kata-katamu adalah kualitas dirimu\n','Only I can change my life. No one can do it for me. -- Carol Burnett\n','Suatu hal yang sia – sia jika menyesali masa lalu, sebaiknya sesalilah apa yang tak akan mampu kamu lakukan di masa depan\n','Agar masa depanmu lebih baik maka berusahalah mulai dari sekarang\n','Jangan pernah berhenti ketika kamu masih belum ingin menyerah\n','Terkadang diam adalah suatu pilihan yang tepat, ketika pembicaraan hanya akan membuat suasana menjadi sangat kacau\n','Kebahagiaan itu ada, jika kamu mau menjemputnya\n','Jika bisa menjadi sukses sewaktu muda, kenapa harus menunggu usia tua?\n','Jangan bosan menjadi orang baik dan terus berbuat baiklah pada sesama\n'];
document.write('<center><font color=gold size=+2><b>' + '<div id="txtRot" style="position:relative;">Masa depan adalah milik mereka yang menyiapkan hari ini</div>' +'</b></font></center>');
temp = 'txtRot.innerHTML = textStr[i++];'||'document.getElementById("txtRot").firstChild.nodeValue = textStr[i++];';
var i = 0;
function rText() {
  eval(temp);
  if (i == textStr.length) i = 0;
  setTimeout("rText()", 8000);
}
window.onload = rText;

