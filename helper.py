import json
from urllib.request import urlopen
import matplotlib.pyplot as plt
import numpy as np
import statistics
import scipy.stats
from twython import Twython, TwythonError




initial = 44
name = "VP"
def write_trade_to_csv(time, curr_count, buy, qty, position, market_name, cost):
    buy_arr = [0,0,0,0,0,0,0]
    sell_arr = [0, 0, 0, 0, 0, 0, 0]
    if buy:
        buy_arr[position] = qty
    if not buy:
        sell_arr[position - 1] = qty

    value = [time, curr_count, cost, buy_arr, sell_arr]
    value = np.array(value).flatten()

    filename = str(market_name) + ".csv"
    with open(filename, 'a') as resultFile:
        wr = csv.writer(resultFile)
        wr.writerows([value,])

def get_fri_count(weeks):
    fri_counts = []
    for w in weeks:
        w_count = [0,0,0,0,0,0,0]
        for d in w:
            if(d > 511 and d < 600):
                w_count[0] = w_count[0] + 1
            elif (d > 599 and d < 700):
                w_count[1] = w_count[1] + 1
            elif (d > 699):
                w_count[2] = w_count[2] + 1
            elif (d < 200):
                w_count[3] = w_count[3] + 1
            elif (d > 199 and d < 300):
                w_count[4] = w_count[4] + 1
            elif (d > 299 and d < 400):
                w_count[5] = w_count[5] + 1
            elif (d > 399 and d < 500):
                w_count[6] = w_count[6] + 1
            else:
                break
        fri_counts.append(w_count)
    fri_counts = [*zip(*fri_counts)]
    return fri_counts

class norm1:
    def __init__(self, a1, b1, c1):
        self.a1 = a1
        self.b1 = b1
        self.c1 = c1

    def dist_curve(self):
        plt.plot(self.c1, 1 / (self.b1 * np.sqrt(2 * np.pi)) *
                 np.exp(- (self.c1 - self.a1) ** 2 / (2 * self.b1 ** 2)), linewidth=2, color='y')

        # plt.show()


def make_dict(weeks,numb, list):
    dic = {}
    for i in range(1,8):
        for s in range(0,24):
            num = i*100 + s
            dic.update({num:0})


    for w in weeks:
        for t in w:
            dic.update({t:dic.get(t)+1})

    if list:
        list_of_values = []
        for i in range(1,8):
            for s in range(0,24):
                num = i*100 + s
                d = dic.get(num)
                list_of_values.append(d)
        le = len(weeks)

        for i in range(0, len(list_of_values)):
            list_of_values[i] = float(list_of_values[i])/le
        list_of_values = list_of_values[::-1]

        return list_of_values
    else:
        return dic

def daytime_to_num(day, time):
    if day == 'Mon':
        num = 1
    elif day == 'Tue':
        num = 2
    elif day == 'Wed':
        num = 3
    elif day == 'Thu':
        num = 4
    elif day == 'Fri':
        num = 5
    elif day == 'Sat':
        num = 6
    else:
        num = 7
    num = num *100
    num = num + time
    return num

def num_to_day(num):
    if int(num/100)*100 == 100:
        return "Mon"
    if int(num/100)*100 == 200:
        return "Tue"
    if int(num/100)*100 == 300:
        return "Wed"
    if int(num/100)*100 == 400:
        return "Thu"
    if int(num/100)*100 == 500:
        return "Fri"
    if int(num/100)*100 == 600:
        return "Sat"
    if int(num/100)*100 == 700:
        return "Sun"

def trim_ends(days, hours, end_of_week):
    days = days[::-1]#reversed(days)
    hours = hours[::-1]#reversed(hours)
    eowd = num_to_day(end_of_week)
    print("EOWD", eowd, (end_of_week/100)*100)
    i = 0

    day = ""
    hour = 0
    while day != eowd:
        day = days[i]
        hour = hours[i]
        i += 1

    while hour < 12 and day == eowd:
        day = days[i]
        hour = hours[i]
        i += 1
    days = days[i:]
    hours = hours[i:]

    return days[::-1], hours[::-1]


