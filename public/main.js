bs_count = 0;
locked   = false;
timer    = false;
e = new Date();
x = 0;
y = 0;
itf = new Audio("img/ITF_10s.mp3");
audio = new Audio("img/button.wav");
itf_play = false;

window.onmousemove = handleMouseMove;
function handleMouseMove(event) {
  event = event || window.event; // IE対応
  x = event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
  y = event.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
}

function getFinishTime(e){
  var datetime = new Date();
  return datetime.setTime(datetime.getTime() + (e * 1000));
}
function countDown() {
  var startTime = new Date();
  var endTime   = new Date(e);
  var diff  = endTime - startTime;
  var times = 24 * 60 * 60 * 1000;
  var day   = Math.floor(diff / times);
  var hour  = Math.floor(diff % times / (60 * 60 * 1000));
  var min   = Math.floor(diff % times / (60 * 1000)) % 60;
  var sec   = Math.floor(diff % times / 1000) % 60 % 60;
  var ms    = Math.floor(diff % times / 10) % 100;
  if(diff > 0){
    $("#timer").text(sec+'.'+ms);
    setTimeout('countDown()', 10);
  } else {
    $("#timer").text('END!!');
    $("#wrapper").hide();
    $("#timer").hide();
    $("#score").show();
    $("#score_show").html(bs_count);
    $("#poyo").show();
    $("#okuru").show();
    $("#nosend").show();
    $("#tweet-button").show();
    $("#tweeter").show();
    $("#tweet-button").attr("href", "http://twitter.com/share?url=http://ganoff.tk/&text=私は" + bs_count + "杯のビーフストロガノフで筑波大学を制圧しました！ ビーフストロガノフは松美池前、春日ビーフストロガノフ！&via=beefstr_kasuga");
    document.querySelector('#okuru').addEventListener('click', function() {
      $.ajax({
        url: '/register',
        method: 'post',
        data: {name: $("#poyo").val(), score: bs_count}
      }).always(function() {
        $("#score").hide();
        $("#pmannet").show();
      });
    });
    document.querySelector('#nosend').addEventListener('click', function() {
      $("#score").hide();
      $("#pmannet").show();
    });

  }
}

show_bs = function() {
  if (timer == false) {
    e = getFinishTime(10);
    countDown();
    timer = true;
    if (itf_play == false) { itf.play(); }
  }
  audio.play();
  div = document.createElement('div');
  $(div).addClass("bs").appendTo("#bs_container").hide().css("top", y - 50).css("left", x - 100);
  $(div).animate({height: 'show'}, 'fast');
  bs_count++;
}

$(document).ready(function(){
  var bs_count = 0;

  document.querySelector('#wrapper').addEventListener('click', function() {
    setTimeout(show_bs(), 10);
    return false;
  });

  document.querySelector('#start').addEventListener('click', function() {
    $('#start').hide();
    $('#timer').show();
    $('#wrapper').show();
  });

});
