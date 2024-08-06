const convertDate = string => {
  var d = string;
  d = new Date(d);
  d = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  return d;
};

export default convertDate;
