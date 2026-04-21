Your task is to make a program that consumes an API to do checkin to work. 

First you need to obtain the information needed for the day, the hours worked, if it is holiday or weekend. Also if there is absenceEvents you don't need to check in.

The API you need to call is the next one:

GET /api/svc/core/diariesquery/users/212061/diaries/summary/presence?userId=212061&fromDate=2025-03-18&toDate=2025-03-31&pageSize=31&includeHourTypes=true&includeNotHourTypes=true&includeDifference=true


An example response is the next one, notice the differencetime to indicate the seconds needed to work:

```json
{
  "diaries": [
    {
      "diaryId": 599225572,
      "diarySummaryId": 74478263,
      "userId": 212061,
      "date": "2025-03-01",
      "isWeekend": true,
      "isHoliday": false,
      "isEvent": false,
      "name": "_Weekend",
      "comments": null,
      "maxStartTime": null,
      "minEndTime": null,
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "",
      "out": "",
      "breaks": null,
      "workingTimeFormatted": null,
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "5"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225573,
      "diarySummaryId": 74478266,
      "userId": 212061,
      "date": "2025-03-02",
      "isWeekend": true,
      "isHoliday": false,
      "isEvent": false,
      "name": "_Weekend",
      "comments": null,
      "maxStartTime": null,
      "minEndTime": null,
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "",
      "out": "",
      "breaks": null,
      "workingTimeFormatted": null,
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "5"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225574,
      "diarySummaryId": 74478268,
      "userId": 212061,
      "date": "2025-03-03",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": -30600,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "-8",
          "30"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": true,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225575,
      "diarySummaryId": 74478271,
      "userId": 212061,
      "date": "2025-03-04",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": -30600,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "-8",
          "30"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": true,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225576,
      "diarySummaryId": 74478273,
      "userId": 212061,
      "date": "2025-03-05",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": -30600,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "-8",
          "30"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": true,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225577,
      "diarySummaryId": 74478275,
      "userId": 212061,
      "date": "2025-03-06",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": -30600,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "-8",
          "30"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": true,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225578,
      "diarySummaryId": 74478278,
      "userId": 212061,
      "date": "2025-03-07",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "11:00:00",
      "accepted": null,
      "differenceTime": -21600,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "15:00:00",
      "breaks": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "6"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "-6"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": true,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "6"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225579,
      "diarySummaryId": 74478280,
      "userId": 212061,
      "date": "2025-03-08",
      "isWeekend": true,
      "isHoliday": false,
      "isEvent": false,
      "name": "_Weekend",
      "comments": null,
      "maxStartTime": null,
      "minEndTime": null,
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "",
      "out": "",
      "breaks": null,
      "workingTimeFormatted": null,
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "5"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225580,
      "diarySummaryId": 74478283,
      "userId": 212061,
      "date": "2025-03-09",
      "isWeekend": true,
      "isHoliday": false,
      "isEvent": false,
      "name": "_Weekend",
      "comments": null,
      "maxStartTime": null,
      "minEndTime": null,
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "",
      "out": "",
      "breaks": null,
      "workingTimeFormatted": null,
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "5"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225581,
      "diarySummaryId": 74478285,
      "userId": 212061,
      "date": "2025-03-10",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": -30600,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "-8",
          "30"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": true,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225582,
      "diarySummaryId": 74478289,
      "userId": 212061,
      "date": "2025-03-11",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": -30600,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "-8",
          "30"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": true,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225583,
      "diarySummaryId": 74478292,
      "userId": 212061,
      "date": "2025-03-12",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": -30600,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "-8",
          "30"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": true,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225584,
      "diarySummaryId": 74478294,
      "userId": 212061,
      "date": "2025-03-13",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": -30600,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "-8",
          "30"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": true,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225585,
      "diarySummaryId": 74478296,
      "userId": 212061,
      "date": "2025-03-14",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "11:00:00",
      "accepted": null,
      "differenceTime": -21600,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "15:00:00",
      "breaks": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "6"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "-6"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": true,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "6"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225586,
      "diarySummaryId": 74478299,
      "userId": 212061,
      "date": "2025-03-15",
      "isWeekend": true,
      "isHoliday": false,
      "isEvent": false,
      "name": "_Weekend",
      "comments": null,
      "maxStartTime": null,
      "minEndTime": null,
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "",
      "out": "",
      "breaks": null,
      "workingTimeFormatted": null,
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "5"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225587,
      "diarySummaryId": 74478301,
      "userId": 212061,
      "date": "2025-03-16",
      "isWeekend": true,
      "isHoliday": false,
      "isEvent": false,
      "name": "_Weekend",
      "comments": null,
      "maxStartTime": null,
      "minEndTime": null,
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": null,
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "",
      "out": "",
      "breaks": null,
      "workingTimeFormatted": null,
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "5"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225588,
      "diarySummaryId": 74478304,
      "userId": 212061,
      "date": "2025-03-17",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-17",
          "endDate": "2025-03-24",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursMinutesFormatted",
            "values": [
              "8",
              "30"
            ]
          },
          "totalTime": 8.5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225589,
      "diarySummaryId": 74478306,
      "userId": 212061,
      "date": "2025-03-18",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-17",
          "endDate": "2025-03-24",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursMinutesFormatted",
            "values": [
              "8",
              "30"
            ]
          },
          "totalTime": 8.5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225590,
      "diarySummaryId": 74478309,
      "userId": 212061,
      "date": "2025-03-19",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-17",
          "endDate": "2025-03-24",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursMinutesFormatted",
            "values": [
              "8",
              "30"
            ]
          },
          "totalTime": 8.5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225591,
      "diarySummaryId": 74478311,
      "userId": 212061,
      "date": "2025-03-20",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-17",
          "endDate": "2025-03-24",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursMinutesFormatted",
            "values": [
              "8",
              "30"
            ]
          },
          "totalTime": 8.5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225592,
      "diarySummaryId": 74478314,
      "userId": 212061,
      "date": "2025-03-21",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "11:00:00",
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-17",
          "endDate": "2025-03-24",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursFormatted",
            "values": [
              "6"
            ]
          },
          "totalTime": 6,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "15:00:00",
      "breaks": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "6"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "6"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "6"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225593,
      "diarySummaryId": 74478316,
      "userId": 212061,
      "date": "2025-03-22",
      "isWeekend": true,
      "isHoliday": false,
      "isEvent": false,
      "name": "_Weekend",
      "comments": null,
      "maxStartTime": null,
      "minEndTime": null,
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-17",
          "endDate": "2025-03-24",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursFormatted",
            "values": [
              "5"
            ]
          },
          "totalTime": 5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "",
      "out": "",
      "breaks": null,
      "workingTimeFormatted": null,
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "5"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225594,
      "diarySummaryId": 74478319,
      "userId": 212061,
      "date": "2025-03-23",
      "isWeekend": true,
      "isHoliday": false,
      "isEvent": false,
      "name": "_Weekend",
      "comments": null,
      "maxStartTime": null,
      "minEndTime": null,
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-17",
          "endDate": "2025-03-24",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursFormatted",
            "values": [
              "5"
            ]
          },
          "totalTime": 5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "",
      "out": "",
      "breaks": null,
      "workingTimeFormatted": null,
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "5"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225595,
      "diarySummaryId": 74478321,
      "userId": 212061,
      "date": "2025-03-24",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-17",
          "endDate": "2025-03-24",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursMinutesFormatted",
            "values": [
              "8",
              "30"
            ]
          },
          "totalTime": 8.5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225596,
      "diarySummaryId": 74478323,
      "userId": 212061,
      "date": "2025-03-25",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-25",
          "endDate": "2025-04-07",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursMinutesFormatted",
            "values": [
              "8",
              "30"
            ]
          },
          "totalTime": 8.5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225597,
      "diarySummaryId": 74478325,
      "userId": 212061,
      "date": "2025-03-26",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-25",
          "endDate": "2025-04-07",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursMinutesFormatted",
            "values": [
              "8",
              "30"
            ]
          },
          "totalTime": 8.5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225598,
      "diarySummaryId": 74478326,
      "userId": 212061,
      "date": "2025-03-27",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-25",
          "endDate": "2025-04-07",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursMinutesFormatted",
            "values": [
              "8",
              "30"
            ]
          },
          "totalTime": 8.5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225599,
      "diarySummaryId": 74478328,
      "userId": 212061,
      "date": "2025-03-28",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "11:00:00",
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-25",
          "endDate": "2025-04-07",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursFormatted",
            "values": [
              "6"
            ]
          },
          "totalTime": 6,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "15:00:00",
      "breaks": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "6"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "6"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "6"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225600,
      "diarySummaryId": 74478329,
      "userId": 212061,
      "date": "2025-03-29",
      "isWeekend": true,
      "isHoliday": false,
      "isEvent": false,
      "name": "_Weekend",
      "comments": null,
      "maxStartTime": null,
      "minEndTime": null,
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-25",
          "endDate": "2025-04-07",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursFormatted",
            "values": [
              "5"
            ]
          },
          "totalTime": 5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "",
      "out": "",
      "breaks": null,
      "workingTimeFormatted": null,
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "5"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225601,
      "diarySummaryId": 74478331,
      "userId": 212061,
      "date": "2025-03-30",
      "isWeekend": true,
      "isHoliday": false,
      "isEvent": false,
      "name": "_Weekend",
      "comments": null,
      "maxStartTime": null,
      "minEndTime": null,
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-25",
          "endDate": "2025-04-07",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursFormatted",
            "values": [
              "5"
            ]
          },
          "totalTime": 5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "",
      "out": "",
      "breaks": null,
      "workingTimeFormatted": null,
      "workedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "5"
        ]
      },
      "fullName": null
    },
    {
      "diaryId": 599225602,
      "diarySummaryId": 74478332,
      "userId": 212061,
      "date": "2025-03-31",
      "isWeekend": false,
      "isHoliday": false,
      "isEvent": false,
      "name": "General",
      "comments": null,
      "maxStartTime": "11:00:00",
      "minEndTime": "14:00:00",
      "accepted": null,
      "differenceTime": 0,
      "isUserEditable": true,
      "notRecognizedTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "diaryHourTypes": [],
      "shift": null,
      "pendingAbsenceEvents": null,
      "absenceEvents": [
        {
          "allDay": true,
          "startDate": "2025-03-25",
          "endDate": "2025-04-07",
          "description": "Enfermedad del empleado - Baja (Sick leave)",
          "totalTimeFormatted": {
            "resource": "_HoursMinutesFormatted",
            "values": [
              "8",
              "30"
            ]
          },
          "totalTime": 8.5,
          "isTimeOnly": false
        }
      ],
      "pendingPresenceEvents": null,
      "presenceEvents": null,
      "calendarEvents": {
        "name": null,
        "eventNames": null,
        "holidayNames": null,
        "isDisabled": false,
        "isHoliday": false,
        "isEvent": false
      },
      "isPending": false,
      "isToday": false,
      "in": "09:00:00",
      "out": "18:00:00",
      "breaks": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "0",
          "30"
        ]
      },
      "workingTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "workedTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "differenceTimeFormatted": {
        "resource": "_HoursFormatted",
        "values": [
          "0"
        ]
      },
      "isInDanger": false,
      "isOutDanger": false,
      "isDiffHoursDanger": false,
      "scheduleTimeFormatted": {
        "resource": "_HoursMinutesFormatted",
        "values": [
          "8",
          "30"
        ]
      },
      "fullName": null
    }
  ],
  "totalWorkingTimeFormatted": {
    "resource": "_HoursMinutesFormatted",
    "values": [
      "168",
      "30"
    ]
  },
  "totalWorkedTimeFormatted": {
    "resource": "_HoursMinutesFormatted",
    "values": [
      "88",
      "30"
    ]
  },
  "totalDifferenceTime": -288000,
  "totalDifferenceTimeFormatted": {
    "resource": "_HoursFormatted",
    "values": [
      "-80"
    ]
  },
  "totalRecords": 31,
  "isUserAcceptable": true,
  "dynamicColumns": {},
  "totalDynamicColumnsFormatted": {},
  "totalNotRecognizedTimeFormatted": {
    "resource": "_HoursFormatted",
    "values": [
      "0"
    ]
  },
  "totalScheduleTimeFormatted": {
    "resource": "_HoursMinutesFormatted",
    "values": [
      "218",
      "30"
    ]
  }
}
```

