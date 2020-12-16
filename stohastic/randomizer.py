import random
import string

#reading data

nm_data = open('randomizer/names.txt', 'r', encoding='utf-8')
names_male = nm_data.read()

nf_data = open('randomizer/names_female.txt', 'r', encoding='utf-8')
names_female = nf_data.read()

sm_data = open('randomizer/surnames.txt', 'r', encoding='utf-8')
sur_male = sm_data.read()

sf_data = open('randomizer/surnames_female.txt', 'r', encoding='utf-8')
sur_female = sf_data.read()

pm_data = open('randomizer/patronymic.txt', 'r', encoding='utf-8')
pat_male = pm_data.read()

pf_data = open('randomizer/patronymic_female.txt', 'r', encoding='utf-8')
pat_female = pf_data.read()

#splitting data

nm = names_male.split('\n')
fm = names_female.split('\n')
sm = sur_male.split('\n')
sf = sur_female.split('\n')
pm = pat_male.split('\n')
pf = pat_female.split('\n')

#generating male names

def genMale(num):
    a = []
    for i in range(num):
        surname = random.randint(0, len(sm) - 1)
        name = random.randint(0, len(nm) - 1)
        patronymic = random.randint(0, len(pm) - 1)

        username = sm[surname] + ' ' + nm[name] + ' ' + pm[patronymic]
        a.append(username)

    return a

#generating female names
        
def genFemale(num):
    names = []
    for i in range(num):
        surname = random.randint(0, len(sf) - 1)
        name = random.randint(0, len(fm) - 1)
        patronymic = random.randint(0, len(pf) - 1)

        username = sf[surname] + ' ' + fm[name] + ' ' + pf[patronymic]
        names.append(username)

    return names

#making a shuffled list

def genList(count):
    listing = genMale(round(count/2-0.01)) + genFemale(round(count/2+0.01))
    random.shuffle(listing)
    return listing