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

### Initialize Course
Selecting a course to initialize

![Admin View](/docs/images/admin_add_course.png)

All non-admin members of the course will be added the the students table under the name they have entered in their Slack profile. A course can only be initialized once.  If you need to edit a student's current course, you will need to use the "Update Student" menu.

### Update Student
Selecting a student to update

![Admin View](/docs/images/admin_select_student.png)

The dropdown will be populated with all current students in the format of "NAME (SLACK ID)"
It's recommended to search by Slack ID to account for similar names

Updating a student

![Admin View](/docs/images/admin_update_student.png)

Selecting a course will update the student's current course.  Choose "None" will set the current course to null

## Contributing

To contribute, fork the repo and make a pull request.

Some features currently missing/defective:

* Ability for students to pass a specific checkin time as an argument
* Ability to dynamically add Administrator users

## License

This repo is available under a MIT license
