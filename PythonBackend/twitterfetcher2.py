from helper import *
import numpy as np
from scipy.stats import gaussian_kde

# Requires Authentication as of Twitter API v1.1

week_end = 0
initial = 0

# returns a kde model based off of a given set of weeks and and the counts so far
def kde_fun(points, sofar, start, bw=0.6):

    kde = gaussian_kde(points, bw_method=bw)
    nm = norm(points)
    print(type(nm))
    print()
    print("LLL", nm.pdf(50))
    npts_sample = int(1e3)
    x = np.linspace(-50, 400, npts_sample)
    kde_pdf = kde.evaluate(x)
    norm_pdf = nm.pdf(x)
    from scipy.special import ndtr

    stdev = np.sqrt(kde.covariance)[0, 0]
    pde_cdf = ndtr(np.subtract.outer(x, points)).mean(axis=1)

    b1 = []
    b9 = []
    for i in range(sofar-50, start+1):
        b1.append(i-sofar)

    b2 = [start+1-sofar,start+2-sofar, start+3-sofar,start+4-sofar,start+5-sofar,start+6-sofar,start+7-sofar,start+8-sofar,start+9-sofar,start+10-sofar]
    b3 = [b2[0] + 10, b2[1] + 10, b2[2] + 10, b2[3] + 10, b2[4] + 10,b2[5] + 10, b2[6] + 10, b2[7] + 10, b2[8] + 10, b2[9] + 10]
    b4 = [b3[0] + 10, b3[1] + 10, b3[2] + 10, b3[3] + 10, b3[4] + 10,b3[5] + 10, b3[6] + 10, b3[7] + 10, b3[8] + 10, b3[9] + 10]
    b5 = [b4[0] + 10, b4[1] + 10, b4[2] + 10, b4[3] + 10, b4[4] + 10,b4[5] + 10, b4[6] + 10, b4[7] + 10, b4[8] + 10, b4[9] + 10]
    b6 = [b5[0] + 10, b5[1] + 10, b5[2] + 10, b5[3] + 10, b5[4] + 10,b5[5] + 10, b5[6] + 10, b5[7] + 10, b5[8] + 10, b5[9] + 10]
    b7 = [b6[0] + 10, b6[1] + 10, b6[2] + 10, b6[3] + 10, b6[4] + 10,b6[5] + 10, b6[6] + 10, b6[7] + 10, b6[8] + 10, b6[9] + 10]
    b8 = [b7[0] + 10, b7[1] + 10, b7[2] + 10, b7[3] + 10, b7[4] + 10,b7[5] + 10, b7[6] + 10, b7[7] + 10, b7[8] + 10, b7[9] + 10]

    for i in range(b8[9]+1,350-sofar):
        b9.append(i)

    print("B1", sum(kde.evaluate(b1)))
    print("B2", sum(kde.evaluate(b2)))
    print("B3", sum(kde.evaluate(b3)))
    print("B4", sum(kde.evaluate(b4)))
    print("B5", sum(kde.evaluate(b5)))
    print("B6", sum(kde.evaluate(b6)))
    print("B7", sum(kde.evaluate(b7)))
    print("B8", sum(kde.evaluate(b8)))
    print("B9", sum(kde.evaluate(b9)))
    norm_arr = []

    for i in range(-50, 400):
        norm_arr.append(nm.pdf(i-sofar))
    kde_arr = []
    for i in range(-50, 400):
        kde_arr.append(kde.evaluate(i-sofar))
    return x, kde_arr, [sum(kde.evaluate(b1)),sum(kde.evaluate(b2)),sum(kde.evaluate(b3)),sum(kde.evaluate(b4)),sum(kde.evaluate(b5)),sum(kde.evaluate(b6)),sum(kde.evaluate(b7)),sum(kde.evaluate(b8)),sum(kde.evaluate(b9))], norm_arr
















