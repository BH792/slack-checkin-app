# slack-checkin-app

Slack application to manage checkins.

## Installation

Clone the repo and host.  The application is built using NodeJs and Postgres.
To install to slack:
* You will need to create a Slack Application (https://api.slack.com/apps)
* Add a slash command (docs will assume the command is '/checkin') with the Request URL of [your website]/checkin
* Enable interactive components with a Request URL of [your website]/admin

## Usage

```
/checkin
```

For students, typing the checkin slash command anywhere in the workspace will check you in at the time you send the message

For administrators, typing the checkin slash command will bring up the administrator menu
![Admin Menu](/docs/images/admin_menu.png)
This menu gives administrators the ability to 
* View/verify checkins for a specific course
* Initialize a new course using a slack channel
* Update a student's current course

### View/Verify
Selecting a course
![Admin View](/docs/images/admin_cohort_selection.png)

Viewing checkins for a course for the current day
![Admin Checkins](/docs/images/admin_viewing_checkins.png)

## Contributing

To contribute, fork the repo and make a pull request.

Some features currently missing/defective:

* Ability for students to pass a specific checkin time as an argument

## License

This repo is available under a MIT license
