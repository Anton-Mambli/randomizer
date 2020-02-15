//VARIABLES----------------------------------------------------------------------------------
let $inputVal = $('#inputVal');
let $addItem = $('#addItem');
let $listAll = $('#allCases');
let $listChosen = $('#chosenCase');
let $delItem = $('.fa-minus-circle');
let $choose = $('#choose');

//HANDLERS----------------------------------------------------------------------------------
$addItem.click(addItem);
$listAll.on('click', 'li i', delItem);

$choose.on('click', function () {

    if ($('#allCases li').length > 1) {

        let str = $('#allCases li').text();
        let arr = str.split('.');
        arr.splice(arr.length - 1, 1);
        console.log(arr);

        let random = randomInteger(0, arr.length-1);
        console.log('Array Length:', arr.length);

        console.log('RANDOM Index:', random);

        let txt = arr[random];

        console.log('MY Val:', txt);
        
        $listChosen.append('<li> <strong> Я советую тебе выбрать:<strong><br> ' + txt + '</li>');

    } else {
        alert('Тут не из чего выбирать!');
    }
    $listAll.children().slideToggle().remove();

    setTimeout(function () {
        $listChosen.children().remove();

    }, 3000);

})

$inputVal.on('keydown', function (e) {
    let value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
        addItem(value);

    }
});
//FUNCTIONS----------------------------------------------------------------------------------

function addItem() {
    if ($inputVal.val()) {
        $listAll.prepend('<li>' + $inputVal.val() + '.<i class="fas fa-minus-circle"></i></li>').hide().slideToggle('fast');
    }
    $inputVal.val('');
   
}

function delItem() {

    $(this).parent().animate({
        height: "-=100px",
        opacity: 0
    }, 500, function () {
        $(this).parent().remove;
    });
    
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
    
}

//FANCYBOX FIX
let fancyBox = document.querySelector('iframe[src="img/works/androidApp-master/index.html"]');
fancyBox.parentElement.style.width = '600px';