After that you need to checkin for the day, this is the request you need to do to update:


PUT /api/diaries/{dairyId}/workday/slots/self


You need to send the following format changing the needed values, the date the dairyId and also the times. I wan't to start at 09:00 and then the exit should be based on the value of the differencetime value in the previous request:

`"differenceTime": -30600`  -> 8.5 horas. So start 09:00 - 18:00 inluce half an hour more

An example body:

```json
{
   "userId":212061,
   "comments":"",
   "date":"2025-02-18",
   "slots":[
      {
         "id":"1763837059367-0",
         "in":{
            "signId":0,
            "userId":212061,
            "date":"2025-02-18T08:00:00.000Z",
            "trueDate":"2025-02-18T08:00:00.000Z",
            "signIn":true,
            "ip":null,
            "latitude":null,
            "longitude":null,
            "outside":null,
            "time":"09:09:00",
            "valueTime":"09:00:00",
            "shortTime":"09:00:00",
            "shortTrueTime":"09:00:00",
            "shortValueTime":"09:00:00",
            "utcTime":"09:00:00 +0",
            "code":null,
            "signType":3,
            "signStatus":1,
            "signEventId":null,
            "deviceId":null,
            "deviceType":0,
            "deleted":false,
            "updatedOn":null,
            "requestId":null,
            "agreementEventId":null
         },
         "out":{
            "signId":0,
            "userId":212061,
            "date":"2025-02-18T13:00:00.000Z",
            "trueDate":"2025-02-18T13:00:00.000Z",
            "signIn":false,
            "ip":null,
            "latitude":null,
            "longitude":null,
            "outside":null,
            "time":"14:00:00",
            "valueTime":"14:00:00",
            "shortTime":"14:00:00",
            "shortTrueTime":"14:00:00",
            "shortValueTime":"14:00:00",
            "utcTime":"14:00:00 +0",
            "code":null,
            "signType":3,
            "signStatus":1,
            "signEventId":null,
            "deviceId":null,
            "deviceType":0,
            "deleted":false,
            "updatedOn":null,
            "requestId":null,
            "agreementEventId":null
         },
         "motive":null,
         "totalMin":289
      },
      {
         "id":"1763837059367-1",
         "in":{
            "signId":0,
            "userId":212061,
            "date":"2025-02-18T13:30:00.000Z",
            "trueDate":"2025-02-18T13:30:00.000Z",
            "signIn":true,
            "ip":null,
            "latitude":null,
            "longitude":null,
            "outside":null,
            "time":"14:30:00",
            "valueTime":"14:30:00",
            "shortTime":"14:30:00",
            "shortTrueTime":"14:30:00",
            "shortValueTime":"14:30:00",
            "utcTime":"14:30:00 +0",
            "code":null,
            "signType":3,
            "signStatus":1,
            "signEventId":null,
            "deviceId":null,
            "deviceType":0,
            "deleted":false,
            "updatedOn":null,
            "requestId":null,
            "agreementEventId":null
         },
         "out":{
            "signId":0,
            "userId":212061,
            "date":"2025-02-18T17:00:00.000Z",
            "trueDate":"2025-02-18T17:00:00.000Z",
            "signIn":false,
            "ip":null,
            "latitude":null,
            "longitude":null,
            "outside":null,
            "time":"18:11:00",
            "valueTime":"18:00:00",
            "shortTime":"18:00:00",
            "shortTrueTime":"18:00:00",
            "shortValueTime":"18:00:00",
            "utcTime":"18:00:00 +0",
            "code":null,
            "signType":3,
            "signStatus":1,
            "signEventId":null,
            "deviceId":null,
            "deviceType":0,
            "deleted":false,
            "updatedOn":null,
            "requestId":null,
            "agreementEventId":null
         },
         "motive":null,
         "totalMin":221
      }
   ],
   "diaryId":599225561
}

```

Create an script in javascript that have the start date and end date configurable.