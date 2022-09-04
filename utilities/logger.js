const info = (...message) => {
  console.log(message);
};

const error = (...message) => {
  console.error(message);
};

const setNoticeActionString = (notice, subject, doer) => {
  return {
    actionContent: `action on notice titled "${notice.title}" on ${notice.date}`,
    actionSubject: `${subject}`,
    actionDoer: `${doer}`,
  };
};

const setMemberActionString = (member, subject, doer) => {
  return {
    actionContent: `action on member "${member.username}" with name "${member.name}"`,
    actionSubject: `${subject}`,
    actionDoer: `${doer}`,
    date: new Date(),
  };
};

module.exports = { info, error, setNoticeActionString, setMemberActionString };
