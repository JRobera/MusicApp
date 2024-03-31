export default function formateTime(time: number) {
  if (isNaN(time)) {
    return "00 : 00";
  }

  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);

  if (min < 10) {
    if (sec < 10) {
      return `${"0" + min + " : 0" + sec}`;
    }
    return `${"0" + min + " : " + sec}`;
  } else if (sec < 10) {
    return `${min + " : 0" + sec}`;
  }
  return `${min + " : " + sec}`;
}
