#In consumers.py
from channels import Group
from app.models import valor
from django.utils import timezone
# Connected to websocket.connect
def ws_add(message):
   # Accept the connection
   message.reply_channel.send({"accept": True})
   # Add to the chat group
   Group("chat").add(message.reply_channel)
# Connected to websocket.receive
def ws_message(message):
   print(message['text'])
   if(message['text']=="status"):
      try:
         q = valor.objects.latest('id')
         q = q.question_text
         print(q)
         if (q=="false"):
            Group("chat").send({
                "text": "false",
            })
         if (q=="true"):
            Group("chat").send({
                "text": "true",
            })
      except:
         print("error estatus")
   if(message['text']=="btn_checked"):
      try:
         q = valor(question_text="true",pub_date= timezone.now())
         q.save()
         Group("chat").send({
             "text": "true",
         })
      except:
         pass
   if(message['text']=="btn_no_checked"):
      try:
         q = valor(question_text="false",pub_date= timezone.now())
         q.save()
         Group("chat").send({
             "text": "false",
         })
      except:
         pass
# Connected to websocket.disconnect
def ws_disconnect(message):
   Group("chat").discard(message.reply_channel)
