export const formatTime = _ => {
  return new Date().setHours(_, 0, 0, 0);
};

export const nowTime = _ => {
  return new Date()
    .toLocaleString("zh-CN", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
    .replace(/\//g, "-");
};

export const am0Time = _ => {
  return new Date(_ || formatTime(0))
    .toLocaleString("zh-CN", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
    .replace(/\//g, "-");
};

export const formatDate = _ => {
  let d = _.split("-");
  return new Date().setMonth(d[0] - 1, d[1]);
};

function Linear(AQIhigh, AQIlow, Conchigh, Conclow, Concentration) {
  let Conc = parseFloat(Concentration);
  let a = (Conc - Conclow) / (Conchigh - Conclow) * (AQIhigh - AQIlow) + AQIlow;
  return Math.round(a);
}

export const getAQI = intPM25 => {
  let Conc = parseFloat(intPM25);
  let AQI;
  let c = Math.floor(10 * Conc) / 10;
  if (c >= 0 && c < 12.1) {
    AQI = Linear(50, 0, 12, 0, c);
  } else if (c >= 12.1 && c < 35.5) {
    AQI = Linear(100, 51, 35.4, 12.1, c);
  } else if (c >= 35.5 && c < 55.5) {
    AQI = Linear(150, 101, 55.4, 35.5, c);
  } else if (c >= 55.5 && c < 150.5) {
    AQI = Linear(200, 151, 150.4, 55.5, c);
  } else if (c >= 150.5 && c < 250.5) {
    AQI = Linear(300, 201, 250.4, 150.5, c);
  } else if (c >= 250.5 && c < 350.5) {
    AQI = Linear(400, 301, 350.4, 250.5, c);
  } else if (c >= 350.5 && c < 500.5) {
    AQI = Linear(500, 401, 500.4, 350.5, c);
  } else {
    AQI = "555";
  }
  return AQI;
};