def minus_day(day):
    if day == 'Mon':
        day = 'Sun'
    elif day == 'Tue':
        day = 'Mon'
    elif day == 'Wed':
        day = 'Tue'
    elif day == 'Thu':
        day = 'Wed'
    elif day == 'Fri':
        day = 'Thu'
    elif day == 'Sat':
        day = 'Fri'
    else:
        day = 'Sat'
    return day

def get_hour(day, time):
    t = time.split(':')
    hour = int(t[0])-4
    if hour < 0:
        hour = 24 + hour
        day = minus_day(day)
    return day, hour

def seperate_weeks(days, hours, end_of_week=512):
    print("ZZZ", end_of_week)
    print("jjjj", days)
    weeks = []
    rdays = days[::-1]
    rhours = hours[::-1]
    newdayhours = []
    for i in range(0, len(rdays)):
        newdayhours.append(daytime_to_num(rdays[i], rhours[i]))
    week = []
    trigger = False
    print("LLL", newdayhours)
    for n in newdayhours:
        if trigger and n > end_of_week-1:
            weeks.append(week)
            week = []
            trigger = False
        elif n > 100 and n < (end_of_week / 100)*100:
            trigger = True
        week.append(n)
    return weeks

def homepage(request):
    file = urlopen(request)
    js = file.read()
    text = js.decode('utf-8')  #
    response = json.loads(text)

    # print(type(response))
    value = {}
    time = response["timeStamp"]
    id = response["id"]
    date, tod = str.split(time,"T")
    # value.append(date)
    # value.append(tod)
    for contract in response["contracts"]:
        name = contract["shortName"]
        by = contract["bestBuyYesCost"]
        bn = contract["bestBuyNoCost"]
        sy = contract["bestSellYesCost"]
        sn = contract["bestSellNoCost"]

        if by is None:
            by = 1.0
        if bn is None:
            bn = 1.0
        if sy is None:
            sy = 0.0
        if sn is None:
            sn = 0.0
        value.update({name:(by,bn,sy,sn)})



    return value
    # filename = str(id) + ".csv"
    # with open(filename, 'a') as resultFile:
    #     wr = csv.writer(resultFile)
    #     wr.writerows([value,])


def get_count(end_of_week=512):
    print("ZZZ", end_of_week)
    times = run(0)
    numtime = []
    times = times[1]
    for t in times:
        numtime.append(daytime_to_num(t[0],t[1]))
    count = 0
    prev = 600
    for i in range(0,len(times)):
        t = numtime[i]
        if prev >= end_of_week and t < end_of_week:
            break
        prev = t
        count = count + 1
    print(count)
    return count


def get_time():
    import datetime
    now = datetime.datetime.now()
    curr = 100*(int(now.weekday())+1)+ int(now.hour)
    return curr

def norm(points):
    return scipy.stats.norm(statistics.mean(points), statistics.stdev(points))


def run(id):
    parsed_times = []
    twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
    # tweets are +4 hours from EST
    gotten_tweets = None
    try:
        if id == 0:
            gotten_tweets = twitter.get_user_timeline(screen_name=name, count=500, include_rts= True)
        else:
            print(type(id), id)
            gotten_tweets = twitter.get_user_timeline(screen_name=name, count=500, include_rts=True, max_id=id-1)
    except TwythonError as e:
        print(e)

    id = ""
    for tweet in gotten_tweets:
        parsed_times.append(parse_date(tweet['created_at']))
        id = tweet['id']
    return id, parsed_times

# takes a date and converts it into the right format for us(312 423 etc)
def parse_date(date):
    date = str(date)
    d = date.split(' ')
    day = d[0]
    time = d[3]
    return get_hour(day, time)

