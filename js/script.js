const students = document.querySelectorAll('.student-item');
const perPage = 10;

const addSearchBar = () => {
  const searchDiv = document.createElement('div');
  const searchInput = document.createElement('input');

  searchDiv.className = 'student-search';
  searchInput.placeholder = 'Search for students...';

  searchInput.addEventListener('keyup', e => {
    // hide all visible students
    [...students]
      .filter(i => i.style.display !== 'none')
      .forEach(i => i.style.display = 'none');

    // collect students based on search content
    const { value } = e.target;
    const pageDiv = document.querySelector('.page');
    const paginationDiv = document.querySelector('.pagination');
    let noResultsDiv = document.querySelector('.no-results');
    const searchedStudents = [...students]
      .filter(i => i.textContent.includes(value));

    // remove current pagination div and no results message if there is one
    if (paginationDiv) pageDiv.removeChild(paginationDiv);
    if (noResultsDiv) pageDiv.removeChild(noResultsDiv);

    // show first page of searched students, and add pages
    if (searchedStudents.length > 0) {
      showPage(searchedStudents, 1);
      addPageLinks(searchedStudents);
      document.querySelector('a').className = 'active';
      // add 'no results' message if no students were found
    } else {
      noResultsDiv = document.createElement('div');
      noResultsDiv.className = 'no-results';
      noResultsDiv.textContent = 'No results';
      pageDiv.appendChild(noResultsDiv);
    }
  });

  searchDiv.appendChild(searchInput);
  document.querySelector('.page-header').appendChild(searchDiv);

}

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
  const pages = Math.ceil(list.length / perPage);
  const paginationDiv = document.createElement('div');
  const paginationUl = document.createElement('ul');

  paginationDiv.className = 'pagination';
  paginationDiv.appendChild(paginationUl);
  document.querySelector('.page').appendChild(paginationDiv);

  // create anchors
  for (let i = 1; i <= pages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    // set anchor page #, and href 
    a.textContent = i;
    a.href='#';

    // append anchor and li accordingly
    li.appendChild(a);
    paginationUl.appendChild(li);
  }

  // add listeners to anchors via propagation
  paginationUl.addEventListener('click', e => {
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

// show first page create links, and add search
showPage(students, 1);
addPageLinks(students);
addSearchBar();

// set first page to active
document.querySelector('a').className = 'active';
