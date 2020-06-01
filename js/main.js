function renderPortCards() {
    var cards = getPortCards()
    var cardsContainer = $('.port-container')
    cards.forEach(card => {
        $('.port-container').append(`
        <div class="col-md-4 col-sm-6 portfolio-item">
         <a class="portfolio-link" data-toggle="modal" onclick= setModal('${card.id}') href="#portfolioModal1">
         <div class="portfolio-hover">
         <div class="portfolio-hover-content">
         <i class="fa fa-plus fa-3x"></i>
         </div>
         </div>
         <img class="img-fluid" height="300" src="img/portfolio/${card.id}-thumbnail.png" alt="">
         </a>
         <div class="portfolio-caption">
         <h4>${card.name}</h4>
         <p class="text-muted">${card.title}</p>
         </div>
         </div> `)

    })
}



function setModal(sentCardId) {
    // debugger
    var cardToDisplay = getPortCard(sentCardId)

    $('.modal-body').html(`
    <h2>${cardToDisplay.name}</h2>
<p class="item-intro text-muted">${cardToDisplay.title}</p>
<img class="img-fluid d-block mx-auto" src="img/portfolio/${cardToDisplay.id}-full.png" alt="">
<p>${cardToDisplay.desc}</p>
    <ul class="list-inline"> 
    <li>Date: ${cardToDisplay.publishedAt}</li>
    <li>Label: ${cardToDisplay.labels}</li>
    </ul>
    <a class="btn btn-primary" target="_blank" href='projs/${cardToDisplay.id}/index.html'> Run </a>
     
<button class="btn btn-primary" data-dismiss="modal" type="button"> Exit </button>
`)
}
//
function setButton() {
    var subject = $('input').val()
    var body = $('textarea').val()
    $('.mail-button').attr('href', `https://mail.google.com/mail/?view=cm&fs=1&to=yashabazovner@gmail.com&su=${subject}&body=${body}`)
}