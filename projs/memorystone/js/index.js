var Ding = new Audio('sound/Ding.wav');
/*var password=prompt('Enter Password');
if (password!=18) {

    alert('Wrong password'); 
    

} 
else {
   alert('Welcome')
    Ding.play();
    
}
*/
function toggle_visibility(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'block')
       e.style.display = 'none';
    else

    
       e.style.display = 'block';
 }

 function showReplay(id){
    var e = document.getElementById(id);
    if(e.style.display == 'none')
    e.style.display = 'block';
 else

 
    e.style.display = 'block';
}

 
    