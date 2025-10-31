# Winlink Templates
  A collection of winlink templates that I use to auto-generate messages
  
  Most are pretty specific to my use cases but may be useful starting points for your own versions.
  
  Your mileage may vary...

## Notes:
### Template Control Fields
* Control fields have a keyword followed by “:”
* They can specify the subject, To, message body.
* Subject: -- Set the subject of the message
* To: -- Specify to whom the message is being sent
* CC: -- Specify carbon copy addresses
* Attach: file1,file2… -- Specify file attachment(s)
* ReadOnly: Yes/No – Specify whether user can edit.
* Def: variable=value – Define the value of a variable.
* Form: formname.html – Display a form.
* Msg: -- Start of message body. All text following Msg: is placed in the body of the message.

### Template Insertion Tags
* Insertion tags are replaced by data values. They can be embedded in Subject, Message and other locations.
* Enclose tag fields with “<“ and “>”.
* <Callsign> -- Inserts the current callsign.
* <UDateTime> -- UTC date and time.
* <Date> <Time> -- Local date and time.
* <Position> -- Current or last known latitude and longitude
* <Var variable> -- Inserts the value of a variable previously specified by “Def:” or by a form.

