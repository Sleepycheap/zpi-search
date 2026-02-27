const projects = '/shared/Projects/Project Name';
const design = '/shared/Design-Engineering/Project Name';
const restore = '/shared/Restoration & Maintenance/Project Name';
const test = `/Shared/Projects/Punta Gorda, FL - Tucker's Cove - 14425 and 34425/5. Prime Contract and Change Orders/Florida Aquatics Sample COI.pdf`;

export function stripName(path) {
  const root = path.split('/')[2];
  let r = root;
  let p = path.split(r)[1];
  const fPath = `Y:${p}`;
  console.log('test', fPath);
  // console.log('fPath', fPath);
  // if (root === 'Projects') {
  //   fPath = 'Y:/' + fPath;
  // } else if (root === 'Design-Engineering') {
  //   fPath = 'R:/' + fPath;
  // } else if (root === 'Restoration & Maintenance') {
  //   fPath = 'K:/' + fPath;
  // }
  // return fPath;
}

stripName(test);
