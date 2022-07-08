const iconOf = document.querySelector('.iconOf');
const barOf = document.querySelector('.barOf');


iconOf.addEventListener('click', () => {
  barOf.classList.toggle('hidden');
})
window.addEventListener('keypress',(e) => {
  if(e.key == 'Enter'){
    main(barOf.querySelector('input').value);
  }
})

function main(search){
 barOf.classList.add('hidden');
 barOf.querySelector('input').value =''
  _setLoader._showLoader(0)
  getData(search, (res) => {
  _setLoader._showLoader(80);
  _dataCard.innerHTML = '';
  res.forEach(item => {
    getchannelIcon(item);
  })
  setTimeout(() => {
    _setLoader._showLoader(100);
  },1500)
})

}
