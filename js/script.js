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

showPage(students, 1);
