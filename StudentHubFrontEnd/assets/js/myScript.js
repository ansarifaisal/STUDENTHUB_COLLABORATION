
var settings = function () {

    $(function () {

        $(".button-collapse").sideNav();

        $('.left-bar').sideNav();

        /*$('.left-bar').click(function () {
            $('#main').toggleClass('add-padding-left');
            $('#main').toggleClass('add-padding-right');
            $('.main-content').toggleClass('addjust-content');
            $('#slide-out-fixed').toggleClass('fixed');
        });*/

        $('.profile-dropdown').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: true, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
        });

        $('.notification-dropdown').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: true, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
        });

        $('.message-dropdown').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
        });


        $('select').material_select();

        $('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 15
        });


        $('.tooltipped').tooltip({ delay: 50, html: true });

        $('input[type="text"]').characterCounter();

        $('ul.tabs').tabs();

        $('ul.tabs').tabs();

        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'right', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
        });

        $('.scrollspy').scrollSpy();

        $('.modal').modal();

        $('.access').click(function () {
            var id = $('.access').attr('id');
            console.log(id);
            $('#modal1').modal('open');
        });

        $('.eventModal').click(function () {
            var id = $('.access').attr('id');
            console.log(id);
            $('#modal2').modal('open');

        });

        $('.right-bar').sideNav({
            menuWidth: 300, // Default is 300
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true
        });

        $('textarea, textarea#textarea1').characterCounter();

        $('.collapsible').collapsible();
    });

}

settings();

function dateTimeFormat(dateTime) {

    var tempDateTime = new Date(dateTime);

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    var hour = tempDateTime.getHours();

    var meridiem = hour >= 12 ? " PM " : " AM ";

    var formattedDateTime = months[tempDateTime.getMonth()] + ' ' + tempDateTime.getDate() + ', ' + tempDateTime.getFullYear() + ' ' + ((hour + 11) % 12 + 1) + ":" + tempDateTime.getMinutes() + meridiem;

    return formattedDateTime;

}