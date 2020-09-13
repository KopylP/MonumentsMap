export default function sortMonumentPhotos(a, b) {
  if (a.majorPhoto === true) return -1;
  if (b.majorPhoto === true) return 1;
  else return 0;
}
