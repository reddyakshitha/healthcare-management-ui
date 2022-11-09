export const getUrl = path => {
  let val;
  if (process.env.NODE_ENV === 'development') {
    val = 'http://localhost:5000';
  } else {
    val = 'https://healthcaremanagement.netlify.app';
  }
  return val + path;
};