def generate_current_prices(weeks, currtime,start, plots=False):

    print("TIME: ", currtime)

    print("Started")

    print("Weeks", weeks)
    frequency_list = make_dict(weeks, 0, True)
    print("Created Frequency List")

    print("Current time:", currtime)
    nweeks = []
    for w in weeks:
        nweeks.append(cut_at_point(currtime, w, week_end))
    to_remove = []
    for n in nweeks:
        if len(n) == 0:
            to_remove.append(n)
    for tr in to_remove:
        nweeks.remove(tr)
    print("new", nweeks)
    fls = sum(frequency_list)
    frequency_list = frequency_list[num_to_units(week_end, currtime):]
    percentage = sum(frequency_list) / fls
    weekly_averages = calc_weekly_averages(nweeks)
    kx, kde, kde_arr, norm = kde_fun(weekly_averages, initial, start, 0.7)

    print("arr", sum(kde_arr))
    print("Weekly Averages:", weekly_averages)
    print("Standard deviation", np.std(weekly_averages))
    print("Mean", sum(frequency_list))
    print("Percentage", percentage)
    std = np.std(weekly_averages)
    mean = sum(frequency_list)

    n = 100000
    c = np.random.normal(mean, std, n)

    B1 = start
    B2 = B1 + 10
    B3 = B2 + 10
    B4 = B3 + 10
    B5 = B4 + 10
    B6 = B5 + 10
    B7 = B6 + 10
    B8 = B7 + 10
    B9 = start + 71

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
        if sample <= B1:  # 39 or less
            B1c = B1c + 1
        elif (sample > B1) and (sample <= B2):  # 40 to 44
            B2c = B2c + 1
        elif sample > B2 and sample <= B3:  # 45 to 49
            B3c = B3c + 1
        elif sample > B3 and sample <= B4:  # 50 to 54
            B4c = B4c + 1
        elif sample > B4 and sample <= B5:  # 55 to 59
            B5c = B5c + 1
        elif sample > B5 and sample <= B6:  # 60 to 64
            B6c = B6c + 1
        elif sample > B6 and sample <= B7:  # 60 to 64
            B7c = B7c + 1
        elif sample > B7 and sample <= B8:  # 60 to 64
            B8c = B8c + 1
        elif sample > B8:  # 65 and up
            B9c = B9c + 1

    B1c = float(B1c) / n
    B2c = float(B2c) / n
    B3c = float(B3c) / n
    B4c = float(B4c) / n
    B5c = float(B5c) / n
    B6c = float(B6c) / n
    B7c = float(B7c) / n
    B8c = float(B8c) / n
    B9c = float(B9c) / n
    # print("Model values:")
    # print("B1:", B1c)
    # print("B2:", B2c)
    # print("B3:", B3c)
    # print("B4:", B4c)
    # print("B5:", B5c)
    # print("B6:", B6c)
    # print("B7:", B7c)
    # print("B8:", B8c)
    # print("B9:", B9c)
    # print("Total", B1c + B2c + B3c + B4c + B5c + B6c + B7c + B8c + B9c)
    norm_arr = [B1c, B2c, B3c, B4c, B5c, B6c, B7c, B8c, B9c]

    # w1, x1, z1 = plt.hist(c, 100, normed=True, color="white")  # hist
    # hist1 = norm1(mean, std, x1)
    # # plt.plot(kx, kde)
    # plot1 = hist1.dist_curve()
    #
    # plt.close()
    # x = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    # # plt.plot(x, kde_arr)
    # # plt.plot(x, norm_arr)
    # # if plots:
    #     # plt.show()

    return norm_arr, kde_arr, norm, kde, mean, std, percentage
