(function ($) {
    $(function () {
        /*** Animate word ***/
        //set animation timing
        var animationDelay = 2500,
            //loading bar effect
            barAnimationDelay = 3800,
            barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
            //letters effect
            lettersDelay = 50,
            //type effect
            typeLettersDelay = 150,
            selectionDuration = 500,
            typeAnimationDelay = selectionDuration + 800,
            //clip effect
            revealDuration = 600,
            revealAnimationDelay = 1500;

        initHeadline();


        function initHeadline() {
            singleLetters($('.cd-headline.letters').find('b'));
            animateHeadline($('.cd-headline'));
        }

        function singleLetters($words) {
            $words.each(function () {
                var word = $(this),
                    letters = word.text().split(''),
                    selected = word.hasClass('is-visible');
                for (i in letters) {
                    if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                    letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
                }
                var newLetters = letters.join('');
                word.html(newLetters).css('opacity', 1);
            });
        }

        function animateHeadline($headlines) {
            var duration = animationDelay;
            $headlines.each(function () {
                var headline = $(this);

                if (headline.hasClass('loading-bar')) {
                    duration = barAnimationDelay;
                    setTimeout(function () {
                        headline.find('.cd-words-wrapper').addClass('is-loading')
                    }, barWaiting);
                } else if (headline.hasClass('clip')) {
                    var spanWrapper = headline.find('.cd-words-wrapper'),
                        newWidth = spanWrapper.width() + 10
                    spanWrapper.css('width', newWidth);
                } else if (!headline.hasClass('type')) {
                    //assign to .cd-words-wrapper the width of its longest word
                    var words = headline.find('.cd-words-wrapper b'),
                        width = 0;
                    words.each(function () {
                        var wordWidth = $(this).width();
                        if (wordWidth > width) width = wordWidth;
                    });
                    headline.find('.cd-words-wrapper').css('width', width);
                };

                //trigger animation
                setTimeout(function () {
                    hideWord(headline.find('.is-visible').eq(0))
                }, duration);
            });
        }

        function hideWord($word) {
            var nextWord = takeNext($word);

            if ($word.parents('.cd-headline').hasClass('type')) {
                var parentSpan = $word.parent('.cd-words-wrapper');
                parentSpan.addClass('selected').removeClass('waiting');
                setTimeout(function () {
                    parentSpan.removeClass('selected');
                    $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
                }, selectionDuration);
                setTimeout(function () {
                    showWord(nextWord, typeLettersDelay)
                }, typeAnimationDelay);

            } else if ($word.parents('.cd-headline').hasClass('letters')) {
                var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
                hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
                showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

            } else if ($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({
                    width: '2px'
                }, revealDuration, function () {
                    switchWord($word, nextWord);
                    showWord(nextWord);
                });

            } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
                $word.parents('.cd-words-wrapper').removeClass('is-loading');
                switchWord($word, nextWord);
                setTimeout(function () {
                    hideWord(nextWord)
                }, barAnimationDelay);
                setTimeout(function () {
                    $word.parents('.cd-words-wrapper').addClass('is-loading')
                }, barWaiting);

            } else {
                switchWord($word, nextWord);
                setTimeout(function () {
                    hideWord(nextWord)
                }, animationDelay);
            }
        }

        function showWord($word, $duration) {
            if ($word.parents('.cd-headline').hasClass('type')) {
                showLetter($word.find('i').eq(0), $word, false, $duration);
                $word.addClass('is-visible').removeClass('is-hidden');

            } else if ($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({
                    'width': $word.width() + 10
                }, revealDuration, function () {
                    setTimeout(function () {
                        hideWord($word)
                    }, revealAnimationDelay);
                });
            }
        }

        function hideLetter($letter, $word, $bool, $duration) {
            $letter.removeClass('in').addClass('out');

            if (!$letter.is(':last-child')) {
                setTimeout(function () {
                    hideLetter($letter.next(), $word, $bool, $duration);
                }, $duration);
            } else if ($bool) {
                setTimeout(function () {
                    hideWord(takeNext($word))
                }, animationDelay);
            }

            if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
                var nextWord = takeNext($word);
                switchWord($word, nextWord);
            }
        }

        function showLetter($letter, $word, $bool, $duration) {
            $letter.addClass('in').removeClass('out');

            if (!$letter.is(':last-child')) {
                setTimeout(function () {
                    showLetter($letter.next(), $word, $bool, $duration);
                }, $duration);
            } else {
                if ($word.parents('.cd-headline').hasClass('type')) {
                    setTimeout(function () {
                        $word.parents('.cd-words-wrapper').addClass('waiting');
                    }, 200);
                }
                if (!$bool) {
                    setTimeout(function () {
                        hideWord($word)
                    }, animationDelay)
                }
            }
        }

        function takeNext($word) {
            return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
        }

        function takePrev($word) {
            return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
        }

        function switchWord($oldWord, $newWord) {
            $oldWord.removeClass('is-visible').addClass('is-hidden');
            $newWord.removeClass('is-hidden').addClass('is-visible');
        }

        // messageFlash
        let messageflash = $(".alert");
        messageflash.delay(3000).slideUp(300);

        // navbar menu
        $('.side-nav').sidenav({
                menuWidth: 240, // Default is 240
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                preventScrolling: false,
            },
            $('.sidenav-overlay').show()
        );

        // scroll to top
        $('.btn-scrolltop').click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
        $('.modal').modal();
        //scroll navigation
        $('.scrollspy').scrollSpy();

        // rendre les images responsive
        $('img').addClass('responsive-img');

        //background navigation on scroll
        $(document).scroll(function () {
            if (document.getElementById('index-banner')) {
                var indexBanner = document.getElementById('index-banner').offsetHeight;
                var scrollTop = $(window).scrollTop();

                if (scrollTop >= indexBanner) {
                    $('#nav_home').css('background', '#28282895');
                } else {
                    $('#nav_home').css('background', 'transparent');
                }
            }
            
        });

        // faire apparaitre le bouton scrolltop
        $('#scrolltop').hide();
        $(function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 400) {
                    $('#scrolltop').fadeIn(500);
                } else {
                    $('#scrolltop').fadeOut(500);
                }
            });
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space

