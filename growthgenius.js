var versionNumber = { version: 12 } // to reset file cache forefully on prod. Updated with shell script.

// // For reference, load in SquareSpace directly

// <script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
// <script src="https://sirbdon.github.io/moment/moment-copy.js"></script>
// <script src="https://sirbdon.github.io/moment-timezone/moment-timezone-copy.js"></script>
// <meta name="google-site-verification" content="U3VF9tek-GQipZb5m5ZbKz0Pgx4sdgwwKLIeD-yy0go" />
// <meta name="google-site-verification" content="U3VF9tek-GQipZb5m5ZbKz0Pgx4sdgwwKLIeD-yy0go" />

// <!-- Mixpanel Analytics -->
// <script type="text/javascript">
//   !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
//   analytics.load("7Kai3BXMZfeLnoUTZwHB2vF2lGLogXF6");
//   analytics.page()
//   }}();
// </script>



$(document).ready(function() {


// ======= HELPER FUNCTIONS: =======

  // Check if current device is phone by checking css properties that exist only if @media screen width is for phone
  var isPhoneX = function() {
    return ($('div.or-call').css('display') === "block" && $('div.site-phone').css('display') === "block");
  }

  // Fade out phone number info when on small phone screen 
  var whiteOnPhone = function() {
    var opacity1 = Boolean( $('div.or-call').css('opacity') === "1"),
        opacity2 = Boolean( $('div.site-phone').css('opacity') === "1"),
        isPhone = isPhoneX();
        console.log("whitephone vars (3x):" + " " + isPhone + " " + opacity1 + " " + opacity2);  
    if ( isPhone && opacity1 && opacity2 ) {
      console.log("set opacity to 0");
      $('div.or-call, div.site-phone').animate( { opacity: "0" }, 400 );
    } 

    if ( isPhone && !opacity1 && !opacity2 ) {
      console.log("set opacity to 1");
      $('div.or-call, div.site-phone').animate( { opacity: "1" }, 400 );
    }
  }

  // Window location helpers -------------
  var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
  };
  
    // filter out undefined "a" element helper for below
  var filterArrayU = function(x) { return x !== "undefined"; } 

    // Returns current path as string, returns root as ""
  var currentPathX = function() {
    var fullPath = getLocation().pathname;
    var pathArray = fullPath.split("/");
    pathArray.shift(); // remove empty first array element
    var filteredArray = pathArray.filter(filterArrayU);
    var userPath = filteredArray.join("/");
    return userPath;
  }

  // Reset form (hide / show appropriate elements, reset values .reset(), etc)
  var contactReset = function() {
    console.log("contact reset $this:"); console.log($(this));
    $('.thank-you').fadeOut('fast')
    $('.thank-you').remove()
    $(this).find('.none1, .none0').hide() // $this refers to $('form') that envoked it.
    $(this)[0].reset() // reset this form. Need [0] so data is sent to 'reset' in proper format.
    ( !$(this).hasClass('form-style-lower') ) ? $(this).find('input[name="message"]').eq(0).prop('style').width =  "20%" : return false; // only apply width styling to navbar form
    $(this).find('input[name="message"]').prop('placeholder', 'Type here...')
    $(this).find('input').prop('required', false)
    $(this).fadeIn('fast')
    $(this).find('.some0').fadeIn('fast')
    whiteOnPhone()
    console.log('form RESET')
  }

  // Date helpers
  var thisMoment = function() { 
    return moment().tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm:ss a (zz)'); 
  }

  
  var sendForm = function(formData) {
    $.ajax({
      url: "https://formspree.io/" + e + m + a + i + l + z, // "https://formspree.io/" + e + m + a + i + l + z,
      method: "POST",
      data: formData,
      dataType: "json",
      success: function (data, status, request) { 
        console.log("Status: " + status + "\n Data: ");
        console.log(data);
      },
      error: function (request, status, error) { alert(request.responseText); }
    }); 
  }


// ======= DEFINE 'GLOBAL' VARIABLES =======
  var timeSent = "";


// ======= BASIC HTML FOR ADDITIONS / REPLACEMENTS =======

  // remove iOs phone styling
  $('head').append('<meta name="format-detection" content="telephone=no">');
    
  // add hidden div w/ URL over landing page icons so they are clickable
  var elementServices = '<div style="position:absolute;height:20%;width:30%;background-color:rgba(255, 0, 0, 0);display:hidden;left:50%;margin-left:-15%" id="service-outer"><div style="position:relative;height:100%;width:100%;background-color:rgba(255, 0, 0, 0);cursor:pointer;z-index:50;margin-top: 79%;" id="service-inner"></div></div>',
      elementLocations = '<div style="position:absolute;height:20%;width:30%;background-color:rgba(255, 0, 0, 0);display:hidden;left:20%;margin-left:-15%" id="locations-outer"><div style="position:relative;height:100%;width:100%;background-color:rgba(255, 0, 0, 0);cursor:pointer;z-index:50;margin-top: 79%;" id="locations-inner"></div></div>';
    
  $('div.image-wrapper').prepend(elementServices, elementLocations);

  $('#service-inner').click(function() {
    window.location='http://ontimeserviceco.com/watch-services/';
  })

  $('#locations-inner').click(function() {
    window.location='http://ontimeserviceco.com/locations/';
  })


  // ----- Form HTML Insert -----

  // Form HTML
  var formHtml = '\
  <div class="site-address">\
    <form action="#" method="POST" class="form-style">\
      <div class="form-container">\
        <label for="message" class="some0 form-email" style="color:#111;">Contact Us: <span class="" style="font-weight:bold;text-decoration:underline;display:none;" class="here">HERE</span></label>\
        <input style="" class="some0" type="text" name="message" placeholder="Type here..." >\
        <button style="display:none" class="none0 form-next">Next</button>\
        <label for="contact-info" style="display:none; color:#111;" class="none1 form-email">Your Info:</label>\
        <input style="display:none;" class="none1 touch" type="text" name="contact-info" placeholder="Enter your phone number or e-mail...">\
        <input type="text" name="_gotcha" style="display:none">\
        <input type="hidden" name="_subject" value="New contact from On Time website!">\
        <input type="hidden" name="_cc" value="bpizza@gmail.com">\
        <button style="display:none;" class="none1 submit">Send</button>\
      </div>\
    </form>\
  </div>'

  // Insert form at top
  $('div.site-address:contains("info@ontimeserviceco.com")').replaceWith(formHtml);
  $('div.site-address').addClass('phonex');


  // ----
  // Set HTML for "OR" to be placed in middle, visible on small phone screens (comment OR call)
  var orCall = '<div class="site-city-state or-call">or:</div>'

  // $('div.site-city-state').remove();
  $('div.site-city-state').replaceWith(orCall); 


  // ----
  // Prepare addition HTML for form at bottom
  var bottomHtmlWrap = '<h3 class="text-align-center"></h3>'

  // Insert form at bottome
  $('div.sqs-block-content h3.text-align-center').eq(1).before(formHtml);
  $('div.site-address').eq(1).wrap(bottomHtmlWrap).after('<br><div>or e-mail:</div>');
  $('div.site-address form').eq(1).addClass('form-style-lower');


  // ----
  // On mobile replace phone number text with "call us" link
  var callPhone = '<div class="site-phone"><a href="tel:+16046885317,203" style="text-decoration:underline">Call Us</a><br><span style="text-transform:lowercase !important; text-decoration:none !important; margin-top:-10px;"><a>(ext. 203)</a></span></div>'


  // ----
  // Actions to perform is device is phone (has screen width)
  if (isPhoneX()) { 
    $('div.site-city-state').replaceWith(orCall);
    $('div.site-phone').replaceWith(callPhone);
  }
  
  

// ====== FORM TRANSITIONS & STYLING =====

  // When TOP message field is focus
  $('input[name="message"]').eq(0).focus(function() {
    whiteOnPhone();
    if ( $(this).prop('style').width !==  "40%" && !isPhoneX() ) { 
      $(this).animate( { width: "20%" }, 0 ); // set with style
      $(this).animate( { width: "40%" }, 100 ); // animate it
    }
    $(this).prop('placeholder', 'Enter your comments and requests here...')
    $(this).parent().find('.none0').fadeIn('fast');
  });
    
  // When BOTTOM (second form) message field is focus (don't animate widths)
  $('input[name="message"]').eq(1).focus(function() {
    whiteOnPhone();
    $(this).prop('placeholder', 'Enter your comments and requests here...')
    $(this).parent().find('.none0').fadeIn('fast');
  });
    
  // $('input[name="message"]').focusout(function() {
  //   whiteOnPhone();
  //   if ( $('input[name="message"]').prop('style').width !==  "20%" && !isPhoneX() ) { 
  //     $('input[name="message"]').animate( { width: "20%" }, 100 ); // animate out
  //   }
  //   $('input[name="message"]').prop('placeholder', 'Type here...')
  //   $('.none0').fadeOut('fast');
  // });
  

  
// cliked CONTACT
// $('label.form-email').click(function(e) {
$('doesnt-work').click(function(e) {
  console.log("contact us clicked");
  whiteOnPhone();
  $('.some0').fadeOut('fast',function() {
    $('.none0').removeClass('input:invalid').fadeIn('fast');
    $('input[name="message"]').focus();
  });
  e.preventDefault(); 
});

 // clicked next
$('.form-next').click(function(e) {
  if ($(this).parent().find('input[name="message"]').val().trim() === "") {
    $(this).parent().find('input[name="message"]').prop('required',true);
    e.preventDefault();
    return false;
  } else {
    console.log("next form clicked");
    var labelWidth = $('label[for="message"]').width();
    $(this).parent().find('label[for="contact-info"]').width(labelWidth);
    $(this).parent().find('.some0').fadeOut('fast');
    $(this).parent().find('.none0').fadeOut('fast', function() {
      $(this).parent().find('.none1').fadeIn('fast');
      $(this).parent().find('.touch').focus();
    });
    e.preventDefault();
  }
});


  
if (currentPathX() === "") { 
  $('section[data-content-field="main-content"]').remove();
  
}
  
  


// obfuscation
var e = "lyn",
  m = "de",
  a = "ll@",
  i = "tel",
  l = "us.",
  z = "net";

// set formData variables
var messageX = "",
  replyTo = "",
  pathOn = "",
  copyTo = "",
  subject = "",
  gotcha = "",
  thankYou = '<span class="thank-you site-address phonex" style="display:none; color:rgb(0,0,0);opacity:1;">Thanks! We\'ll be in touch soon.</span>';

var formData = {
  message: messageX,
  contact: replyTo,
  page: currentPathX,
  time: timeSent,
  _cc: copyTo,
  _subject: subject,
  _gotcha: gotcha
};
  


// press enter on contact info form to submit form
$('input[name="contact-info"]').keypress(function(event){
  if(event.keyCode == 13){
    event.preventDefault();
    $(this).parents('form').find('.submit').click();
  }
});

$("form .submit").on('click', $(this), function() {
    // Form reset timer shorter on phone screens
    var resetTimer = ( isPhoneX() ) ? 3000 : 10000;
    var dataContext    = $(this).closest('form').removeAttr('id').removeAttr('_lpchecked') // set data context for calling form reset function
    console.log("submit timer: " + isPhoneX() + resetTimer);
  
    // Contact info required - check it is not empty
    if ($(this).parent().find('input[name="contact-info"]').val().trim() === "") {
      $(this).parent().find('input[name="contact-info"]').prop('required',true);    
      return false;
      
    // Otherwise get formData ready
    } else {
        formData = {
          message: $(this).parent().find('input[name="message"]').val(),
          contact: $(this).parent().find('input[name="contact-info"]').val(),
          page: ( currentPathX() ) ? currentPathX() : "Homepage",
          time: ( thisMoment() ) ? thisMoment() : "N/A",
          _cc: $(this).parent().find('input[name="_cc"]').val(),
          _subject: $(this).parent().find('input[name="_subject"]').val(),
          _gotcha: $(this).parent().find('input[name="_gotcha"]').val()
        };

      // prevents send form for testing
      if ( formData.message.startsWith('//') || formData.contact.startsWith('//') ) {
        console.log("test form NOT sent");
        console.log("!message: " + formData.message + "\n !contact info: " + formData.contact);
      } else {
        
        sendForm(formData);
        console.log("form sent! data object:");
        console.log(formData);
      }
      $(this).parents("form").eq(0).before(thankYou);
      console.log("thanks in, form coming out");
      $(this).parents("form").eq(0).fadeOut('fast', function() {
          $('.thank-you').fadeIn(400, function() {
            $(".thank-you").animate({opacity: .3}, 4000);
            // Reset form
            var windowFn = function() { return contactReset.apply(dataContext, []) } // call reset function with data context // .apply executes code immediately; doesn't work with setTimeout so fore to put in function
            window.setTimeout(windowFn, resetTimer)  // reset form after set delay
            console.log("data context: "); console.log(dataContext);
          });
      });
      return false;
    } //end else
});
  
// Add note to locations page
var correctUrl = (window.location.pathname === "/locations/");
  
var subtitle = '<p id="location-subtitle"style="font-size:18px;margin-top: 3%;margin-bottom: -3%;margin-left:auto;margin-right:auto;text-align:center;">Click on your province below to find your nearest On Time Service counter located within The Hudson\'s Bay</p>';

if(correctUrl) { 
$('#canvas').find('.page-divider.top-divider').after(subtitle);
}; // end if(CorrectUrl)

}); // end doc ready





