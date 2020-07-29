export const getLaunchesInBetweenDates = (endDate, startDate) => {
  const ed = endDate && endDate.getTime();
  const sd = startDate && startDate.getTime();
  if (ed < sd) {
    alert("errro");
  } else {
    const result = launches.filter((d) => {
      var time = new Date(d.launch_date_utc).getTime();
      return sd < time && time < ed;
    });
    console.log(result);
    setLaunches(result);
  }
};
