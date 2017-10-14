const menu = {
  "text": "Administrator menu",
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
          "options": [
            {
              "text": "web-080717",
              "value": "web-080717"
            },
            {
              "text": "web-082817",
              "value": "web-082817"
            },
            {
              "text": "web-091917",
              "value": "web-091917"
            },
          ]
        }
      ]
    }
  ]
}
//
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
  menu: menu,
  checkinValidation: checkinValidation
}