def generate_single_price(name_of_account,current_count, given_time, we, market, starting):
    print("Generating prices")
    global week_end
    week_end = we
    set_name(name_of_account)
    start = starting
    set_start(start)
    total_dollars = 1000
    yes_timer = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    yes_stock = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    no_timer = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    no_stock = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    wks = get_twitter_data(week_end)
    gfc = get_fri_count(wks)
    for gf in gfc:
        print(gf)
    countz = []
    for w in wks:
        counter = 0
        for twe in w:
            counter = counter + 1
        countz.append(counter)
    print(countz)
    global initial
    initial = current_count

    # get_count()
    print("current count ", initial)
    currtime = given_time#get_time()
    norm, kde,  norm_arr, kde_arr, mean, std, percentage = generate_current_prices(wks, currtime,starting, plots=True)
    kde_yes = []
    kde_no = []
    for n in kde:
        kde_yes.append(n)
        kde_no.append(1 - n)
    market_name = market
    vals = homepage('https://www.predictit.org/api/marketdata/markets/' + str(market_name))
    print(market_name, start)
    B1s = start
    B2s = B1s + 10
    B3s = B2s + 10
    B4s = B3s + 10
    B5s = B4s + 10
    B6s = B5s + 10
    B7s = B6s + 10
    B8s = B7s + 10
    B9s = start + 71
    B1v = vals.get(str(B1s) + """ -""")
    B2v = vals.get(str(B1s + 1) + """ - """ + str(B2s))
    B3v = vals.get(str(B2s + 1) + """ - """ + str(B3s))
    B4v = vals.get(str(B3s + 1) + """ - """ + str(B4s))
    B5v = vals.get(str(B4s + 1) + """ - """ + str(B5s))
    B6v = vals.get(str(B5s + 1) + """ - """ + str(B6s))
    B7v = vals.get(str(B6s + 1) + """ - """ + str(B7s))
    B8v = vals.get(str(B7s + 1) + """ - """ + str(B8s))
    B9v = vals.get(str(B9s) + """+""")
    # buy yes
    print(vals)
    # buy no\


    buy_yes_prices = [B1v[0], B2v[0], B3v[0], B4v[0], B5v[0], B6v[0], B7v[0], B8v[0], B9v[0]]
    buy_no_prices = [B1v[1], B2v[1], B3v[1], B4v[1], B5v[1], B6v[1], B7v[1], B8v[1], B9v[1]]
    sell_yes_prices = [B1v[2], B2v[2], B3v[2], B4v[2], B5v[2], B6v[2], B7v[2], B8v[2], B9v[2]]
    sell_no_prices = [B1v[3], B2v[3], B3v[3], B4v[3], B5v[3], B6v[3], B7v[3], B8v[3], B9v[3]]
    print(buy_yes_prices)
    print(kde_yes)

    print(buy_no_prices)
    print(kde_no)

    increment = 20
    for i in range(0, len(yes_stock)):
        if yes_timer[i] == 0:
            if buy_yes_prices[i] + 0.10 < kde_yes[i]:
                print("buy 20 yes on {} at {}".format(i, buy_yes_prices[i]))
                yes_stock[i] = yes_stock[i] + increment
                total_dollars = total_dollars - increment * buy_yes_prices[i]
                yes_timer[i] = yes_timer[i] + 60

                # write_trade_to_csv(currtime,initial, True, increment, i, market_name, buy_yes_prices[i]*increment)
        else:
            yes_timer[i] = yes_timer[i] - 1
        if sell_yes_prices[i] + 0.01 > kde_yes[i] and yes_stock[i] > 0:
            qty = yes_stock[i]
            print("sold {} of qty {} at price {}".format(i, qty, sell_yes_prices[i]))
            yes_stock[i] = 0
            total_dollars = total_dollars + qty * sell_yes_prices[i]

            # write_trade_to_csv(currtime, initial, False, qty, i, market_name, sell_yes_prices[i] * qty)

        if no_timer[i] == 0:
            if buy_no_prices[i] + 0.10 < kde_no[i]:
                print("buy 20 no on {} at {}".format(i, buy_no_prices[i]))
                no_stock[i] = no_stock[i] + increment
                total_dollars = total_dollars - increment * buy_no_prices[i]
                no_timer[i] = no_timer[i] + 60

                # write_trade_to_csv(currtime, initial, True, increment, i, market_name,
                # buy_no_prices[i] * increment)
        else:
            no_timer[i] = no_timer[i] - 1
        if sell_no_prices[i] + 0.01 > kde_no[i] and no_stock[i] > 0:
            qty = no_stock[i]
            print("sold {} of qty {} at price {}".format(i, qty, sell_no_prices[i]))
            no_stock[i] = 0
            total_dollars = total_dollars + qty * sell_no_prices[i]

            # write_trade_to_csv(currtime, initial, False, qty, i, market_name, sell_no_prices[i] * qty)

    print("-- yes", yes_stock)
    print("-- no ", no_stock)
    print("-- Money left:", total_dollars)
    return kde_yes, kde_no, norm_arr, kde_arr, mean, std, percentage
