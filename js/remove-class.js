 $(document).resize(function () {
     var screen = $(window);  

     if (screen.width > 414) {
         $('mobile-one').removeClass('mobile-one');
     } else {
         $('product-info-hide').removeClass('product-info-hide');
     }