function genererCitatiionRandom() {
    var quotes = [
        `"Avant de vouloir qu’un logiciel soit réutilisable, il faudrait d’abord qu’il ait été utilisable."
             <br> — Ralph Johnson`,

        `"Il y aura deux sortes de personnes dans le monde, celles qui disent aux ordinateurs ce qu’elles doivent faire et celles qui sont informées par les ordinateurs."
             <br> — Marc Andreesen`,

        `"On considère que les neuf dixièmes du code correspondent à environ 90% du temps de développement. Les 10% restant correspondent également à 90% du temps de développement ."
             <br> — Tom Cargill`,
        
        `"On considère que les neuf dixièmes du code correspondent à environ 90% du temps de développement. Les 10% restant correspondent également à 90% du temps de développement ."
        <br> — Tom Cargill`,

        `"Aujourd’hui, la programmation est devenue une course entre le développeur, qui s’efforce de produire de meilleures applications à l’épreuve des imbéciles et l’univers, qui s’efforce de produire de meilleurs imbéciles. Pour l’instant, l’univers a une bonne longueur d’avance ."
             <br> — Rich Cook`,

        `"Si debugger, c’est supprimer des bugs, alors programmer ne peut être que les ajouter"
             <br> —  Edsger Dijkstra`,

        `"Un geek ne crie pas, il url."`,

        `"Tu ne feras pas de mise en prod le vendredi."`,
    ];
    // La formule magique qui choisi le contenu à afficher
    var quoteRandom = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("citation").innerHTML = quoteRandom;
}
genererCitatiionRandom();