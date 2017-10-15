const menu = {
  "text": "Administrator Menu",
  "attachments": [
    {
      "text": "What would you like to do?",
      "fallback": "fallback message",
      "callback_id": "adminMenu",
      "color": "#3AA3E3",
      "attachment_type": "default",
      "actions": [
        {
          "name": "admin_action",
          "text": "Verify Checkins",
          "type": "button",
          "style": "primary",
          "value": "cohortSelection",
          "options": "validate"
        },
        {
          "name": "admin_action",
          "text": "Add a Cohort",
          "type": "button",
          "style": "primary",
          "value": "addCohort",
          "options": "validate"
        },
      ]
    }
  ]
}

const addCohort = (channels) => {
  let actions = {
    "name": "channels_list",
    "text": "Choose the cohort channel to add",
    "type": "select",
    "data_source": "channels"
  }

  if (channels) {
    actions = {
      "name": "channels_list",
      "text": "Choose the cohort channel to add",
      "type": "select",
      "options": channels
    }
  }

  return {
    "text": "Add a new cohort",
    "attachments": [
      {
        "fallback": "Upgrade your Slack client to use messages like these.",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "callback_id": "addCohortSelection",
        "actions": [actions]
      }
    ]
  }
}

const cohortSelection = (cohorts) => {
// cohorts should be array of objects with keys: text & value
  return {
    "text": "Cohort validation",
    "attachments": [
      {
        "text": "Choose a cohort",
        "fallback": "fallback message",
        "callback_id": "courseSelection",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
          {
            "name": "course_list",
            "text": "Choose a course",
            "type": "select",
            "options": cohorts
          }
        ]
      }
    ]
  }
}

const checkinValidation = (courseName, courseId, checkinsList, absences) => {
  let text = "```Name" + ' '.repeat(38) + "Time       Validated\n" + checkinsList.join('\n') + "\n\nAbsent Students\n" + absences.join('\n') + "```"
  return {
    "text": `Validate Attendance for ${courseName}`,
    "attachments": [
      {
        "text": text,
        "fallback": "fallback message",
        "callback_id": "checkinValidation",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "mrkdwn_in": ["text", "pretext"],
        "actions": [
          {
            "name": "cohort_validation_action",
            "text": "Verify Checkins",
            "type": "button",
            "style": "primary",
            "value": courseId,
            "options": "validate"
          }
        ]
      }
    ]
  }
}

module.exports = {
  menu,
  cohortSelection,
  addCohort,
  checkinValidation
}
