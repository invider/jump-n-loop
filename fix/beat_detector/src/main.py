import json
import numba
from scipy.io.wavfile import read, write
import matplotlib.pyplot as plt
import argparse
def str2bool(v):
    if isinstance(v, bool):
       return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError('Boolean value expected.')
parser = argparse.ArgumentParser(description='Process wav file')
parser.add_argument('file', help='File to process')
parser.add_argument('--show', type=str2bool, default=False, nargs='?', const=True, help='show graph')
args = parser.parse_args()
if "." in args.file:
    baseName = ".".join(args.file.split(".")[:-1])
else:
    baseName = args.file

fSampl, data = read(args.file)

d = data[:,0]
#data = data[:1000000]

print("Freq is :{}".format(fSampl))

peaks_threshold = 600
secPerSample = 1 / fSampl
minDelay = 0.15
multiplier_threshold = 0.58
quick_avg_k = 0.001
long_avg_k = 0.0001
@numba.jit()
def avg(data, mk):
    d1 = []
    avg = 0
    for curVal in data:
        curVal = abs(curVal)
        avg += (curVal - avg) * mk
        d1.append(avg)
    return d1

@numba.jit()
def detectPeaks(d1):
    isPeak = []
    trend = 0
    isPeak.append(0)
    for i in range(1, len(d1)):
        av = d1[i]
        prev = d1[i-1]
        if av > prev and not trend:
            isPeak.append(10000)
        else:
            isPeak.append(0)

        trend = av > prev
    return isPeak

@numba.jit()
def analyze(data):
    data = [numba.float64(k[0]) for k in data]
    d1 = avg(data, quick_avg_k)
    d2 = avg(d1, long_avg_k)
    d3 = avg(d2, quick_avg_k)
    peaks = detectPeaks(d3)
    return d1, d3, peaks


d1, d2, peaks = analyze(data)

def showPlot():
    plt.figure()
    plt.plot(data)
    plt.plot(d1)
    plt.plot(d2)
    plt.plot(peaks)
    plt.show()

print("saving peaks")
f = open(baseName + ".txt", "w+")
time = 0
prev = 0
res = []
for k in peaks:
    time += secPerSample
    if k > 0:
        f.write("{}: {}\n".format(time, k))
        res.append(time)
open(baseName + ".json", "w+").write(json.dumps(res))

if args.show:
    showPlot()