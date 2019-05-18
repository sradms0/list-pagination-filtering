const students = document.querySelectorAll('.student-item');
const perPage = 10;

const showPage = (list, page) => {
  const max = page * perPage;
  const min = max - perPage;

  // display students if in current range, or hide them
  list.forEach((i, idx) => {
    if (idx >= min && idx < max) {
      i.style.display = '';
    } else i.style.display = 'none';
  });
}

const addPageLinks = list => {
  const pages = Math.ceil(students.length / perPage);
  const div = document.createElement('div');
  const ul = document.createElement('ul');

  div.className = 'pagination';
  div.appendChild(ul);
  document.querySelector('.page').appendChild(div);

  // create anchors
  for (let i = 1; i <= pages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    // set anchor page #, and href 
    a.textContent = i;
    a.href='#';

    // append anchor and li accordingly
    li.appendChild(a);
    ul.appendChild(li);
  }

  // add listeners to anchors via propagation
  ul.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      const a = e.target;

      // swap active class to clicked anchor
      document.querySelector('.active').className = '';
      a.className = 'active';

      // show that page
      showPage(list, a.textContent);
    }
  })
}

// show first page and create links on page-load
showPage(students, 1);
addPageLinks(students);

// set first page to active
document.querySelector('a').className = 'active';
