$(function(){
  $slideshow = $(".gallery ul");
  $slideactive = $slideshow.find("li.each").first().addClass('active').show();
  $(".direction .next").click(function(){
  $slideactive = $slideshow.find("li.active").next();
    if(!$slideactive.length)
      $slideactive = $slideshow.find("li.each").first();   
      $slideshow.find("li.active").removeClass("active");
      $slideactive.addClass("active");
  });
});