function getTimeMsg(t) {
  const createTime = new Date(t);
  const time = Date.now() - createTime;
  const seconds = (time / 1000).toFixed(0);
  const min = (time / (1000 * 60)).toFixed(0);
  const hours = (time / (1000 * 60 * 60)).toFixed(0);
  const days = (time / (1000 * 60 * 60 * 24)).toFixed(0);
  const week = (time / (1000 * 60 * 60 * 24 * 7)).toFixed(0);
  const month = (time / (1000 * 60 * 60 * 24 * 30)).toFixed(0);
  const year = (time / (1000 * 60 * 60 * 24 * 365)).toFixed(0);


  if (seconds < 1) {
    return "Just Now";
  } else if (seconds < 60) {
    return `${seconds} second ago`;
  }
  if (min < 60) {
    return `${min} minutes ago`;
  }
  else if (hours < 24) {
    return `${hours} hour ago`;
  }
  else if (days < 7) {
    return `${days} day ago`;
  } else if (week < 5) {
    return `${week} week ago`;
  } else if (month < 12) {
    return `${month} month ago`;
  } else if (year < 2) {
    return `${year} years ago`;
  }
  else {
    return createTime.toLocaleString();
  }
}
