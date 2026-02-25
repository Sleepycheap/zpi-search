export async function displayPage(req, res) {
  res.render('display', {
    title: 'ZPI Egnyte Search',
  });
}
