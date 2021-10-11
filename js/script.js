const schemeSvg = document.querySelector('.scheme-svg');
const totalPriceTag = document.querySelector('.price-total')
let cost = 800;
let totalPrice = 0;
schemeSvg.addEventListener('click',(event) => {
  if (!event.target.classList.contains('booked')) {
    event.target.classList.toggle('active');
    let totalSeats = schemeSvg.querySelectorAll(".active").length
    totalPrice = totalSeats * cost;
    totalPriceTag.textContent = totalPrice;
    // console.log(schemeSvg.querySelectorAll(".active").length)
  }
})