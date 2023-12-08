$(document).ready(function(){
    var currentStep = 1;
    var totalSteps = 10;
    var correctCount = 0;
    var incorrectCount = 0;
    var difficulty = 'easy';
    var easyWords = ["cat", "dog", "house", "tree", "book", "car", "apple", "red", "water", "happy"];
	var easyTranslations = ["кіт", "собака", "будинок", "дерево", "книга", "авто", "яблуко", "червоний", "вода", "щасливий"];
	var hardWords = ["encyclopedia", "philosophy", "architecture", "biochemistry", "aeronautics", "jurisprudence", "metaphysics", "paleontology", "nanotechnology", "neuroscience"];
	var hardTranslations = ["енциклопедія", "філософія", "архітектура", "біохімія", "аеронавтика", "юриспруденція", "метафізика", "палеонтологія", "нанотехнології", "нейронаука"];

    var words = ["always", "sometimes", "never", "often", "rarely", "usually", "seldom", "frequently", "occasionally", "constantly"];
    var translations = ["завжди", "іноді", "ніколи", "часто", "рідко", "зазвичай", "зрідка", "часто", "іноді", "постійно"];
    var usedIndexes = [];

    // Оновлення статистики
    function updateStats() {
        $('#current-step').text(currentStep);
        $('#correct-count').text(correctCount);
        $('#incorrect-count').text(incorrectCount);
    }

    // Вибір рівня складності
    $('input[name="difficulty"]').change(function() {
        difficulty = $(this).val();
        resetGame();
    });

    // Отримання випадкового індексу слова
    function getRandomWordIndex(wordList) {
        var randomIndex = Math.floor(Math.random() * wordList.length);
        while(usedIndexes.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * wordList.length);
        }
        usedIndexes.push(randomIndex);
        return randomIndex;
    }

    // Скидання гри
    function resetGame() {
        currentStep = 1;
        correctCount = 0;
        incorrectCount = 0;
        usedIndexes = [];
        showNextWord();
        updateStats();
    }

    // Показ наступного слова
    function showNextWord() {
        var wordList, translationList;

        switch(difficulty) {
            case 'easy':
                wordList = easyWords;
                translationList = easyTranslations;
                break;
            case 'hard':
                wordList = hardWords;
                translationList = hardTranslations;
                break;
            default:
                wordList = words;
                translationList = translations;
        }

        if (currentStep > totalSteps) {
            $('#results-modal').show();
            $('#language-level').text(correctCount > 7 ? 'Advanced' : correctCount > 4 ? 'Intermediate' : 'Beginner');
        } else {
            var randomIndex = getRandomWordIndex(wordList);
            $('#flashcard .card-word').text(wordList[randomIndex]);
            $('#translation-input').val('');
            updateStats();
        }
    }

    // Перевірка введеного перекладу
    $('#check-button').click(function(){
        var inputTranslation = $('#translation-input').val().trim();
        var currentWord = $('#flashcard .card-word').text();
        var wordList, translationList;

        switch(difficulty) {
            case 'easy':
                wordList = easyWords;
                translationList = easyTranslations;
                break;
            case 'hard':
                wordList = hardWords;
                translationList = hardTranslations;
                break;
            default:
                wordList = words;
                translationList = translations;
        }

        var wordIndex = wordList.indexOf(currentWord);
        if (wordIndex !== -1 && inputTranslation.toLowerCase() === translationList[wordIndex].toLowerCase()) {
            correctCount++;
        } else {
            incorrectCount++;
        }
        currentStep++;
        showNextWord();
    });

    // Закриття модального вікна
    $('#results-modal').click(function(event){
        if (event.target.id === 'results-modal' || event.target.className === 'close-button') {
            $('#results-modal').hide();
            resetGame();
        }
    });

    showNextWord(); // Показ першого слова
});
