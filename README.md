# google-chat-g-suite-update-rss-bot
It says bot in the name, but it is not actually. It is an App Script that fetches RSS feed from [G Suite Update Blog](https://gsuiteupdates.googleblog.com/) and posts a message to Google Chat room via WebHook if there are new posts.

# How to Set Up

1. Create a new App Script project from [here](https://script.google.com/home)
2. Copy & Paste the script to the new project you've created.
3. Open [Google Chat](https://chat.google.com) and define a webhook in the room you desire to post to. [Instructions](https://developers.google.com/hangouts/chat/how-tos/webhooks)
4. Copy & Paste a WebHook URL here:
```
// Webhook URL of the Google Chat room
var WEBHOOK_URL = "here";
```
5. Set up a Time-driven trigger. [Instructions](https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_manually)
6. Done!
