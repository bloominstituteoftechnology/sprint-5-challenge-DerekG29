async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer');
  // const currentYear = new Date().getFullYear();
  // footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
  footer.textContent = '© BLOOM INSTITUTE OF TECHNOLOGY 2023';

  const cardsDiv = document.querySelector('div.cards');
  const info = document.querySelector('.info');

  try {
    const resLearners = await axios.get('http://localhost:3003/api/learners');
    const resMentors = await axios.get('http://localhost:3003/api/mentors');

    const learnerArr = resLearners.data;
    const mentorArr = resMentors.data;

    info.textContent = 'No learner is selected';

    learnerArr.forEach(learner => {
      cardsDiv.appendChild(buildLearnerCard(learner));
    })











  } catch (error) {
    console.log(error.message);
  }

  function buildLearnerCard({ id, fullName, email, mentors }, ) {
    const learnerCard = document.createElement('div');
    const nameHead = document.createElement('h3');
    const emailDiv = document.createElement('div');
    const mentorHead = document.createElement('h4');

    learnerCard.classList.add('card');
    mentorHead.classList.add('closed');

    nameHead.textContent = fullName;
    emailDiv.textContent = email;
    mentorHead.textContent = 'Mentors';

    learnerCard.appendChild(nameHead);
    learnerCard.appendChild(emailDiv);
    learnerCard.appendChild(mentorHead);

    learnerCard.addEventListener('click', () => {
      const selected = document.querySelector('.selected');
      if (selected) {
        let name = selected.childNodes[0].textContent.split(',')[0];
        selected.childNodes[0].textContent = name;
        selected.classList.remove('selected');
      }
      if (selected !== learnerCard) {
        learnerCard.classList.add('selected');
        nameHead.textContent = `${fullName}, ID ${id}`;
        info.textContent = `The selected learner is ${fullName}`;
      } else {
        info.textContent = 'No learner selected';
      }
    });

    mentorHead.addEventListener('click', (evt) => {
      if (mentorHead.parentElement.classList.contains('selected')) evt.stopPropagation();
      mentorHead.classList.toggle('open');
      mentorHead.classList.toggle('closed');
    });

    return learnerCard;
  }

  function buildMentorList() {

  }


  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
