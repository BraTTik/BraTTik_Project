function topThreeWords(text) {

}

const text = 'Товарищи! постоянный количественный рост и сфера нашей активности способствует подготовки и реализации дальнейших направлений развития. Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке систем массового участия. Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности позволяет оценить значение существенных финансовых и административных условий.';

function* getWord(text){
    const pattern = /([a-zа-яА-ЯЁё']+)/gi;
    const matches = text.match(pattern);
    for(const word of matches){
        yield word;
    }
}

function wordsCount(text, word){
    const pattern = `/${word}/gi`;
    console.log(pattern);
    const matches = text.match(pattern);
    const matches1 = text.match(/и/gi);
    console.log(matches);
    console.log(matches1);
}