# converts a number(312 423 etc) into a number of time periods since the start of the week(512)
def num_to_units(start,num, day=5):

    hund = int(num/100)

    if hund < day:
        hund = hund + (7-day)
    else:
        hund = hund - day

    num = num - int((num/100))*100

    if num < 12:
        num = num + 12
    else:
        num = num - 12

    return int(24*hund + num)

# calculates the averages for each week in the array
def calc_weekly_averages(weeks):
    sums = []
    for w in weeks:
        dic = {}
        for i in range(1, 8):
            for s in range(0, 24):
                num = i * 100 + s
                dic.update({num: 0})
        for t in w:
            dic.update({t: dic.get(t) + 1})
        list_of_values = []
        for i in range(1, 8):
            for s in range(0, 24):
                num = i * 100 + s
                d = dic.get(num)
                list_of_values.append(d)
        sums.append(sum(list_of_values))
    return sums

# "cuts" a week at point((312 or 623 for example)
def cut_at_point(point, list_of_times, end_of_week=512):
    print("Z", end_of_week)

    count = 0
    if point < end_of_week:
      while not (list_of_times[count] > point and list_of_times[count] < end_of_week ):
          count = count + 1
          if count == len(list_of_times):
              break
    elif point > end_of_week:
        while list_of_times[count] < point and list_of_times[count] > end_of_week:
            count = count + 1
    else:
        print("fuck")
    return list_of_times[count:]


# returns a smapled normal distrribuitoin based off of the given distribtion C
def norm_sample_pars(c, start):
    n = 100000
    B1 = start
    B2 = B1 + 5
    B3 = B2 + 5
    B4 = B3 + 5
    B5 = B4 + 5
    B6 = B5 + 5
    B7 = B6 + 5
    B8 = B7 + 5
    B9 = start + 36

    B1c = 0
    B2c = 0
    B3c = 0
    B4c = 0
    B5c = 0
    B6c = 0
    B7c = 0
    B8c = 0
    B9c = 0


    for s in c:
        sample = s + initial
        if sample <= B1: # 39 or less
            B1c = B1c + 1
        elif (sample > B1) and (sample <= B2): # 40 to 44
            B2c = B2c + 1
        elif sample > B2 and sample <= B3: # 45 to 49
            B3c = B3c + 1
        elif sample > B3 and sample <= B4: # 50 to 54
            B4c = B4c + 1
        elif sample > B4 and sample <= B5: # 55 to 59
            B5c = B5c + 1
        elif sample > B5 and sample <= B6: # 60 to 64
            B6c = B6c + 1
        elif sample > B6 and sample <= B7: # 60 to 64
            B7c = B7c + 1
        elif sample > B7 and sample <= B8: # 60 to 64
            B8c = B8c + 1
        elif sample > B8: # 65 and up
            B9c = B9c + 1

    B1c = float(B1c) /n
    B2c = float(B2c) / n
    B3c = float(B3c) / n
    B4c = float(B4c) / n
    B5c = float(B5c) / n
    B6c = float(B6c) / n
    B7c = float(B7c) / n
    B8c = float(B8c) / n
    B9c = float(B9c) / n
    return B1c,B2c,B3c,B4c,B5c,B6c,B7c,B8c,B9c

# returns the weeks of twitter data trimmed and seperated into individual rows
def get_twitter_data(end_of_week=512):
    print("ZZ", end_of_week)
    idd = 0
    timeline = []
    count = 0
    # can only run to 3000 due to twitter metering
    while count < 3000:
        print("sin", count)
        # print("Getting timestamps:", count)
        idd, times = run(idd)
        timeline.extend(times)
        count += 200
    print("Timeline retrieved")
    days = []
    hours = []
    for t in timeline:
        days.append(t[0])
        hours.append(t[1])
    days, hours = trim_ends(days, hours, end_of_week)
    print("Days, Hours trimmed, Seperating by week")

    weeks = seperate_weeks(days, hours,end_of_week)  # creates weekly stripes
    weeks = weeks[1:]
    print("greel", len(weeks))
    return weeks
def set_start(s):
    global initial
    initial = s
def set_name(n):
    global name
    name = n