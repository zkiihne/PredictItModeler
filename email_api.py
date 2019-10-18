import yagmail
import twitterfetcher

def send_email(sender, twitter_account, current_tweets,current_time,end_of_week,market_number, start_of_market):
    TO = sender.split('<')[1].split('>')[0]
    print(TO)
    SUBJECT = twitter_account + str(current_tweets) + str(current_time)
    yes, no = twitterfetcher.generate_single_price(twitter_account, int(current_tweets), int(current_time), int(end_of_week), int(market_number), int(start_of_market))
    TEXT = str(yes) + "/n" + str(no)
    yag = yagmail.SMTP('zkiihne@gmail.com', '31500875.Zk')
    print(yag.user)
    yag.send(TO, SUBJECT, TEXT)
    print("Email sent")

if __name__ == '__main__':
    TO = 'zkiihne@gmail.com'
    SUBJECT = 'VP'
    TEXT = "37" + "," + "222" + "," + "512" + "," + "5953" + "," + "44"
    yag = yagmail.SMTP('zkiihne@gmail.com', '31500875.Zk')
    print(yag.user)
    print(TEXT)
    yag.send(TO, SUBJECT, TEXT)
    print("Email sent")