#
# def initialize(name_of_account,current_count, given_time, we):
#     week_end = we
#     set_name(name_of_account)
#     start = 44
#     set_start(start)
#     total_dollars = 1000
#     yes_timer = [0, 0, 0, 0, 0, 0, 0, 0, 0]
#     yes_stock = [0, 0, 0, 0, 0, 0, 0, 0, 0]
#     no_timer = [0, 0, 0, 0, 0, 0, 0, 0, 0]
#     no_stock = [0, 0, 0, 0, 0, 0, 0, 0, 0]
#     wks = get_twitter_data()
#     gfc = get_fri_count(wks)
#     for gf in gfc:
#         print(gf)
#     countz = []
#     for w in wks:
#         counter = 0
#         for twe in w:
#             counter = counter + 1
#         countz.append(counter)
#     print(countz)
#     global initial
#     initial = current_count
#
#     while True:
#         # get_count()
#         print("current count ", initial)
#         currtime = given_time#get_time()
#         norm, kde = generate_current_prices(wks, currtime, plots=True)
#         kde_yes = []
#         kde_no = []
#         for n in kde:
#             kde_yes.append(n)
#             kde_no.append(1 - n)
#         market_name = 5953
#         vals = homepage('https://www.predictit.org/api/marketdata/markets/' + str(market_name))
#
#         B1s = start
#         B2s = B1s + 5
#         B3s = B2s + 5
#         B4s = B3s + 5
#         B5s = B4s + 5
#         B6s = B5s + 5
#         B7s = B6s + 5
#         B8s = B7s + 5
#         B9s = start + 36
#         B1v = vals.get(str(B1s) + """-""")
#         B2v = vals.get(str(B1s + 1) + """ - """ + str(B2s))
#         B3v = vals.get(str(B2s + 1) + """ - """ + str(B3s))
#         B4v = vals.get(str(B3s + 1) + """ - """ + str(B4s))
#         B5v = vals.get(str(B4s + 1) + """ - """ + str(B5s))
#         B6v = vals.get(str(B5s + 1) + """ - """ + str(B6s))
#         B7v = vals.get(str(B6s + 1) + """ - """ + str(B7s))
#         B8v = vals.get(str(B7s + 1) + """ - """ + str(B8s))
#         B9v = vals.get(str(B9s) + """+""")
#         # buy yes
#         print(B8v[0])
#         # buy no
#         print(B8v[1])
#
#         buy_yes_prices = [B1v[0], B2v[0], B3v[0], B4v[0], B5v[0], B6v[0], B7v[0], B8v[0], B9v[0]]
#         buy_no_prices = [B1v[1], B2v[1], B3v[1], B4v[1], B5v[1], B6v[1], B7v[1], B8v[1], B9v[1]]
#         sell_yes_prices = [B1v[2], B2v[2], B3v[2], B4v[2], B5v[2], B6v[2], B7v[2], B8v[2], B9v[2]]
#         sell_no_prices = [B1v[3], B2v[3], B3v[3], B4v[3], B5v[3], B6v[3], B7v[3], B8v[3], B9v[3]]
#         print(buy_yes_prices)
#         print(kde_yes)
#
#         print(buy_no_prices)
#         print(kde_no)
#
#         increment = 20
#         for i in range(0, len(yes_stock)):
#             if yes_timer[i] == 0:
#                 if buy_yes_prices[i] + 0.05 < kde_yes[i]:
#                     print("buy 20 yes on {} at {}".format(i, buy_yes_prices[i]))
#                     yes_stock[i] = yes_stock[i] + increment
#                     total_dollars = total_dollars - increment * buy_yes_prices[i]
#                     yes_timer[i] = yes_timer[i] + 60
#
#                     # write_trade_to_csv(currtime,initial, True, increment, i, market_name, buy_yes_prices[i]*increment)
#             else:
#                 yes_timer[i] = yes_timer[i] - 1
#             if sell_yes_prices[i] + 0.01 > kde_yes[i] and yes_stock[i] > 0:
#                 qty = yes_stock[i]
#                 print("sold {} of qty {} at price {}".format(i, qty, sell_yes_prices[i]))
#                 yes_stock[i] = 0
#                 total_dollars = total_dollars + qty * sell_yes_prices[i]
#
#                 # write_trade_to_csv(currtime, initial, False, qty, i, market_name, sell_yes_prices[i] * qty)
#
#             if no_timer[i] == 0:
#                 if buy_no_prices[i] + 0.05 < kde_no[i]:
#                     print("buy 20 no on {} at {}".format(i, buy_no_prices[i]))
#                     no_stock[i] = no_stock[i] + increment
#                     total_dollars = total_dollars - increment * buy_no_prices[i]
#                     no_timer[i] = no_timer[i] + 60
#
#                     # write_trade_to_csv(currtime, initial, True, increment, i, market_name,
#                     # buy_no_prices[i] * increment)
#             else:
#                 no_timer[i] = no_timer[i] - 1
#             if sell_no_prices[i] + 0.01 > kde_no[i] and no_stock[i] > 0:
#                 qty = no_stock[i]
#                 print("sold {} of qty {} at price {}".format(i, qty, sell_no_prices[i]))
#                 no_stock[i] = 0
#                 total_dollars = total_dollars + qty * sell_no_prices[i]
#
#                 # write_trade_to_csv(currtime, initial, False, qty, i, market_name, sell_no_prices[i] * qty)
#
#         print("-- yes", yes_stock)
#         print("-- no ", no_stock)
#         print("-- Money left:", total_dollars)
#         time.sleep(60)
def get_market_prices(market_name, start):
    vals = homepage('https://www.predictit.org/api/marketdata/markets/' + str(market_name))
    B1s = start
    B2s = B1s + 10
    B3s = B2s + 10
    B4s = B3s + 10
    B5s = B4s + 10
    B6s = B5s + 10
    B7s = B6s + 10
    B8s = B7s + 10
    B9s = start + 71
    B1v = vals.get(str(B1s) + """ -""")
    B2v = vals.get(str(B1s + 1) + """ - """ + str(B2s))
    B3v = vals.get(str(B2s + 1) + """ - """ + str(B3s))
    B4v = vals.get(str(B3s + 1) + """ - """ + str(B4s))
    B5v = vals.get(str(B4s + 1) + """ - """ + str(B5s))
    B6v = vals.get(str(B5s + 1) + """ - """ + str(B6s))
    B7v = vals.get(str(B6s + 1) + """ - """ + str(B7s))
    B8v = vals.get(str(B7s + 1) + """ - """ + str(B8s))
    B9v = vals.get(str(B9s) + """+""")
    print(vals)
    print(vals.get(str(B1s) + """-"""))
    buy_yes_prices = [B1v[0], B2v[0], B3v[0], B4v[0], B5v[0], B6v[0], B7v[0], B8v[0], B9v[0]]
    buy_no_prices = [B1v[1], B2v[1], B3v[1], B4v[1], B5v[1], B6v[1], B7v[1], B8v[1], B9v[1]]
    sell_yes_prices = [B1v[2], B2v[2], B3v[2], B4v[2], B5v[2], B6v[2], B7v[2], B8v[2], B9v[2]]
    sell_no_prices = [B1v[3], B2v[3], B3v[3], B4v[3], B5v[3], B6v[3], B7v[3], B8v[3], B9v[3]]
    return buy_yes_prices, buy_no_prices

if __name__ == '__main__':

    generate_single_price("whitehouse", 80 , 723, 412, 6021, 159)
    # generate_single_price("realdonaldtrump", 162, 120, 312, 5974, 209)
