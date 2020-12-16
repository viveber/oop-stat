from numpy import random
import random as r
import math

def even(min, max):
    return float(r.random() * (max - min) + min)

def normal(lim):
    l = len(str(lim))
    norm = abs(random.normal(0, 0.5, 1))
    norm = int(norm * 10 ** l)
    if norm < lim:
        return norm
    else:
        return r.randint(0, lim - 1)
        
        
def expo(lim):
    power = len(str(lim))
    threshold = lim * 1/10 ** power
    pool = random.exponential(1, 100)

    for i in pool:
        if i < threshold:
            return int(i * 10 ** power)


