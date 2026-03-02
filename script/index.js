const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"))
}


const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive()
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active")
            displayLevelWord(data.data)
        })
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetail(details.data)
}

// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }

const displayWordDetail = (word) => {
    console.log(word)
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML= `
        <div><h3 class="text-3xl font-semibold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>    :${word.pronunciation})</h3></div>
                <div>              
                    <h4 class="text-[24px] font-semibold">Meaning</h4>
                    <p class="font-bangla">${word.meaning}</p>
                </div>
                <div>
                    <h4 class="text-[24px] font-semibold">Example</h4>
                    <p class="text-[24px]"> ${word.sentence} </p>
                </div>
                <div>
                    <h4 class="text-[24px] font-semibold">সমার্থক</h4>
                    <span class="btn">WTF</span>
                    <span class="btn">WTF</span>
                    <span class="btn">WTF</span>
                </div>
    
    
    
    `;
    document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="col-span-full text-center py-10 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png"/>
            <p class="font-bangla text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla text-3xl font-medium text-[#292524]">নেক্সট Lesson এ যান</h2>
        </div>
        `
        return;
    }


    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white py-10 px-5 text-center space-y-4">
                    <h3 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h3>
                    <p class="text-sm font-medium">Meaning /Pronounciation</p>
                    <div class="font-bangla text-2xl font-semibold">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</div>
                    <div class="flex justify-between items-center">
                        <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
            </div>
        
        `


        wordContainer.append(card);
    })
}


const displayLesson = (lessons) => {

    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> 
            Lesson - ${lesson.level_no}</button>
        `


        levelContainer.append(btnDiv)
    }
}

loadLesson()