//get launches in between two dates
const getLaunchesInBetweenDates = (
  endDate,
  startDate,
  setLaunches,
  launches,
  setEndDate
) => {
  const ed = endDate && endDate.getTime();
  const sd = startDate && startDate.getTime();
  if (ed < sd) {
    setEndDate(null);
  } else {
    const result = launches.filter((d) => {
      var time = new Date(d.launch_date_utc).getTime();
      return sd < time && time < ed;
    });
    setLaunches(result);
  }
};

//toggle launch value in state i.e. successfull, failed launches
const getAllLaunches = (currentLaunch, launches) => {
  if (currentLaunch === "success") {
    let successLaunches = launches.filter((launch) => launch.launch_success);
    return successLaunches;
  } else if (currentLaunch === "fail") {
    let failLaunches = launches.filter(
      (launch) => launch.launch_success === false
    );
    return failLaunches;
  } else {
    return launches;
  }
};

//toggle modal show & hide
const toggleModal = (setShowModal, handleShow) => {
  setShowModal(handleShow);
};

export { getLaunchesInBetweenDates, getAllLaunches, toggleModal };
