# Brainstorming

First time using any of these, haven't touched Javascript or Typescript before.

have to learn typescript & javascript in 7 days cuz i saw email late great

still have no clue what currJSON actually is or what its meant to be doing. but stringify seems to solve it yay!

NEXT steps:
1. fix number[0] and number [1] error, if battery error (>80), there is no decimal value so timestamp gets added on to temp
Add a feature to the backend streaming service so that each time the received battery temperature exceeds this range more than 3 times in 5 seconds, the current timestamp is logged to a file named 'incidents.log'.


In streaming-service, for server.ts, need to download log4ts module for log.
Download via terminal by running:
1. npm install log4ts --save
2. npm @types install npm:log4ts --save --global

Task 1
 - Changed the problematic line format to stringify and this worked to solve the crashing issue
 - Tried to understand the try catch error but it was confusing (haven't used Javascript/Typescript before) and looked online for alternative solution (in which stringify seems to work and resolve the error)

Task 2
 - Pretty sure there would be way more optimal solutions than the way I did this but it gets it done
  - Placed what I coded in the receiving of the message module. This meant that I was able to get the message received without fiddling much with the rest of the code which I haven't fully understood
 - Stripped the string message received and got the numbers for the battery temperature and timestamp from the string 
 - Converted them to integers to check with operators whether they are exceeding the temperature range
 - If it exceeds and has an error more than 3 times in a 5 sec span, writes the timestamp at the log file
 - Variable naming and intrinsic documentation diminished here as I just tried to get everything to work
