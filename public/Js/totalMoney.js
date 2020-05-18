var table = document.getElementById('table');
var x = Array.from(document.getElementsByClassName("checkbox"));
var total = Array.from(document.getElementsByClassName("total"));
var totalArray = [];
for (var i of total) {
  totalArray.push(parseInt(i.innerHTML));
}
console.log(totalArray);
table.addEventListener('change', hi);
var count = 0;
var arr = [];
function hi() {
  var money = 0;
  for (var i = 0; i < x.length; i++) {
    if (x[i].checked) {
      if (arr.indexOf(i) == -1) {
        arr.push(i);
      }
      count++;
    }
    if (!x[i].checked) {
      console.log('no check + ', i);
      if (arr.indexOf(i) !== -1) {
        arr.splice(arr.indexOf(i), 1);
      }
    }
  }
  count = 0;
  console.log(arr);
  for (var i of arr) {
    money += totalArray[i];
  }
  console.log(money);
  document.getElementById('total').innerHTML = money;
  money = 0
}