from datetime import datetime
from pathlib import Path
import os

def exportToFile(a):
    filename = 'output.txt'
    outtext = datetime.now().strftime("%d/%m/%Y %H:%M:%S") + ": " + a + '\n'
    out = open(filename, 'a+', encoding='utf-8')
    out.write(outtext)
    out.close()


