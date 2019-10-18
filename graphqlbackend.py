from graphene import ObjectType, String, Boolean, ID, Field, Int,List , Float
import twitterfetcher
import twitterfetcher2
import helper
class Prices(ObjectType):
    B1n = Float()
    B2n = Float()
    B3n = Float()
    B4n = Float()
    B5n = Float()
    B6n = Float()
    B7n = Float()
    B8n = Float()
    B9n = Float()

    B1y = Float()
    B2y = Float()
    B3y = Float()
    B4y = Float()
    B5y = Float()
    B6y = Float()
    B7y = Float()
    B8y = Float()
    B9y = Float()


    # S1n = Float()
    # S2n = Float()
    # S3n = Float()
    # S4n = Float()
    # S5n = Float()
    # S6n = Float()
    # S7n = Float()
    # S8n = Float()
    # S9n = Float()
    #
    # S1y = Float()
    # S2y = Float()
    # S3y = Float()
    # S4y = Float()
    # S5y = Float()
    # S6y = Float()
    # S7y = Float()
    # S8y = Float()
    # S9y = Float()

class Query(ObjectType):
    vp = List(Prices, end_of_w=Int(), market_num=Int(), start_amount=Int())
    potus = List(Prices, name=String(), end_of_week=Int(), market_num=Int(), start_amount=Int())
    whitehouse = List(Prices, name=String(), end_of_week=Int(), market_num=Int(), start_amount=Int())
    rdt = List(Prices, name=String(), end_of_week=Int(), market_num=Int(), start_amount=Int())
    market = List(Prices, market_num=Int())
    def resolve_vp(self,info,end_of_w,market_num,start_amount):
        current_count = 3# helper.get_count()
        time = helper.get_time()
        name = "VP"
        yes, no = twitterfetcher.generate_single_price(name,current_count,time,end_of_w,market_num,start_amount)
        stuff = {}

        for i in range(0,len(yes)):
            count = i + 1
            stuff.update({"B{}y".format(count): yes[i]})
            stuff.update({"B{}n".format(count): no[i]})
        print(stuff)
        return [stuff]
    def resolve_potus(self,info,end_of_w,market_num,start_amount):
        current_count = 3# helper.get_count()
        time = helper.get_time()
        name = "potus"
        yes, no = twitterfetcher.generate_single_price(name,current_count,time,end_of_w,market_num,start_amount)
        stuff = {}

        for i in range(0,len(yes)):
            count = i + 1
            stuff.update({"B{}y".format(count): yes[i]})
            stuff.update({"B{}n".format(count): no[i]})
        print(stuff)
        return [stuff]
    def resolve_whitehouse(self,info,end_of_w,market_num,start_amount):
        current_count = 3# helper.get_count()
        time = helper.get_time()
        name = "whitehouse"
        yes, no = twitterfetcher.generate_single_price(name,current_count,time,end_of_w,market_num,start_amount)
        stuff = {}

        for i in range(0,len(yes)):
            count = i + 1
            stuff.update({"B{}y".format(count): yes[i]})
            stuff.update({"B{}n".format(count): no[i]})
        print(stuff)
        return [stuff]
    def resolve_rdt(self,info,end_of_w,market_num,start_amount):
        current_count = 3# helper.get_count()
        time = helper.get_time()
        name = "realdonaldtrump"
        yes, no = twitterfetcher.generate_single_price(name,current_count,time,end_of_w,market_num,start_amount)
        stuff = {}

        for i in range(0,len(yes)):
            count = i + 1
            stuff.update({"B{}y".format(count): yes[i]})
            stuff.update({"B{}n".format(count): no[i]})
        print(stuff)
        return [stuff]
    def resolve_market(self,info, market_num,start, five):
        if five:
            yes, no = twitterfetcher.get_market_prices(market_num, start)
        else:
            yes, no = twitterfetcher2.get_market_prices(market_num, start)
        stuff = {}

        for i in range(0,len(yes)):
            count = i + 1
            stuff.update({"B{}y".format(count): yes[i]})
            stuff.update({"B{}n".format(count): no[i]})
        print(stuff)
        return [stuff]