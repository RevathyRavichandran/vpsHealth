/**main menu active**/

$(document).ready(function() { 
  $(".nav-link.collapsed").click(function () { 
   $(".nav-link.collapsed").removeClass("active_class"); 
   // $(".tab").addClass("active"); // instead of this do the below $(this).addClass("active"); }); })
    $(this).addClass("active_class"); 
});
});


/**Sub menu active**/
$(".collapse-item").on("click", function(){
   $(".collapse-item").removeClass("active");
   $(this).addClass("active");
});







/***custom dropdown***/

        // document.querySelector('.custom-select-wrapper').addEventListener('click', function () {
//     this.querySelector('.custom-select').classList.toggle('open');
// })

for (const dropdown of document.querySelectorAll(".custom-select-wrapper")) {
    dropdown.addEventListener('click', function () {
        this.querySelector('.custom-select').classList.toggle('open');
    })
}

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
        }
    })
}

// window.addEventListener('click', function (e) {
//     const select = document.querySelector('.custom-select')
//     if (!select.contains(e.target)) {
//         select.classList.remove('open');
//     }
// });

window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll('.custom-select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
});







 


 $('.checkround').on("click", function() {

  var $t = $(this);
    if ($t.is(':checked')) {
      $t.parent().addClass("greenText");
    } else {
      $t.parent().removeClass("greenText");
    }

});

$(function() {
  var href = window.location.href;
  $('.py-2.collapse-inner.rounded a').each(function(e,i) {
    if (href.indexOf($(this).attr('href')) >= 0) {
      $(this).addClass('active');
    }
  });
});





